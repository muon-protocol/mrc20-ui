import React, { useEffect, useState } from 'react'
import ActionButton from '../actionButton/ActionButton'
import Claim from '../claim/Claim'
import { Container, Wrapper } from '../container/Container'
import Deposit from '../deposit'
import Transaction from '../transaction/Transaction'
import useAllowance from '../../hooks/useAllowance'
import useApprove from '../../hooks/useApprove'
import { useWeb3React } from '@web3-react/core'
import { useBridge, useSetFetch } from '../../state/bridge/hooks'
import { useTx } from '../../state/transactions/hooks'
import { TransactionStatus, TransactionType } from '../../constants/transactionStatus'
import { ActionBtnType, ErrorType } from '../../constants/constants'
import { MRC20Bridge } from '../../constants/contracts'
import { ERC20_ABI } from '../../constants/ABI'
import useDeposit from '../../hooks/useDeposit'
import { useFetchClaimFromGraph } from '../../hooks/useFetchClaim'
import { getPendingTxs } from '../../utils/graph'
import { toWei } from '../../utils/wei'
import { useError } from '../../state/application/hooks'
import styled from 'styled-components'
import { GunPortal } from './Title'


const MainWrap = styled.div`
  width: 100%;
  max-width: 470px;
  
`
const PortalWrap = styled.div`
  width: 100%;
  padding: 30px 20px;
position: relative;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
      border-radius: 12px;
    border: 3px solid #0F0;
    background: linear-gradient(180deg, #000 0%, rgba(24, 53, 46, 0.51) 48.5%, #152E28 100%);
`


const MRC20 = () => {
  const { account, chainId } = useWeb3React()
  const [pendingTxs, setPendingTxs] = useState([])

  const bridge = useBridge()
  const allowance = useAllowance(
    bridge.fromChain?.id,
    bridge.token?.address,
    MRC20Bridge[bridge.fromChain?.id],
    ERC20_ABI,
    bridge.fetch
  )
  const tx = useTx()
  const { setErrorInfo, removeErrorInfo } = useError()
  const setApprove = useApprove()
  const updateFetchData = useSetFetch()
  const deposit = useDeposit(chainId)

  const claims = useFetchClaimFromGraph(pendingTxs, bridge.fetch)

  useEffect(() => {
    let getPending = async () => {
      try {
        let pendingTxs = await getPendingTxs(account)
        if (pendingTxs != undefined) {
          setPendingTxs(pendingTxs)
        }
      } catch (error) {
        console.log("error happend in get pending", error)
      }

    }

    if (account) getPending()
  }, [account])

  const handleApprove = async () => {
    try {
      if (!account || allowance !== '0') return
      if (!chainId) return
      if (bridge.fromChain.id !== chainId) return
      if (tx.type === TransactionType.APPROVE && tx.status === TransactionStatus.PENDING) return
      let info = {
        type: TransactionType.APPROVE,
        chainId: bridge.fromChain?.id,
        fromChain: bridge.fromChain?.symbol,
        toChain: bridge.toChain?.symbol,
        tokenSymbol: bridge.token?.symbol,
      }

      setApprove(info, bridge.token.address, MRC20Bridge[bridge.fromChain?.id], ERC20_ABI).then(() =>
        updateFetchData(ActionBtnType.APPROVE)
      )
    } catch (error) {
      console.log("error happened in approve", error)
    }
  }

  const handleDeposit = async () => {
    try {
      removeErrorInfo()
      if (!account) return
      if (!chainId) return
      if (tx.type === TransactionType.DEPOSIT && tx.status === TransactionStatus.PENDING) return
      if (bridge.fromChain.id !== chainId) return
      if (
        parseFloat(bridge.amount) <= 0 ||
        bridge.amount === '0' ||
        bridge.amount === '' ||
        parseFloat(bridge.amount) > parseFloat(bridge.token.balance)
      ) {
        setErrorInfo({ message: 'Wrong Amount', type: ErrorType.AMOUNT_INPUT })
        return
      }
      deposit()
        .then((receipt) => {
          let pending = {
            id: receipt.events.Deposit.returnValues.txId.toString().concat(':').concat(bridge.fromChain.id.toString()),
            txId: receipt.events.Deposit.returnValues.txId,
            tokenId: bridge.tokenOnOriginBridge,
            fromChain: bridge.fromChain.id,
            toChain: bridge.toChain.id,
            amount: toWei(bridge.amount),
            user: account,
            tokenAddress: bridge.token.address,
            deposited: true,
            claimed: false,
          }
          setPendingTxs((prev) => [...prev, pending])
          updateFetchData(Date.now())
        })
        .catch(() => updateFetchData(Date.now()))
    } catch (error) {
      console.log('error happend in deposit', error)
    }
  }

  const updatePendingTx = (id) => {
    let pendingFiltered = pendingTxs.filter((item) => item.id != id)
    setPendingTxs(pendingFiltered)
  }
  return (
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <MainWrap>
        <GunPortal />
        <PortalWrap >
          <Deposit />
          <ActionButton handleApprove={handleApprove} handleDeposit={handleDeposit} allowance={allowance} />
        </PortalWrap>
      </MainWrap>
      <Wrapper maxWidth="300px" width="100%">
        {tx.status && <Transaction />}
        {claims.length > 0 && <Claim claims={claims} fetchData={(txId) => updatePendingTx(txId)} />}
      </Wrapper>
    </Container>
  )
}

export default MRC20
