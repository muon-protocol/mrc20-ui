import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { Type } from '../common/Text'

const Image = styled.img`
  margin: 0 5px;
`
const MuonNetwork = (props) => {
  const { logo } = props
  return (
    <>
      <Image src="/media/common/logo.svg" alt="Muon Logo" />
      <Image src={`/media/common/${logo}.svg`} alt="muonNetwork" />
      {/* <Flex flexDirection="column">
        <Type.SM color={color} fontSize={fontSize} padding={padding}>
          Muon
        </Type.SM>
        <Type.SM color={color} fontSize={fontSize} padding={padding}>
          Network
        </Type.SM>
      </Flex> */}
    </>
  )
}

export default MuonNetwork
