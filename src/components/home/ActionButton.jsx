import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  TransactionStatus,
  TransactionType
} from '../../constants/transactionStatus'
import { useMuonState } from '../../context'
import { Button } from '../common/FormControlls'
import { Type } from '../common/Text'
import { addRPC } from '../../helper/addRPC'
import { NameChainMap } from '../../constants/chainsMap'

const ActionButton = (props) => {
  const { state } = useMuonState()
  const { wrongNetwork, handleConnectWallet, handleDeposit, handleApprove } =
    props
  let content = ''
  const { chainId } = useWeb3React()

  let validChainId = null
  if (state.bridge.fromChain && state.bridge.toChain) {
    if (
      state.actionBtnType === 'bridgeToChain' &&
      state.bridge.toChain.id !== chainId
    )
      validChainId = state.bridge.toChain.id
    else if (
      state.actionBtnType !== 'bridgeToChain' &&
      state.bridge.fromChain.id !== chainId
    )
      validChainId = state.bridge.fromChain.id
  }

  switch (state.actionBtnType) {
    case 'bridgeFromChain':
      content = (
        <Button margin="50px 0 0" cursor="default">
          <Type.LG
            color="#909090"
            fontFamily="FH Oscar"
            fontSizeXS="16px"
            fontSizeXXS="14px"
          >
            Select Asset and Chains
          </Type.LG>
        </Button>
      )
      break
    case 'bridgeToChain':
      content = (
        <Button margin="50px 0 0" cursor="default">
          <Type.LG
            color="#909090"
            fontFamily="FH Oscar"
            fontSizeXS="16px"
            fontSizeXXS="14px"
          >
            Select Asset and Chains
          </Type.LG>
        </Button>
      )
      break
    case 'approve':
      let approveStatus =
        state.transaction.status === TransactionStatus.PENDING &&
        state.transaction.type === TransactionType.Approve
      content = (
        <Button
          margin="50px 0 0"
          background="#5F5CFE"
          onClick={handleApprove}
          background={approveStatus ? '#B4B3FD' : '#5F5CFE'}
          border={approveStatus ? '1px solid #5F5CFE' : 'transparent'}
          cursor={approveStatus ? 'default' : 'pointer'}
        >
          <Type.LG
            color={approveStatus ? '#313144' : '#ffffff'}
            fontFamily="FH Oscar"
            fontSizeXS="16px"
            cursor={approveStatus ? 'default' : 'pointer'}
          >
            {approveStatus ? 'Approving ...' : 'Approve'}
          </Type.LG>
        </Button>
      )
      break
    case 'deposit':
      let depositStatus =
        state.transaction.status === TransactionStatus.PENDING &&
        state.transaction.type === TransactionType.DEPOSIT
      content = (
        <Button
          margin="50px 0 0"
          background={depositStatus ? '#B4B3FD' : '#5F5CFE'}
          border={depositStatus ? '1px solid #5F5CFE' : 'transparent'}
          onClick={handleDeposit}
          cursor={depositStatus ? 'default' : 'pointer'}
        >
          <Type.LG
            color={depositStatus ? '#313144' : '#ffffff'}
            fontFamily="FH Oscar"
            fontSizeXS="16px"
            cursor="pointer"
          >
            {depositStatus ? 'Depositing ...' : 'Deposit Asset'}
          </Type.LG>
        </Button>
      )
      break
    case 'select':
      content = (
        <Button margin="50px 0 0" cursor="default">
          <Type.LG
            color="#909090"
            fontFamily="FH Oscar"
            fontSizeXS="16px"
            fontSizeXXS="14px"
          >
            Select Asset and Chains
          </Type.LG>
        </Button>
      )
      break

    default:
      break
  }

  return (
    <>
      {state.account ? (
        wrongNetwork || validChainId ? (
          <Button
            margin="50px 0 0"
            background="rgba(255, 164, 81, 0.2)"
            border="1px solid rgba(255, 164, 81, 1)"
            cursor="default"
            onClick={() => (wrongNetwork ? undefined : addRPC(validChainId))}
          >
            <Type.LG
              color="rgba(49, 49, 68, 1)"
              fontFamily="FH Oscar"
              fontSizeXS="16px"
            >
              {wrongNetwork
                ? 'Wrong Network'
                : ` Switch to ${NameChainMap[validChainId]}`}
            </Type.LG>
          </Button>
        ) : (
          content
        )
      ) : (
        <Button
          margin="50px 0 0"
          background="#5F5CFE"
          onClick={handleConnectWallet}
        >
          <Type.LG color="#ffffff" fontFamily="FH Oscar" fontSizeXS="16px">
            Connect Wallet
          </Type.LG>
        </Button>
      )}
    </>
  )
}

export default ActionButton
