import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { 
  updateSearchQuery,
  updateClaims,
  addClaim,
  delClaim,
} from './actions'

// export function useActionBtn() {
//   return useAppSelector((state) => state.application.actionBtnType)
// }

// export function useChangeActionBtn() {
//   const dispatch = useAppDispatch()
//   return useCallback(
//     (btnType) => {
//       dispatch(updateActionBtnType(btnType))
//     },
//     [dispatch]
//   )
// }

export function useSearchQuery() {
  return useAppSelector((state) => state.application.searchQuery)
}

export function useClaims() {
  return useAppSelector(state => state.application.claims)
}

export function useChangeSearchQuery() {
  const dispatch = useAppDispatch()
  return useCallback(
    (query) => {
      dispatch(updateSearchQuery(query))
    },
    [dispatch]
  )
}

export function useChangeClaims() {
  const dispatch = useAppDispatch()
  return useCallback(
    (data) => {
      dispatch(updateClaims(data))
    },
    [dispatch]
  )
}

export function useAddClaim() {
  const dispatch = useAppDispatch()
  return useCallback(
    (claim) => {
      dispatch(addClaim(claim))
    },
    [dispatch]
  )
}

export function useDelClaim() {
  const dispatch = useAppDispatch()
  return useCallback(
    (claim) => {
      dispatch(delClaim(claim))
    },
    [dispatch]
  )
}
