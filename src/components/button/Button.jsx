import styled from 'styled-components'
import { Type } from '../text/Text'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '390px')};
  width: 100%;
  min-height: ${({ height }) => (height ? height : '45px')};
  background: ${({ background }) => (background ? background : '#D7D7D7')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: ${({ border }) => (border ? border : 'transparent')};
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
  &:focus {
    outline: none;
  }
`
export const ActionButton = styled(Button)`
  margin: 50px 0 0;
  background: ${({ active }) => (active ? '#5F5CFE' : '#B4B3FD')};
  border: ${({ active }) => (active ? 'transparent' : '1px solid #5F5CFE')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
`
export const WarningButton = styled(ActionButton)`
  margin: 50px 0 0;
  background: rgba(255, 164, 81, 0.2);
  border: 1px solid rgba(255, 164, 81, 1);
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
`

export const ActionText = styled(Type.LG).attrs({
  fontSizeXS: '16px',
})`
  color: ${({ active }) => (active ? '#ffffff' : '#313144')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
`
