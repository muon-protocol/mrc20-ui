import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass/styled-components'

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
  cursor: ${({ cursor }) => (cursor ? cursor : 'default')};
  position: ${({ position }) => position};
  font-weight: ${({ fontWeight }) => fontWeight};
  @media screen and (max-width: 576px) {
    font-size: ${({ fontSizeXS }) => fontSizeXS};
  }
  @media screen and (max-width: 415px) {
    font-size: ${({ fontSizeXXS }) => fontSizeXXS};
  }
`

export const Type = {
  Primary(props) {
    return <TextWrapper color={'primary'} {...props} />
  },
  Secodery(props) {
    return <TextWrapper color={'secodery'} {...props} />
  },
  Warning(props) {
    return <TextWrapper color={'warning'} {...props} />
  },
  Success(props) {
    return <TextWrapper color={'success'} {...props} />
  },
  XXXL(props) {
    return <TextWrapper fontSize={35} {...props} />
  },
  XXL(props) {
    return <TextWrapper fontSize={30} {...props} />
  },
  XL(props) {
    return <TextWrapper fontSize={25} {...props} />
  },
  LG(props) {
    return <TextWrapper fontSize={20} {...props} />
  },
  MD(props) {
    return <TextWrapper fontSize={15} {...props} />
  },
  SM(props) {
    return <TextWrapper fontSize={12} {...props} />
  },
  XS(props) {
    return <TextWrapper fontSize={10} {...props} />
  },
  XXS(props) {
    return <TextWrapper fontSize={8} {...props} />
  }
}
