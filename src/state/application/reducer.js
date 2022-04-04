import { createReducer } from '@reduxjs/toolkit'
// import { ActionBtnType } from '../../constants/constants'
import { updateSearchQuery } from './actions'

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
})
