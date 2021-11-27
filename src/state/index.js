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
      console.log('UPDATE_TOKENS', action)
      newState = {
        ...state,
        tokens: action.payload
        // showTokens: action.payload
      }
      break

    case 'ADD_NEW_TOKEN':
      console.log('ADD_NEW_TOKEN', action)

      newState = { ...state, tokens: [...state.tokens, action.payload] }
      break

    case 'ADD_NEW_TOKENS':
      console.log('ADD_NEW_TOKENs', action)

      newState = { ...state, tokens: [...state.tokens, ...action.payload] }
      break

    case 'UPDATE_SHOW_TOKENS':
      console.log('UPDATE_SHOW_TOKENS', action)
      newState = { ...state, showTokens: action.payload }
      break

    case 'UPDATE_ACTION_BUTTON_TYPE':
      console.log('UPDATE_ACTION_BUTTON_TYPE', action)

      newState = { ...state, actionBtnType: action.payload }
      break

    case 'UPDATE_FROM_CHAIN_TOKEN_EXIST':
      console.log('UPDATE_FROM_CHAIN_TOKEN_EXIST', action)

      newState = { ...state, fromChainTokenExit: action.payload }
      break

    case 'UPDATE_TO_CHAIN_TOKEN_EXIST':
      console.log('UPDATE_TO_CHAIN_TOKEN_EXIST', action)

      newState = { ...state, toChainTokenExit: action.payload }
      break

    case 'FROM_CHAIN_TOKEN_ID':
      console.log('FROM_CHAIN_TOKEN_ID', action)

      newState = {
        ...state,
        bridge: { ...state.bridge, fromChainTokenId: action.payload }
      }
      break

    case 'UPDATE_BRIDGE':
      console.log('UPDATE_BRIDGE', action)
      newState = {
        ...state,
        bridge: {
          ...state.bridge,
          [action.payload.field]: action.payload.value
        }
      }
      break

    case 'UPDATE_BRIDGE_FROMCHAIN':
      console.log('UPDATE_BRIDGE_FROMCHAIN', action)

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
      console.log('UPDATE_TOKEN_SEARCH_QUERY', action)

      newState = {
        ...state,
        tokenSearchQuery: action.payload
      }
      break

    case 'UPDATE_TRANSACTION':
      console.log('UPDATE_TRANSACTION', action)

      newState = {
        ...state,
        transaction: {
          ...action.payload
        }
      }
      break

    case 'UPDATE_APPROVE':
      console.log('UPDATE_APPROVE', action)

      newState = { ...state, approve: action.payload }
      break

    case 'SET_TOKEN_BALANCE':
      console.log('SET_TOKEN_BALANCE', action)

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
