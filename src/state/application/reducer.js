import { createReducer } from '@reduxjs/toolkit'
import { updateSearchQuery,setError,removeError } from './actions'

const initialState = {

  searchQuery: '',
  errorMessage: '',
  error: false,
  errorType: '',

}

export default createReducer(initialState, (builder) => {

  //Search Query Modal
  builder.addCase(updateSearchQuery, (state, action) => {
    return { ...state, searchQuery: action.payload }
  })

  builder.addCase(setError, (state, action) => {
    return { ...state, error: true, errorMessage: action.payload.message, errorType: action.payload.type }
  })

  builder.addCase(removeError, (state) => {
    return { ...state, error: false, errorMessage: '', errorType: '' }
  })
})
