import { useCallback } from 'react'
import useWeb3 from './useWeb3'
import { getContract } from '../utils/contractHelpers'
import { useAddTransaction } from '../state/transactions/hooks'
import { rpcConfig } from '../constants/chainsMap'
import { useWeb3React } from '@web3-react/core'
import { TransactionType } from '../constants/transactionStatus'
import { sendTransaction } from '../utils/sendTx'
import { fromWei } from '../utils/wei'

const useClaim = () => {
  const { account } = useWeb3React()
  const addTransaction = useAddTransaction()
  const web3 = useWeb3()

  const doClaim = useCallback(
    async (claim, destAddress, abi, params) => {
      try {
        let info = {
          type: TransactionType.CLAIM,
          chainId: claim.toChain,
          fromChain: rpcConfig[claim.toChain].symbol,
          toChain: '',
          tokenSymbol: claim.symbol,
          amount: fromWei(claim.amount),
        }

        const contract = getContract(abi, destAddress, web3)
        return sendTransaction(contract, 'claim', params, account, info, addTransaction)
      } catch (error) {
        console.log('error happened in useClaim', error)
      }
    },
    [account, addTransaction]
  )
  return doClaim
}

export default useClaim
