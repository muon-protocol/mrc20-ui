import { createReducer } from '@reduxjs/toolkit'
import { addTransaction, removeTransaction } from './actions'

const initialState = {
  status: '',
  type: '',
}

export default createReducer(initialState, (builder) => {
  builder.addCase(addTransaction, (state, action) => {
    return { ...state, ...action.payload }
  })
  builder.addCase(removeTransaction, () => {
    return {
      status: '',
      type: '',
    }
  })
})
