import { Flex } from 'rebass'
import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ padding }) => (padding ? padding : '30px')};
  overflow-y: auto;
`

export const MainWrap = styled.div`
  border-radius: 20px;
  background-color: #313144;
`

export const ModalItem = styled.div`
  background: #2b2b3c;
  border: 1px solid rgba(172, 175, 243, 0.29);
  margin: 7.5px auto;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #42425f;
  }
`

export const ContentItem = styled(Flex)`
  box-sizing: unset !important;
  cursor: pointer;
`
