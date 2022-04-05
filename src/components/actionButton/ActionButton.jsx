import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { Button, ActionButton, ActionText } from '../button/Button'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { ActionBtnType } from '../../constants/constants'
import useActionBtnType from '../../hooks/useActionBtnType'
import useActionBtnStatus from '../../hooks/useActionBtnStatus'
import { useBridge } from '../../state/bridge/hooks'
import { validChains } from '../../constants/settings'
import { addRPC } from '../../utils/addRPC'
import { NameChainMap } from '../../constants/chainsMap'

const ActionButtonComponent = (props) => {
  const { handleApprove, handleDeposit, allowance } = props
  const [open, setOpen] = useState(false)
  const { account, chainId } = useWeb3React()
  const bridge = useBridge()
  let actionBtn = useActionBtnType(allowance)
  const status = useActionBtnStatus()

  const wrongNetwork = !validChains.includes(chainId)

  let validChainId = null
  if (bridge.fromChain) {
    // if (actionBtn === ActionBtnType.ADD_BRIDGE_TOKEN && bridge.toChain.id !== chainId) validChainId = bridge.toChain.id
    if (bridge.fromChain.id !== chainId) validChainId = bridge.fromChain.id
  }

  const handleConnectWallet = () => {
    setOpen(true)
  }
  let contentBtn = ''
  if (!account)
    contentBtn = (
      <Button margin="25px 0 0" background="#5F5CFE" onClick={handleConnectWallet}>
        <Type.LG color="#ffffff" fontSizeXS="16px">
          Connect Wallet
        </Type.LG>
      </Button>
    )
  else if (wrongNetwork || validChainId) {
    contentBtn = (
      <Button
        margin="25px 0 0"
        background={'rgba(255, 164, 81, 0.2)'}
        border="1px solid rgba(255, 164, 81, 1)"
        cursor="pointer"
        onClick={() =>
          wrongNetwork ? addRPC(bridge.fromChain ? bridge.fromChain.id : validChains[0]) : addRPC(validChainId)
        }
      >
        <Type.MD color={'rgba(49, 49, 68, 1)'} fontWeight="bold">
          {wrongNetwork
            ? ` Switch to ${NameChainMap[bridge.fromChain ? bridge.fromChain.id : validChains[0]]}`
            : ` Switch to ${NameChainMap[validChainId]}`}
        </Type.MD>
      </Button>
    )
  } else {
    switch (actionBtn) {
      case ActionBtnType.ADD_BRIDGE_TOKEN:
        case ActionBtnType.ADD_MAIN_TOKEN:
          contentBtn = (
            <Button margin="25px 0 0" cursor="default" background="rgba(85, 81, 255, 0.15)">
              <Type.LG color="#8888db" fontSizeXS="16px" fontSizeXXS="14px">
              Token is not yet available on Bridge
              </Type.LG>
            </Button>
          )
          break
      case ActionBtnType.SELECT:
        contentBtn = (
          <Button margin="25px 0 0" cursor="default" background="rgba(85, 81, 255, 0.15)">
            <Type.LG color="#8888db" fontSizeXS="16px" fontSizeXXS="14px">
              Select Asset and Chains
            </Type.LG>
          </Button>
        )
        break
      case ActionBtnType.APPROVE:
        contentBtn = (
          <ActionButton onClick={handleApprove} active={!status.approve}>
            <ActionText active={!status.approve}>{status.approve ? 'Approving ...' : 'Approve'}</ActionText>
          </ActionButton>
        )
        break
      case ActionBtnType.DEPOSIT:
        contentBtn = (
          <ActionButton onClick={handleDeposit} active={!status.deposit}>
            <ActionText active={!status.deposit}>{status.deposit ? 'Depositing ...' : 'Deposit Asset'}</ActionText>
          </ActionButton>
        )
        break

      default:
        break
    }
  }

  return (
    <>
      {contentBtn}
      <WalletModal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
      />
    </>
  )
}

export default ActionButtonComponent
