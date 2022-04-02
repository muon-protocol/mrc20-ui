import { useCallback } from 'react'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { useWeb3React } from '@web3-react/core'
import { useAddTransaction } from '../state/transactions/hooks'
import { sendTransaction } from '../utils/sendTx'
import { toWei } from '../utils/wei'

const useApprove = () => {
  const addTransaction = useAddTransaction()

  try {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const approve = useCallback(
      async (info, contractAddress, spender, abi) => {
        try {
          if (!contractAddress) {
            console.error('no token')
            return
          }
          let contract = getContract(abi, contractAddress, web3)

          if (!contract) {
            console.error('token Contract is null')
            return
          }
          return sendTransaction(
            contract,
            'approve',
            [spender, toWei('1000000000000000000')],
            account,
            info,
            addTransaction
          )
        } catch (error) {
          console.log('error happened in Approve callback', error)
        }
      },
      [web3, account, addTransaction, chainId]
    )
    return approve
  } catch (error) {
    console.log('error happened in Approve', error)
  }
}

export default useApprove
