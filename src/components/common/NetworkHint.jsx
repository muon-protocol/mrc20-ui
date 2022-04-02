import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core'
import { NameChainMap } from '../../constants/chainsMap'
import { Type } from '../text/Text'

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${({ color }) => color ?? '#00AA58'};
`

const NetworkHint = ({ validChain }) => {
  const { chainId } = useWeb3React()

  return (
    <Flex margin="0px 0px 22px 5px" alignItems="center" width="100%">
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
