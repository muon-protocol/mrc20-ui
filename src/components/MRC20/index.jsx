import React from 'react'
import { Flex } from 'rebass'
import ActionButton from '../actionButton/ActionButton'
// import Claim from '../claim/Claim'
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
import { ActionBtnType } from '../../constants/constants'
import { MRC20Bridge } from '../../constants/contracts'
import { ERC20_ABI } from '../../constants/ABI'

const MRC20 = () => {
  const { account, chainId } = useWeb3React()

  const bridge = useBridge()
  const allowance = useAllowance(
    bridge.fromChain?.id,
    bridge.token?.address,
    MRC20Bridge[bridge.fromChain?.id],
    ERC20_ABI,
    fetch
  )
  const tx = useTx()
  const setApprove = useApprove()
  const updateFetchData = useSetFetch()

  const handleApprove = async () => {
    if (!account || allowance !== '0') return
    if (!chainId) return
    if (bridge.fromChain.id !== chainId) return
    if (tx.type === TransactionType.APPROVE && tx.status === TransactionStatus.PENDING) return
    let info = {
      type: TransactionType.APPROVE,
      chainId: bridge.fromChain?.id,
      fromChain: bridge.fromChain?.symbol,
      toChain: bridge.toChain?.symbol,
      tokenSymbol: bridge.token?.name,
    }

    setApprove(info, bridge.token.address, MRC20Bridge[bridge.fromChain?.id], ERC20_ABI).then(() =>
      updateFetchData(ActionBtnType.APPROVE)
    )
  }

  const handleDeposit = async () => {}
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
        {/* {claims.length > 0 && <Claim />} */}
      </Wrapper>
    </Container>
  )
}

export default MRC20
