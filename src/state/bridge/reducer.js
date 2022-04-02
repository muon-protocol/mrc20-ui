import { createReducer } from '@reduxjs/toolkit'
import {
  addToken,
  addDestChain,
  addOriginChain,
  updateTokenOnOriginBridge,
  updateTokenOnDestBridge,
  addAmount,
  removeBridge,
  fetchData,
} from './actions'

const initialState = {
  fromChain: null,
  token: null,
  amount: '',
  toChain: null,
  tokenOnOriginBridge: '0',
  tokenOnDestBridge: false,
  fetch: null,
}

export default createReducer(initialState, (builder) => {
  // add origin chain
  builder.addCase(addOriginChain, (state, action) => {
    return { ...state, fromChain: action.payload }
  })
  //   add dest chain
  builder.addCase(addDestChain, (state, action) => {
    return { ...state, toChain: action.payload }
  })
  //   add Token
  builder.addCase(addToken, (state, action) => {
    return { ...state, token: action.payload }
  })
  //   add amount
  builder.addCase(addAmount, (state, action) => {
    console.log(action)
    return { ...state, amount: action.payload }
  })
  // Update token on bridge
  builder.addCase(updateTokenOnOriginBridge, (state, action) => {
    return { ...state, tokenOnOriginBridge: action.payload }
  })
  // Update token on bridge
  builder.addCase(updateTokenOnDestBridge, (state, action) => {
    return { ...state, tokenOnDestBridge: action.payload }
  })
  // update fetch
  builder.addCase(fetchData, (state, action) => {
    return { ...state, fetch: action.payload }
  })

  // remove bridge
  builder.addCase(removeBridge, () => {
    return {
      fromChain: null,
      token: null,
      amount: '',
      toChain: null,
      tokenOnOriginBridge: false,
      tokenOnDestBridge: false,
    }
  })
})
