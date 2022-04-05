import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import ActionButton from '../actionButton/ActionButton'
import Claim from '../claim/Claim'
import { Container, Wrapper } from '../container/Container'
import Deposit from '../deposit'
import { Type } from '../text/Text'
import Transaction from '../transaction/Transaction'
import MuonNetwork from '../common/MuonNetwork'
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
      let pendingTxs = await getPendingTxs(account)
      if (pendingTxs != undefined) {
        setPendingTxs(pendingTxs)
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
      console.log("error happend in approve",error)
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
      <Wrapper maxWidth="470px" width="100%">
        <Deposit />
        <ActionButton handleApprove={handleApprove} handleDeposit={handleDeposit} allowance={allowance} />

        <Flex justifyContent="center" margin="50px 0 20px">
          <Type.SM color="#313144" fontSize="10px" padding="10px">
            Powered by
          </Type.SM>
          <MuonNetwork logo="muonNetworkBlack" />
        </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
        {tx.status && <Transaction />}
        {claims.length > 0 && <Claim claims={claims} fetchData={(txId) => updatePendingTx(txId)} />}
      </Wrapper>
    </Container>
  )
}

export default MRC20
