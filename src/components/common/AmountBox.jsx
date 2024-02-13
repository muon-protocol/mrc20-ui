import styled from 'styled-components'
import { Type } from '../text/Text'
import { Flex } from 'rebass'
import { useAppState } from '../../state/application/hooks'
import { ErrorType } from '../../constants/constants'
// import { ImageWithCursor } from './FormControlls'

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #08091A;
  border-radius: 5px;
  padding: 5px 10px;
  height: 32px;
  border: ${({ error }) => (error ? '2px solid #DC5151' : '1px solid #00FF00')};
`

const Wrapper = styled.div`
  width: 100%;
  margin: ${({ margin }) => (margin ? margin : '10px 0')};
`
const Input = styled.input.attrs({
  type: 'number',
  autocomplete: 'off',
  autocorrect: 'off',
  spellcheck: 'false',
})`
  max-width: 450px;
  width: 100%;
  outline-style: none;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;
  background: transparent;
  border: transparent;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
  ::placeholder {
    color: #B4B4B4;
    font-size: 12px;
    
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #B4B4B4;
    font-size: 12px;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #B4B4B4;
    font-size: 12px;
  }
`
const Max = styled.div`
  /* background-color: #9c9bf3; */
  /* border: 1px solid #FC0; */
  align-items: center;
  border-radius: 5px;
  text-align: center;
  /* width: 20px; */
  font-size:10px;
  color: #FC0;
  padding: 0 6px;
  cursor: pointer;
  &:hover {
    color: #0F0;
  }
`
const AmountBox = (props) => {
  const { margin, onChange, value, tokenBalance } = props
  const { error, errorType } = useAppState()
  return (
    <Wrapper margin={margin}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Type.MD color="#FFFFFF" fontSize="20px" padding="5px 2px">
          ENTER AMOUNT
        </Type.MD>

        <Flex justifyContent="flex-end" alignItems="center">
          <Type.SM color="#919191" fontSize="12.5px">
            balance:
          </Type.SM>
          <Type.SM color="#919191" fontSize="12.5px" ml="4px" mr="0px">
            {tokenBalance || 0}
          </Type.SM>
          <Max onClick={() => onChange(tokenBalance.split(' ')[0])}>
            ( Max )
          </Max>
        </Flex>
      </Flex>

      <Amount error={error && errorType === ErrorType.AMOUNT_INPUT}>
        <Input value={value} placeholder="0.0" min={`0`} onChange={(e) => onChange(e.target.value)} />
      </Amount>
    </Wrapper>
  )
}

export default AmountBox
