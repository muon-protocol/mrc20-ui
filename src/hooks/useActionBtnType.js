import { useState, useEffect } from 'react'
import { ActionBtnType } from '../constants/constants'
import { useBridge } from '../state/bridge/hooks'

const useActionBtnType = (allowance) => {
  const [actionBtnType, setActionBtnType] = useState(ActionBtnType.SELECT)
  const bridge = useBridge()
  useEffect(() => {
    let action = ActionBtnType.SELECT
    if (!bridge.tokenOnOriginBridge && bridge.fromChain && bridge.token) action = ActionBtnType.ADD_MAIN_TOKEN
    if (!bridge.tokenOnDestBridge && bridge.token) action = ActionBtnType.ADD_BRIDGE_TOKEN

    if (allowance === '0' && bridge.fromChain && bridge.token && bridge.toChain) action = ActionBtnType.APPROVE
    if (
      allowance !== '0' &&
      bridge.fromChain &&
      bridge.token &&
      bridge.amount &&
      bridge.toChain &&
      bridge.tokenOnOriginBridge &&
      bridge.tokenOnDestBridge
    )
      action = ActionBtnType.DEPOSIT
    setActionBtnType(action)
  }, [bridge, allowance])

  return actionBtnType
}

export default useActionBtnType
