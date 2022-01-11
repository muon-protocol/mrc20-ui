import React from 'react'
import styled from 'styled-components'
import { Type } from './Text'
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core'
import { useMuonState } from '../../context/index'
import { NameChainMap } from '../../constants/chainsMap'

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${({ color }) => color ?? '#00AA58'};
`

const NetworkHint = () => {
  const { state } = useMuonState()
  const { chainId } = useWeb3React()
  const validChain = state.bridge.fromChain.id

  return (
    <Flex margin="0px 0px 22px 5px" alignItems="center">
      {!chainId ? (
        <>
          <Circle color="#ff6a00" />
          <Type.SM color="#ff6a00">{`Connect your wallet`}</Type.SM>
        </>
      ) : validChain !== chainId ? (
        <>
          <Circle color="#ff6a00" />
          <Type.SM color="#ff6a00">{`Switch to ${NameChainMap[validChain]} Network`}</Type.SM>
        </>
      ) : (
        <>
          <Circle />
          <Type.SM color="#00AA58">{`${NameChainMap[validChain]} Network Connected`}</Type.SM>
        </>
      )}
    </Flex>
  )
}

export default NetworkHint
