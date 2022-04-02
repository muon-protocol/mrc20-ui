import styled from 'styled-components'

export const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  color: #313144;
  margin: ${({ margin }) => margin};
  @media screen and (max-width: 576px) {
    font-size: 17px;
  }
`

export const GradientTitle = styled.div`
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  margin: ${({ margin }) => margin};
  background: -webkit-linear-gradient(10deg, #5551ff 0%, #d08f85 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
