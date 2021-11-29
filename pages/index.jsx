import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Muon from 'muon'

import { useWeb3React } from '@web3-react/core'
import { useMuonState } from '../src/context'
import { findChain, toWei, findToken } from '../src/utils/utils'
import multicall from '../src/helper/multicall'
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
import { ERC20_ABI, MRC20Bridge_ABI } from '../src/constants/ABI'
import { MRC20Bridge } from '../src/constants/contracts'
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
    const getClaims = async () => {
      let claims = []

      // for (let index = 0; index < chains.length; index++) {
      //   const chain = chains[index]
      //   let dest = chains.filter((item) => item.id !== chain.id)
      //   let userTxs = []
      //   let userTxsResponse = []
      //   let pendingClaimTxs = []
      //   for (let i = 0; i < dest.length; i++) {
      //     const destChainId = dest[i].id

      //     const userTx = {
      //       address: MRC20Bridge[chain.id],
      //       name: 'getUserTxs',
      //       params: [account, destChainId]
      //     }
      //     userTxs.push(userTx)
      //   }

      //   try {
      //     const mul = await multicall(
      //       chain.web3,
      //       MRC20Bridge_ABI,
      //       userTxs,
      //       chain.id
      //     )
      //     userTxsResponse = mul
      //   } catch (error) {
      //     console.log('Error happend in geting getUserTxs', error)
      //   }
      //   for (let i = 0; i < dest.length; i++) {
      //     try {
      //       let destContract = makeContract(
      //         dest[i].web3,
      //         MRC20Bridge_ABI,
      //         MRC20Bridge[dest[i].id]
      //       )
      //       let pendingTxs = await destContract.methods
      //         .pendingTxs(
      //           chain.id,
      //           userTxsResponse[i][0].map((resp) => resp.toString())
      //         )
      //         .call()
      //       const pendingIndex = pendingTxs.reduce(
      //         (out, bool, index) =>
      //           bool ? out : out.concat(userTxsResponse[i][0][index]),
      //         []
      //       )
      //       pendingClaimTxs = [...pendingClaimTxs, ...pendingIndex]
      //     } catch (error) {
      //       console.log('Error happend in geting pendingTxs ', error)
      //     }
      //   }
      //   const Txs = []
      //   for (let j = 0; j < pendingClaimTxs.length; j++) {
      //     const tx = {
      //       address: MRC20Bridge[chain.id],
      //       name: 'txs',
      //       params: [pendingClaimTxs[j]]
      //     }
      //     Txs.push(tx)
      //   }

      //   try {
      //     const mul = await multicall(
      //       chain.web3,
      //       MRC20Bridge_ABI,
      //       Txs,
      //       chain.id
      //     )
      //     claims = [...claims, ...mul]
      //   } catch (error) {
      //     console.log('Error happend in geting Txs ', error)
      //   }
      // }

      let originContract = makeContract(
        state.bridge.fromChain.web3,
        MRC20Bridge_ABI,
        MRC20Bridge[state.bridge.fromChain.id]
      )
      let destContract = makeContract(
        state.bridge.toChain.web3,
        MRC20Bridge_ABI,
        MRC20Bridge[state.bridge.toChain.id]
      )
      try {
        let userTxs = await originContract.methods
          .getUserTxs(account, state.bridge.toChain.id)
          .call()
        let pendingTxs = await destContract.methods
          .pendingTxs(state.bridge.fromChain.id, userTxs)
          .call()

        const pendingIndex = pendingTxs.reduce(
          (out, bool, index) => (bool ? out : out.concat(index)),
          []
        )

        for (let index = 0; index < pendingIndex.length; index++) {
          let claim = await originContract.methods
            .txs(userTxs[pendingIndex[index]])
            .call()
          claims.push(claim)
        }
      } catch (error) {
        console.log('error happend in get Claim', error)
      }

      setClaims(claims)
      if (claims.length === 0) setActive('bridge')
    }

    const getBalance = async () => {
      let tokenBalances = []
      tokenBalances = await getAssetBalances(chains, state.tokens, account)
      dispatch({
        type: 'UPDATE_TOKENS',
        payload: tokenBalances
      })
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
      if (state.bridge.fromChain && state.bridge.toChain) {
        getClaims()
      }
    }

    const interval = setInterval(() => {
      if (account) {
        getBalance()
        if (state.bridge.fromChain && state.bridge.toChain) {
          getClaims()
        }
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [account, chainId, fetch, state.bridge.fromChain, state.bridge.toChain])

  React.useEffect(() => {
    const checkToken = async () => {
      if (state.bridge.toChain && state.bridge.token.id) {
        const Contract = makeContract(
          state.bridge.toChain.web3,
          MRC20Bridge_ABI,
          MRC20Bridge[state.bridge.toChain.id]
        )

        let address = await Contract.methods
          .tokens(state.bridge.token.id)
          .call()
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
        .allowance(account, MRC20Bridge[state.bridge.fromChain.id])
        .call()
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
          MRC20Bridge[state.bridge.fromChain.id],
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

      const Contract = makeContract(
        web3,
        MRC20Bridge_ABI,
        MRC20Bridge[state.bridge.fromChain.id]
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
        MRC20Bridge_ABI,
        MRC20Bridge[state.chainId]
      )

      let amount = web3.utils.fromWei(claim.amount.toString(), 'ether')
      setLock(claim)

      const muonResponse = await muon
        .app('fear_bridge')
        .method('claim', {
          depositAddress: MRC20Bridge[claim.fromChain],
          depositTxId: claim.txId,
          depositNetwork: fromChain.name.toLocaleLowerCase()
        })
        .call()
      let { sigs, reqId } = muonResponse
      const token = findToken(Number(claim.tokenId.toString()))

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
              tokenSymbol: token.symbol
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
              tokenSymbol: token.symbol
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
                tokenSymbol: token.symbol
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
              tokenSymbol: token.symbol
            }
          })
        })
    } catch (error) {
      setLock('')

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
              lock={lock}
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
