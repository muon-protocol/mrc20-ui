import React from 'react'
import { Flex } from 'rebass'
import { Type } from '../text/Text'
import { WrapTokenAddress, WrapperInfo, Circle, CopyBtn } from './deposit.style'

const Info = (props) => {
  const { exist, chain, name, marginBottom } = props

  return (
    <WrapperInfo
      maxWidth="450px"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={`${marginBottom ? '22px' : '3px'}`}
    >
      <WrapTokenAddress width="100%">
        <Flex alignItems="center">
          <Circle background={exist ? '#00e376' : '#DC5151'} />
          <Type.SM fontSize="12px" fontSizeXXS="9px" color={exist ? 'rgba(0, 227, 118, 1)' : '#DC5151'}>
            {`${name} ${!exist ? 'is not yet available on' : 'is available on'} ${chain}`}
          </Type.SM>
        </Flex>
        {/* TODO: show sth for button info */}
        {!exist && <CopyBtn color={!exist && '#000000'}>Info</CopyBtn>}
      </WrapTokenAddress>
    </WrapperInfo>
  )
}

export default Info
