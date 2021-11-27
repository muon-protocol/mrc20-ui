import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Muon from 'muon'

import { useWeb3React } from '@web3-react/core'
import { useMuonState } from '../src/context'
import { findChain, findTokenWithAddress, toWei } from '../src/utils/utils'

const ClaimToken = dynamic(() => import('../src/components/home/ClaimToken'))
const CustomTranaction = dynamic(() =>
  import('../src/components/common/CustomTranaction')
)
const Deposit = dynamic(() => import('../src/components/home/Deposit'))
import { chains, validChains } from '../src/constants/chains'
const WalletModal = dynamic(() =>
  import('../src/components/common/WalletModal')
)
import {
  Tab,
  TabContainer,
  Wrapper,
  DepositWrapper,
  BoxWrapper,
  ClaimWrapper,
  Badge
} from '../src/components/home'
import { NameChainMap } from '../src/constants/chainsMap'
import {
  TransactionStatus,
  TransactionType
} from '../src/constants/transactionStatus'
import { findAndAddToken, getToken } from '../src/helper/Tokens'
import useWeb3 from '../src/helper/useWeb3'
import getAssetBalances from '../src/helper/getAssetBalances'
import { ERC20_ABI, FearBridge_ABI } from '../src/constants/ABI'
import { FearBridge } from '../src/constants/contracts'
import { makeContract } from '../src/helper'
import { AddressZero } from '@ethersproject/constants'
import { Type } from '../src/components/common/Text'

