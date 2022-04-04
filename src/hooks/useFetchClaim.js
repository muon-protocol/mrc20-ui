import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { findAndAddToken } from '../utils/Token'

export const useFetchClaimFromGraph = (pendingTxs, fetch) => {
  const { account } = useWeb3React()

  const [claims, setClaims] = useState([])

  useEffect(() => {
    const fetchClaim = async () => {
      console.log("fetch claim receive this pending",pendingTxs)
      let claims = []
      try {
        if (pendingTxs.length > 0) {
          try {
            let claimTokens = []
            for (let index = 0; index < pendingTxs.length; index++) {
              let deposit = pendingTxs[index]
              let token = await findAndAddToken(deposit.tokenAddress, account, parseInt(deposit.fromChain))
              let result = {
                fromChain: parseInt(deposit.fromChain),
                amount: deposit.amount,
                toChain: parseInt(deposit.toChain),
                tokenId: parseInt(deposit.tokenId),
                txId: parseInt(deposit.txId),
                user: account,
                tokenAddress: deposit.tokenAddress,
                symbol: token.symbol,
              }
              claimTokens.push(result)
            }

            claims = [...claims, ...claimTokens]
          } catch (error) {
            console.log('Error happend in geting Txs ', error)
          }
        }
        setClaims(claims)

      } catch (error) {
        console.log('error happend in get Claim', error)
      }
    }
    fetchClaim()
  }, [pendingTxs, fetch])
  return claims
}
