import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  addToken,
  addDestChain,
  addAmount,
  addOriginChain,
  fetchData,
  removeBridge,
  updateTokenOnOriginBridge,
  updateTokenOnDestBridge,
} from './actions'

export function useBridge() {
  return useAppSelector((state) => state.bridge)
}

export function useAddOriginChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (fromChain) => {
      dispatch(addOriginChain(fromChain))
    },
    [dispatch]
  )
}

export function useAddDestChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (toChain) => {
      dispatch(addDestChain(toChain))
    },
    [dispatch]
  )
}

export function useAddToken() {
  const dispatch = useAppDispatch()
  return useCallback(
    (token) => {
      dispatch(addToken(token))
    },
    [dispatch]
  )
}

export function useAddAmount() {
  const dispatch = useAppDispatch()
  return useCallback(
    (amount) => {
      dispatch(addAmount(amount))
    },
    [dispatch]
  )
}

export function useRemoveBridge() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(removeBridge())
  }, [dispatch])
}

export function useChangeTokenOnOriginChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (tokenExist) => {
      dispatch(updateTokenOnOriginBridge(tokenExist))
    },
    [dispatch]
  )
}

export function useChangeTokenOnDestChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (tokenExist) => {
      dispatch(updateTokenOnDestBridge(tokenExist))
    },
    [dispatch]
  )
}

export function useSetFetch() {
  const dispatch = useAppDispatch()
  return useCallback(
    (data) => {
      dispatch(fetchData(data))
    },
    [dispatch]
  )
}
