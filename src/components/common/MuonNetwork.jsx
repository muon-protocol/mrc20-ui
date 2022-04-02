import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  margin: 0 5px;
`
const MuonNetwork = (props) => {
  const { logo } = props
  return (
    <>
      <Image src="/media/common/logo.svg" alt="Muon Logo" />
      <Image src={`/media/common/${logo}.svg`} alt="muonNetwork" />
    </>
  )
}

export default MuonNetwork
