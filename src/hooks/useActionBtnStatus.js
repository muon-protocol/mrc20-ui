import { useState, useEffect } from 'react'
import { TransactionStatus, TransactionType } from '../constants/transactionStatus'
import { useTx } from '../state/transactions/hooks'

const useActionBtnStatus = () => {
  const [actionBtnStatus, setActionBtnStatus] = useState({ approve: false, deposit: false })
  const tx = useTx()

  useEffect(() => {
    let approve = tx.status === TransactionStatus.PENDING && tx.type === TransactionType.APPROVE
    let deposit = tx.status === TransactionStatus.PENDING && tx.type === TransactionType.DEPOSIT
    let bridgeToken = tx.status === TransactionStatus.PENDING && tx.type === TransactionType.GENERATE_BRIDGE_TOKEN
    let mainToken = tx.status === TransactionStatus.PENDING && tx.type === TransactionType.GENERATE_MAIN_TOKEN
    setActionBtnStatus({ approve, deposit, bridgeToken, mainToken })
  }, [tx])

  return actionBtnStatus
}

export default useActionBtnStatus
