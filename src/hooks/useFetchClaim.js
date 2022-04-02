import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { ERC721_ABI, MRC721Bridge_ABI } from '../constants/ABI'
import { MRC721Bridge } from '../constants/contracts'
import { useBridge } from '../state/bridge/hooks'
import { getContract } from '../utils/contractHelpers'
import multicall from '../utils/multicall'
import { getWeb3NoAccount } from '../utils/web3'

const useFetchClaim = () => {
  const bridge = useBridge()
  const { account } = useWeb3React()
  const [claims, setClaims] = useState([])

  const originWeb3 = getWeb3NoAccount(bridge.fromChain?.id)
  const destWeb3 = getWeb3NoAccount(bridge.toChain?.id)
  const originContract = getContract(MRC721Bridge_ABI, MRC721Bridge[bridge.fromChain?.id], originWeb3)
  const destContract = getContract(MRC721Bridge_ABI, MRC721Bridge[bridge.toChain?.id], destWeb3)
  useEffect(() => {
    const fetchClaim = async () => {
      let claims = []

      try {
        let userTxs = await originContract.methods.getUserTxs(account, bridge.toChain.id).call()
        let pendingTxs = await destContract.methods.pendingTxs(bridge.fromChain.id, userTxs).call()

        const pendingIndex = pendingTxs.reduce((out, bool, index) => (bool ? out : out.concat(index)), [])
        const Txs = []
        for (let index = 0; index < pendingIndex.length; index++) {
          const tx = {
            address: MRC721Bridge[bridge.fromChain.id],
            name: 'getTx',
            params: [userTxs[pendingIndex[index]]],
          }

          Txs.push(tx)
        }
        if (Txs.length > 0) {
          try {
            const claim = await multicall(originWeb3, MRC721Bridge_ABI, Txs, bridge.fromChain.id)
            const tokenAddresses = []
            for (let index = 0; index < pendingIndex.length; index++) {
              const tokenAddress = {
                address: MRC721Bridge[bridge.toChain.id],
                name: 'tokens',
                params: [claim[index].tokenId],
              }

              tokenAddresses.push(tokenAddress)
            }

            let tokenAddress = await multicall(destWeb3, MRC721Bridge_ABI, tokenAddresses, bridge.toChain.id)
            let infoNft = []
            for (let index = 0; index < tokenAddress.length; index++) {
              const calls = {
                address: tokenAddress[index][0],
                name: 'name',
              }
              infoNft.push(calls)
            }
            const Nfts = await multicall(destWeb3, ERC721_ABI, infoNft, bridge.toChain.id)
            let claimNfts = []
            for (let index = 0; index < pendingIndex.length; index++) {
              let result = {
                fromChain: claim[index].fromChain.toNumber(),
                nftId: claim[index].nftId,
                toChain: claim[index].toChain.toNumber(),
                tokenId: claim[index].tokenId.toString(),
                txId: claim[index].txId.toNumber(),
                user: claim[index].user,
                tokenAddress: tokenAddress[index][0],
                name: Nfts[index][0],
              }
              claimNfts.push(result)
            }
            claims = [...claims, ...claimNfts]
          } catch (error) {
            console.log('Error happend in geting Txs ', error)
          }
        }

        setClaims(claims)
      } catch (error) {
        console.log('error happend in get Claim', error)
      }
    }
    if (bridge.fromChain && bridge.toChain && account) fetchClaim()
  }, [bridge, account])

  return claims
}

export const useFetchClaimFromGraph = () => {

  const { account } = useWeb3React()

  const fetchClaim = useCallback(
    async (pendingTxs) => {
      let claims = []
      try {
        await Promise.all(
          Object.keys(pendingTxs).map(async (claimChainId) => {
            try {
              const toChain = parseInt(claimChainId)
              const destWeb3 = getWeb3NoAccount(toChain)
              const tokenAddresses = []
              for (let index = 0; index < pendingTxs[claimChainId].length; index++) {
                const tokenAddress = {
                  address: MRC721Bridge[toChain],
                  name: 'tokens',
                  params: [pendingTxs[claimChainId][index].tokenId],
                }
                tokenAddresses.push(tokenAddress)
              }
              let tokenAddress = await multicall(destWeb3, MRC721Bridge_ABI, tokenAddresses, toChain)
              let infoNft = []
              for (let index = 0; index < tokenAddress.length; index++) {
                const calls = {
                  address: tokenAddress[index][0],
                  name: 'name',
                }
                infoNft.push(calls)
              }
              const Nfts = await multicall(destWeb3, ERC721_ABI, infoNft, toChain)
              let claimNfts = []
              for (let index = 0; index < pendingTxs[claimChainId].length; index++) {
                let deposit = pendingTxs[claimChainId][index]
                let result = {
                  fromChain: parseInt(deposit.fromChain),
                  nftId: deposit.nftIds,
                  toChain: parseInt(deposit.toChain),
                  tokenId: parseInt(deposit.tokenId),
                  txId: parseInt(deposit.txId),
                  user: account,
                  tokenAddress: tokenAddress[index][0],
                  name: Nfts[index][0],
                }
                claimNfts.push(result)
              }
              claims = [...claims, ...claimNfts]
            } catch (error) {
              console.log('Error happend in geting Txs ', error)
            }
          })
        )
        return claims
      } catch (error) {
        console.log('error happend in get Claim', error)
      }
    },
    [account]
  )
  return fetchClaim
}

export default useFetchClaim
