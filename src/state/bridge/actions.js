import { createAction } from '@reduxjs/toolkit'

export const addOriginChain = createAction('ADD_ORIGIN_CHAIN')

export const addDestChain = createAction('ADD_DEST_CHAIN')

export const addToken = createAction('ADD_TOKEN')

export const addAmount = createAction('ADD_AMOUNT')

export const removeBridge = createAction('REMOVE_BRIDGE')

export const updateTokenOnOriginBridge = createAction('UPDATE_TOKEN_ON_ORIGIN_CHAIN')

export const updateTokenOnDestBridge = createAction('UPDATE_TOKEN_ON_DEST_CHAIN')

export const fetchData = createAction('FETCH_DATA')
