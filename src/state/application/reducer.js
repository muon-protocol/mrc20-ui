import { createReducer } from '@reduxjs/toolkit'
// import { ActionBtnType } from '../../constants/constants'
import { 
  updateSearchQuery,
  updateClaims, 
  addClaim,
  delClaim
} from './actions'

const initialState = {
  chainId: null,
  // actionBtnType: ActionBtnType.SELECT,
  searchQuery: '',
  claims: [],
}

export default createReducer(initialState, (builder) => {
  // // Update Action button
  // builder.addCase(updateActionBtnType, (state, action) => {
  //   return { ...state, actionBtnType: action.payload }
  // })
  //Search Query Modal
  builder.addCase(updateSearchQuery, (state, action) => {
    return { ...state, searchQuery: action.payload }
  })
  // Update claims
  builder.addCase(updateClaims, (state, action) => {
    state.claims = action.payload
  })
  // Add claim
  builder.addCase(addClaim, (state, action) => {
    state.claims.push(action.payload)
  })
  // Del claim
  builder.addCase(delClaim, (state, action) => {
    const newClaims = state.claims.filter(claim => {
      return claim.txId !== action.payload.txId || 
        claim.fromChain !== action.payload.fromChain
    })
    state.claims = newClaims
  })
})
