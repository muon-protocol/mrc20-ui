import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { ERC20_ABI, MRC20Bridge_ABI } from '../constants/ABI'
import { MRC20Bridge } from '../constants/contracts'

import multicall from '../utils/multicall'
import { getWeb3NoAccount } from '../utils/web3'

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
                  address: MRC20Bridge[toChain],
                  name: 'tokens',
                  params: [pendingTxs[claimChainId][index].tokenId],
                }
                tokenAddresses.push(tokenAddress)
              }
              let tokenAddress = await multicall(destWeb3, MRC20Bridge_ABI, tokenAddresses, toChain)
              let infoToken = []
              for (let index = 0; index < tokenAddress.length; index++) {
                const calls = { address: tokenAddress[index][0], name: 'symbol' }

                infoToken.push(calls)
              }
              const tokens = await multicall(destWeb3, ERC20_ABI, infoToken, toChain)
              let claimTokens = []
              for (let index = 0; index < pendingTxs[claimChainId].length; index++) {
                let deposit = pendingTxs[claimChainId][index]
                let result = {
                  fromChain: parseInt(deposit.fromChain),
                  amount: deposit.amount,
                  toChain: parseInt(deposit.toChain),
                  tokenId: parseInt(deposit.tokenId),
                  txId: parseInt(deposit.txId),
                  user: account,
                  tokenAddress: tokenAddress[index][0],
                  symbol: tokens[index][0],
                }
                claimTokens.push(result)
              }
              claims = [...claims, ...claimTokens]
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
