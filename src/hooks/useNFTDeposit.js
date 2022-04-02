import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { MRC721Bridge_ABI } from '../constants/ABI'
import { MRC721Bridge } from '../constants/contracts'
import { TransactionType } from '../constants/transactionStatus'
import { useBridge } from '../state/bridge/hooks'
import { useAddTransaction } from '../state/transactions/hooks'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'

const useNFTDeposit = (chainId) => {
  const bridge = useBridge()
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const addTransaction = useAddTransaction()

  try {
    const contract = getContract(MRC721Bridge_ABI, MRC721Bridge[chainId], web3)
    let info = {
      type: TransactionType.DEPOSIT,
      chainId: bridge.fromChain?.id,
      fromChain: bridge.fromChain?.symbol,
      toChain: bridge.toChain?.symbol,
      tokenSymbol: bridge.token?.name,
    }
    const deposit = useCallback(async () => {
      try {
        if (!contract) {
          console.error('contract is null')
          return
        }
        return sendTransaction(
          contract,
          'deposit',
          [bridge.nftId, bridge.toChain.id, bridge.NFTOnOriginBridge],
          account,
          info,
          addTransaction,
          web3.utils.toWei('0.001')
        )
      } catch (error) {
        console.log('Error happend in deposit call back', error)
      }
    }, [contract, account, chainId])
    return deposit
  } catch (error) {
    console.log('error happened in Deposit', error)
  }
}

export default useNFTDeposit
