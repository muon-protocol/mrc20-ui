import React from 'react'
import {
  TransactionStatus,
  TransactionType
} from '../../constants/transactionStatus'
import { useMuonState } from '../../context'
import { Button } from '../common/FormControlls'
import { Type } from '../common/Text'

const ActionButton = (props) => {
  const { state } = useMuonState()
  const {
    wrongNetwork,
    handleAddBridgeToken,
    handleAddMainToken,
    handleConnectWallet,
    handleDeposit,
    handleApprove
  } = props
  let content = ''

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
        wrongNetwork ? (
          <Button
            margin="50px 0 0"
            background="rgba(255, 164, 81, 0.2)"
            border="1px solid rgba(255, 164, 81, 1)"
            cursor="default"
          >
            <Type.LG
              color="rgba(49, 49, 68, 1)"
              fontFamily="FH Oscar"
              fontSizeXS="16px"
            >
              Wrong Network
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
