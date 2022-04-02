import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addTransaction, removeTransaction } from './actions'

export function useTx() {
  return useAppSelector((state) => state.transactions)
}

export function useAddTransaction() {
  const dispatch = useAppDispatch()
  return useCallback(
    (txInfo) => {
      dispatch(addTransaction(txInfo))
    },
    [dispatch]
  )
}

export function useRemoveTransaction() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(removeTransaction())
  }, [dispatch])
}
