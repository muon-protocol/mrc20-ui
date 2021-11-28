import { tokens } from '../constants/tokens'

export const initState = {
  account: '',
  chainId: '',
  network: 'NaN',
  tokens: tokens,
  showTokens: tokens,
  fromChainTokenExit: true,
  toChainTokenExit: true,
  approve: false,
  actionBtnType: 'select',
  tokenBalance: '0',
  bridge: {
    fromChain: '',
    toChain: '',
    token: '',
    amount: ''
  },
  tokenSearchQuery: '',
  transaction: {
    type: '',
    message: '',
    status: '',
    icon: '',
    fromChain: '',
    toChain: ''
  }
}

export const reducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_NETWORK_INFO':
      newState = {
        ...state,
        account: action.payload.account,
        chainId: action.payload.chainId,
        network: action.payload.network
      }
      break

    case 'UPDATE_TOKENS':
      newState = {
        ...state,
        tokens: action.payload
        // showTokens: action.payload
      }
      break

    case 'ADD_NEW_TOKEN':
      newState = { ...state, tokens: [...state.tokens, action.payload] }
      break

    case 'ADD_NEW_TOKENS':
      newState = { ...state, tokens: [...state.tokens, ...action.payload] }
      break

    case 'UPDATE_SHOW_TOKENS':
      newState = { ...state, showTokens: action.payload }
      break

    case 'UPDATE_ACTION_BUTTON_TYPE':
      newState = { ...state, actionBtnType: action.payload }
      break

    case 'UPDATE_FROM_CHAIN_TOKEN_EXIST':
      newState = { ...state, fromChainTokenExit: action.payload }
      break

    case 'UPDATE_TO_CHAIN_TOKEN_EXIST':
      newState = { ...state, toChainTokenExit: action.payload }
      break

    case 'FROM_CHAIN_TOKEN_ID':
      newState = {
        ...state,
        bridge: { ...state.bridge, fromChainTokenId: action.payload }
      }
      break

    case 'UPDATE_BRIDGE':
      newState = {
        ...state,
        bridge: {
          ...state.bridge,
          [action.payload.field]: action.payload.value
        }
      }
      break

    case 'UPDATE_BRIDGE_FROMCHAIN':
      newState = {
        ...state,
        bridge: {
          ...state.bridge,
          toChain: '',
          token: '',
          amount: '',
          [action.payload.field]: action.payload.value
        }
      }
      break

    case 'UPDATE_TOKEN_SEARCH_QUERY':
      newState = {
        ...state,
        tokenSearchQuery: action.payload
      }
      break

    case 'UPDATE_TRANSACTION':
      newState = {
        ...state,
        transaction: {
          ...action.payload
        }
      }
      break

    case 'UPDATE_APPROVE':
      newState = { ...state, approve: action.payload }
      break

    case 'SET_TOKEN_BALANCE':
      newState = { ...state, tokenBalance: action.payload }
      break

    case 'CLEAN_DATA':
      newState = {
        ...state,
        actionBtnType: 'select',
        tokenBalance: '0',
        bridge: {
          fromChainTokenId: '',
          fromChain: '',
          toChain: '',
          token: '',
          amount: ''
        },
        transaction: {
          type: '',
          message: '',
          status: '',
          icon: '',
          fromChain: '',
          toChain: ''
        }
      }
      break

    default:
      throw new Error(`${action.type} is not defined in this state!`)
      break
  }
  return newState
}
