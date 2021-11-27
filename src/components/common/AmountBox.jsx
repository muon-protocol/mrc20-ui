import styled from 'styled-components'
import { FlexBetween } from './Container'
import { Type } from '../common/Text'
// import { ImageWithCursor } from './FormControlls'

const Amount = styled.div`
  // max-width: 450px;
  width: 100%;
  height: 55px;
  background: #e7e8ea;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border: ${({ error }) => (error ? '1px solid #DC5151' : 'transparent')};
`

const Wrapper = styled.div`
  margin: ${({ margin }) => (margin ? margin : '10px 0')};
`
const Input = styled.input.attrs({
  type: 'number',
  autocomplete: 'off',
  autocorrect: 'off',
  spellcheck: 'false'
})`
  max-width: 450px;
  width: 100%;
  outline-style: none;
  font-family: FH Oscar;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #313144;
  background: transparent;
  border: transparent;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
  ::placeholder {
    color: #909090;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #909090;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #909090;
  }
`
const Max = styled.div`
  width: 45px;
  height: 20px;
  background: #ffffff;
  border: 0.25px solid #efefef;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`
const AmountBox = (props) => {
  const { margin, onChange, value, tokenBalance, errorAmount } = props
  return (
    <Wrapper margin={margin}>
      <FlexBetween>
        <Type.SM
          fontFamily="FH Oscar"
          color="#313144"
          fontSize="12.5px"
          padding="5px 10px"
        >
          Amount
        </Type.SM>
        <Type.SM
          fontFamily="FH Oscar"
          color="#919191"
          fontSize="12.5px"
          padding="5px 10px"
        >
          {tokenBalance}
        </Type.SM>
      </FlexBetween>

      <Amount error={errorAmount}>
        <Input
          value={value}
          placeholder="Enter Amount"
          onChange={(e) => onChange(e.target.value)}
        />
        <Max onClick={() => onChange(tokenBalance.split(' ')[0])}>
          <Type.XS
            fontSize="7.5px"
            fontFamily="FH Oscar"
            color="rgba(85, 81, 255, 1)"
          >
            MAX
          </Type.XS>
        </Max>
      </Amount>
    </Wrapper>
  )
}

export default AmountBox