const HomePage = () => {
  const { account, chainId } = useWeb3React()
  const { state, dispatch } = useMuonState()
  const [lock, setLock] = React.useState('')
  const web3 = useWeb3()
  const [checkDestToken, setCheckDestToken] = React.useState('')
  const [claims, setClaims] = React.useState([])
  const [wrongNetwork, setWrongNetwork] = React.useState(false)
  const [fetch, setFetch] = React.useState('')
  const [destChains, setDestChains] = React.useState([])
  // const [tokenBalance, setTokenBalance] = React.useState('0')
  const [open, setOpen] = React.useState(false)
  const [errorAmount, setErrorAmount] = React.useState(false)
  const [active, setActive] = React.useState('bridge')
  const muon = new Muon(process.env.NEXT_PUBLIC_MUON_NODE_GATEWAY)

  React.useEffect(() => {
    dispatch({
      type: 'CLEAN_DATA'
    })
  }, [account])

  React.useEffect(() => {
    if (!validChains.includes(chainId)) {
      setWrongNetwork(true)
    }
    return () => {
      setWrongNetwork(false)
    }
  }, [chainId, state.bridge, account])

  React.useEffect(() => {
    const searchToken = async () => {
      if (state.tokenSearchQuery && account) {
        let result = await findAndAddToken(
          state.tokenSearchQuery,
          state.tokens,
          state.account,
          state.bridge.fromChain
        )
        dispatch({
          type: 'UPDATE_SHOW_TOKENS',
          payload: result.resultFilter
        })
      } else {
        dispatch({
          type: 'UPDATE_SHOW_TOKENS',
          payload: state.tokens
        })
      }
    }
    searchToken()
  }, [state.tokenSearchQuery, account])

  React.useEffect(() => {
    if (state.bridge.token) {
      const value = state.bridge.token.balances[state.bridge.fromChain.id]
        ? `${state.bridge.token.balances[state.bridge.fromChain.id]} ${
            state.bridge.token.symbol
          }`
        : '0'
      dispatch({
        type: 'SET_TOKEN_BALANCE',
        payload: value
      })

      // setTokenBalance(value)
    }
  }, [
    state.bridge.token,
    state.bridge.fromChain,
    // account,
    chainId,
    state.tokens
  ])

  React.useEffect(() => {
    const filter = chains.filter(
      (item) => item.id !== state.bridge.fromChain.id
    )
    setDestChains(filter)
  }, [state.bridge.fromChain])

  React.useEffect(() => {
    const findClaim = async () => {
      let claims = []

      for (let index = 0; index < chains.length; index++) {
        const chain = chains[index]

        let originContract = makeContract(
          chain.web3,
          FearBridge_ABI,
          FearBridge[chain.id]
        )

        let dest = chains.filter((item) => item.id !== chain.id)
        for (let index = 0; index < dest.length; index++) {
          const item = dest[index]

          let destContract = makeContract(
            item.web3,
            FearBridge_ABI,
            FearBridge[item.id]
          )

          try {
            let userTxs = await originContract.methods
              .getUserTxs(account, item.id)
              .call()

            let pendingTxs = await destContract.methods
              .pendingTxs(chain.id, userTxs)
              .call()
            const pendingIndex = pendingTxs.reduce(
              (out, bool, index) => (bool ? out : out.concat(index)),
              []
            )
            for (let index = 0; index < pendingIndex.length; index++) {
              let claim = await originContract.methods
                .txs(userTxs[pendingIndex[index]])
                .call()
              let tokenAddress = await destContract.methods
                .tokens(claim.tokenId)
                .call()

              let customTokens = JSON.parse(localStorage.getItem('tokens'))

              let finalTokens = customTokens
                ? [...state.tokens, ...customTokens]
                : state.tokens
              let token = findTokenWithAddress(
                finalTokens,
                tokenAddress,
                item.id
              )
              if (!token) {
                token = await getToken(tokenAddress, account, item)
              }
              claims.push({ ...claim, token })
            }
          } catch (error) {
            console.log('error happend in find Claim', error)
          }
        }
      }

      setClaims(claims)
      if (claims.length === 0) setActive('bridge')
    }

    const getBalance = async () => {
      let tokenBalances = []
      // let customTokens = JSON.parse(localStorage.getItem('tokens'))
      // if (customTokens) {
      //   const exist = state.tokens.filter((elem) =>
      //     customTokens.find(
      //       ({ name, symbol }) => elem.name === name && elem.symbol === symbol
      //     )
      //   )
      //   if (exist.length === 0) {
      //     let finalTokens = [...state.tokens, ...customTokens]
      //     tokenBalances = await getAssetBalances(chains, finalTokens, account)
      //     dispatch({
      //       type: 'UPDATE_TOKENS',
      //       payload: tokenBalances
      //     })
      //   } else {
      //     tokenBalances = await getAssetBalances(chains, state.tokens, account)
      //     dispatch({
      //       type: 'UPDATE_TOKENS',
      //       payload: tokenBalances
      //     })
      //   }
      // } else {
      tokenBalances = await getAssetBalances(chains, state.tokens, account)
      dispatch({
        type: 'UPDATE_TOKENS',
        payload: tokenBalances
      })
      // }
      // if (state.bridge.token) {
      //   const token = tokenBalances.find(
      //     (item) => item.id === state.bridge.token.id
      //   )
      //   const value = token.balances[state.bridge.fromChain.id]
      //     ? `${token.balances[state.bridge.fromChain.id]} ${token.symbol}`
      //     : '0'
      //   dispatch({
      //     type: 'SET_TOKEN_BALANCE',
      //     payload: value
      //   })
      //   // setTokenBalance(value)
      // }
    }

    if (account) {
      dispatch({
        type: 'UPDATE_NETWORK_INFO',
        payload: {
          account,
          chainId,
          network: NameChainMap[chainId]
        }
      })
      getBalance()
      findClaim()
    }

    // const interval = setInterval(() => {
    //   if (account) {
    //     getBalance()
    //     findClaim()
    //   }
    // }, 15000)

    // return () => clearInterval(interval)
  }, [account, chainId, fetch])

  React.useEffect(() => {
    const checkToken = async () => {
      if (state.bridge.toChain && state.bridge.token.id) {
        const Contract = makeContract(
          state.bridge.toChain.web3,
          FearBridge_ABI,
          FearBridge[state.bridge.toChain.id]
        )

        let address = await Contract.methods
          .tokens(state.bridge.token.id)
          .call()
        console.log('adddddddddddddrs', address)
        if (address !== AddressZero) {
          let selectedToken = {
            ...state.bridge.token,
            address: {
              ...state.bridge.token.address,
              [state.bridge.toChain.id]: address
            }
          }
          dispatch({
            type: 'UPDATE_BRIDGE',
            payload: {
              field: 'token',
              value: selectedToken
            }
          })
        }

        dispatch({
          type: 'UPDATE_TO_CHAIN_TOKEN_EXIST',
          payload: address !== AddressZero
        })
      }
    }
    checkToken()
  }, [state.bridge.token.id, state.bridge.toChain, checkDestToken])

  const updateBridge = async (field, value) => {
    try {
      switch (field) {
        case 'amount':
          setErrorAmount(false)
          dispatch({
            type: 'UPDATE_BRIDGE',
            payload: {
              field,
              value
            }
          })
          break
        case 'fromChain':
          // setTokenBalance('0')
          dispatch({
            type: 'SET_TOKEN_BALANCE',
            payload: '0'
          })
          dispatch({
            type: 'UPDATE_BRIDGE_FROMCHAIN',
            payload: {
              field,
              value
            }
          })
          break
        case 'toChain':
          dispatch({
            type: 'UPDATE_BRIDGE',
            payload: {
              field,
              value
            }
          })
          break
        case 'token':
          // Search in fromChain

          console.log('value', value, field)

          if (value.notPermission) {
            dispatch({
              type: 'UPDATE_ACTION_BUTTON_TYPE',
              payload: 'bridgeFromChain'
            })
            dispatch({
              type: 'UPDATE_TO_CHAIN_TOKEN_EXIST',
              payload: false
            })
          } else {
            setCheckDestToken(new Date().getTime())
            dispatch({
              type: 'FROM_CHAIN_TOKEN_ID',
              payload: value.id
            })
          }

          dispatch({
            type: 'UPDATE_BRIDGE',
            payload: {
              field,
              value
            }
          })

          dispatch({
            type: 'UPDATE_FROM_CHAIN_TOKEN_EXIST',
            payload: !value.notPermission
          })
          const balance = value.balances[state.bridge.fromChain.id]
            ? `${value.balances[state.bridge.fromChain.id]} ${value.symbol}`
            : '0'
          dispatch({
            type: 'SET_TOKEN_BALANCE',
            payload: balance
          })
          break

        default:
          break
      }
    } catch (error) {
      console.log('error happend in update bridge', error)
    }
  }

  React.useEffect(() => {
    const checkApprove = async () => {
      let fromChain = findChain(state.bridge.fromChain.id)

      const Contract = makeContract(
        fromChain.web3,
        ERC20_ABI,
        state.bridge.token.address[state.bridge.fromChain.id]
      )
      let approve = await Contract.methods
        .allowance(account, FearBridge[state.bridge.fromChain.id])
        .call()
      console.log({ approve })
      if (approve !== '0') {
        dispatch({
          type: 'UPDATE_APPROVE',
          payload: true
        })
      } else {
        dispatch({
          type: 'UPDATE_APPROVE',
          payload: false
        })
      }
    }
    if (account && state.bridge.fromChain && state.bridge.token) checkApprove()
  }, [state.bridge.fromChain, state.bridge.token, account])

  const handleConnectWallet = async () => {
    setOpen(true)
  }

  React.useEffect(() => {
    if (!state.fromChainTokenExit && state.bridge.fromChain) {
      dispatch({
        type: 'UPDATE_ACTION_BUTTON_TYPE',
        payload: 'bridgeFromChain'
      })
      return
    }
    if (!state.toChainTokenExit && state.bridge.token) {
      dispatch({
        type: 'UPDATE_ACTION_BUTTON_TYPE',
        payload: 'bridgeToChain'
      })
      return
    }
    if (
      state.fromChainTokenExit &&
      state.toChainTokenExit &&
      state.bridge.fromChain &&
      state.bridge.token &&
      state.bridge.toChain &&
      !state.approve
    ) {
      dispatch({
        type: 'UPDATE_ACTION_BUTTON_TYPE',
        payload: 'approve'
      })
      return
    }
    if (
      state.fromChainTokenExit &&
      state.toChainTokenExit &&
      state.bridge.fromChain &&
      state.bridge.token &&
      state.bridge.toChain &&
      state.approve
    ) {
      dispatch({
        type: 'UPDATE_ACTION_BUTTON_TYPE',
        payload: 'deposit'
      })
      return
    }
  }, [
    state.bridge,
    state.fromChainTokenExit,
    state.toChainTokenExit,
    account,
    state.approve
  ])
  const handleApprove = async () => {
    try {
      if (!state.account || state.approve) return

      if (state.bridge.fromChain.id !== state.chainId) {
        setWrongNetwork(true)
        return
      }
      if (
        state.transaction.type === TransactionType.Approve &&
        state.transaction.status === TransactionStatus.PENDING
      ) {
        return
      }
      let hash = ''
      let Contract = makeContract(
        web3,
        ERC20_ABI,
        state.bridge.token.address[state.bridge.fromChain.id]
      )
      Contract.methods
        .approve(
          FearBridge[state.bridge.fromChain.id],
          toWei('1000000000000000000')
        )
        .send({ from: state.account })
        .once('transactionHash', (tx) => {
          hash = tx
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.Approve,
              hash,
              message: 'Approving transaction is pending',
              status: TransactionStatus.PENDING,
              chainId: state.bridge.fromChain.id,
              fromChain: state.bridge.fromChain.symbol,
              toChain: state.bridge.toChain.symbol,
              tokenSymbol: state.bridge.token.symbol
            }
          })
        })
        .once('receipt', ({ transactionHash }) => {
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.Approve,
              hash: transactionHash,
              message: 'Transaction successfull',
              status: TransactionStatus.SUCCESS,
              chainId: state.bridge.fromChain.id,
              fromChain: state.bridge.fromChain.symbol,
              toChain: state.bridge.toChain.symbol,
              tokenSymbol: state.bridge.token.symbol
            }
          })
          dispatch({
            type: 'UPDATE_APPROVE',
            payload: true
          })
          dispatch({
            type: 'UPDATE_ACTION_BUTTON_TYPE',
            payload: 'deposit'
          })
        })
        .once('error', (error) => {
          if (!hash) {
            dispatch({
              type: 'UPDATE_TRANSACTION',
              payload: {
                type: TransactionType.Approve,
                message: 'Transaction rejected',
                status: TransactionStatus.FAILED,
                chainId: state.bridge.fromChain.id,
                fromChain: state.bridge.fromChain.symbol,
                toChain: state.bridge.toChain.symbol,
                tokenSymbol: state.bridge.token.symbol
              }
            })
            return
          }
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.Approve,
              hash,
              message: 'Transaction failed',
              status: TransactionStatus.FAILED,
              chainId: state.bridge.fromChain.id,
              fromChain: state.bridge.fromChain.symbol,
              toChain: state.bridge.toChain.symbol,
              tokenSymbol: state.bridge.token.symbol
            }
          })
        })
    } catch (error) {
      console.log('error happend in Approve', error)
    }
  }
  const handleDeposit = async () => {
    try {
      setErrorAmount(false)
      if (!account) {
        return
      }

      if (
        state.bridge.amount === '0' ||
        state.bridge.amount === '' ||
        state.bridge.amount >
          state.bridge.token.balances[state.bridge.fromChain.id]
      ) {
        setErrorAmount(true)
        return
      }
      if (
        state.transaction.type === TransactionType.DEPOSIT &&
        state.transaction.status === TransactionStatus.PENDING
      ) {
        return
      }
      if (state.bridge.fromChain.id !== state.chainId) {
        setWrongNetwork(true)
        return
      }
      console.log({
        amount: toWei(state.bridge.amount),
        tochain: state.bridge.toChain.id,
        tokenId: state.bridge.token.id
      })
      const Contract = makeContract(
        web3,
        FearBridge_ABI,
        FearBridge[state.bridge.fromChain.id]
      )
      let hash = ''
      Contract.methods
        .deposit(
          toWei(state.bridge.amount),
          state.bridge.toChain.id,
          state.bridge.token.id
        )
        .send({ from: state.account })
        .once('transactionHash', (tx) => {
          hash = tx
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.DEPOSIT,
              hash,
              message: 'Depositing transaction is pending',
              status: TransactionStatus.PENDING,
              chainId: state.bridge.fromChain.id,
              fromChain: state.bridge.fromChain.symbol,
              toChain: state.bridge.toChain.symbol,
              amount: state.bridge.amount,
              tokenSymbol: state.bridge.token.symbol
            }
          })
        })
        .once('receipt', ({ transactionHash }) => {
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.DEPOSIT,
              hash: transactionHash,
              message: 'Transaction successfull',
              status: TransactionStatus.SUCCESS,
              chainId: state.bridge.fromChain.id,
              fromChain: state.bridge.fromChain.symbol,
              toChain: state.bridge.toChain.symbol,
              amount: state.bridge.amount,
              tokenSymbol: state.bridge.token.symbol
            }
          })
          setFetch(new Date().getTime())
          let tBalance = tokenBalance.split(' ')
          let balance = `${Number(tBalance[0]) - state.bridge.amount} ${
            tBalance[1]
          }`
          dispatch({
            type: 'SET_TOKEN_BALANCE',
            payload: balance
          })
          // setTokenBalance(balance)
        })
        .once('error', (error) => {
          if (!hash) {
            dispatch({
              type: 'UPDATE_TRANSACTION',
              payload: {
                type: TransactionType.DEPOSIT,
                message: 'Transaction rejected',
                status: TransactionStatus.FAILED,
                chainId: state.bridge.fromChain.id,
                fromChain: state.bridge.fromChain.symbol,
                toChain: state.bridge.toChain.symbol,
                amount: state.bridge.amount,
                tokenSymbol: state.bridge.token.symbol
              }
            })
            return
          }
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.DEPOSIT,
              hash,
              message: 'Transaction failed',
              status: TransactionStatus.FAILED,
              chainId: state.bridge.fromChain.id,
              fromChain: state.bridge.fromChain.symbol,
              toChain: state.bridge.toChain.symbol,
              amount: state.bridge.amount,
              tokenSymbol: state.bridge.token.symbol
            }
          })
        })
    } catch (error) {
      console.log('error happend in Deposit', error)
    }
  }

  const handleClaim = async (claim) => {
    const fromChain = findChain(Number(claim.fromChain))
    const toChain = findChain(Number(claim.toChain))
    let hash = ''
    try {
      if (
        lock &&
        lock.fromChain === claim.fromChain &&
        lock.toChain === claim.toChain &&
        lock.txId === claim.txId
      ) {
        return
      }
      let Contract = makeContract(
        web3,
        FearBridge_ABI,
        FearBridge[state.chainId]
      )

      let amount = web3.utils.fromWei(claim.amount, 'ether')
      console.log({
        depositAddress: FearBridge[claim.fromChain],
        depositTxId: claim.txId,
        depositNetwork: fromChain.name.toLocaleLowerCase()
      })
      const muonResponse = await muon
        .app('fear_bridge')
        .method('claim', {
          depositAddress: FearBridge[claim.fromChain],
          depositTxId: claim.txId,
          depositNetwork: fromChain.name.toLocaleLowerCase()
        })
        .call()
      console.log(muonResponse)
      let { sigs, reqId } = muonResponse
      setLock(claim)
      Contract.methods
        .claim(
          account,
          claim.amount,
          claim.fromChain,
          claim.toChain,
          claim.tokenId,
          claim.txId,
          reqId,
          sigs
        )
        .send({ from: state.account })
        .once('transactionHash', (tx) => {
          hash = tx
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.CLAIM,
              hash,
              message: 'Caliming transaction is pending',
              status: TransactionStatus.PENDING,
              chainId: toChain.id,
              toChain: toChain.symbol,
              amount: amount,
              tokenSymbol: claim.token.symbol
            }
          })
        })
        .once('receipt', ({ transactionHash }) => {
          setLock('')
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.CLAIM,
              hash,
              message: 'Transaction successfull',
              status: TransactionStatus.SUCCESS,
              chainId: toChain.id,
              toChain: toChain.symbol,
              amount: amount,
              tokenSymbol: claim.token.symbol
            }
          })
          setFetch(claim)
        })
        .once('error', (error) => {
          setLock('')
          if (!hash) {
            dispatch({
              type: 'UPDATE_TRANSACTION',
              payload: {
                type: TransactionType.CLAIM,
                hash,
                message: 'Transaction rejected',
                status: TransactionStatus.FAILED,
                chainId: toChain.id,
                toChain: toChain.symbol,
                amount: amount,
                tokenSymbol: claim.token.symbol
              }
            })
            return
          }
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.CLAIM,
              hash,
              message: 'Transaction failed',
              status: TransactionStatus.FAILED,
              chainId: toChain.id,
              toChain: toChain.symbol,
              amount: amount,
              tokenSymbol: claim.token.symbol
            }
          })
        })
    } catch (error) {
      console.log('error happend in Claim', error)
    }
  }

  return (
    <>
      <Head>
        <title>Muon Bridge</title>
      </Head>
      <TabContainer>
        <Tab active={active === 'bridge'} onClick={() => setActive('bridge')}>
          <Type.SM fontSize="15px" fontFamily="FH Oscar">
            Bridge
          </Type.SM>
        </Tab>
        {claims.length > 0 && (
          <Tab active={active === 'claim'} onClick={() => setActive('claim')}>
            <Type.SM fontSize="15px" fontFamily="FH Oscar" position="relative">
              Claim Token
              <Badge>{claims.length}</Badge>
            </Type.SM>
          </Tab>
        )}
      </TabContainer>
      <Wrapper>
        <ClaimWrapper maxWidth="340px" width="100%" active={active}>
          {claims.length > 0 && (
            <ClaimToken
              claims={claims}
              handleClaim={(claim) => handleClaim(claim)}
            />
          )}
        </ClaimWrapper>

        <DepositWrapper maxWidth="600px" width="100%" active={active}>
          <Deposit
            handleDeposit={handleDeposit}
            wrongNetwork={wrongNetwork}
            destChains={destChains}
            // tokenBalance={tokenBalance}
            updateBridge={updateBridge}
            handleConnectWallet={handleConnectWallet}
            handleApprove={handleApprove}
            errorAmount={errorAmount}
          />
        </DepositWrapper>
        <BoxWrapper maxWidth="340px" width="100%">
          {state.transaction.status && <CustomTranaction />}
        </BoxWrapper>
      </Wrapper>
      <WalletModal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
      />
    </>
  )
}
export default HomePage
