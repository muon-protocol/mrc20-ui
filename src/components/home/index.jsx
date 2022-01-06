import { Flex, Box } from 'rebass'
import styled from 'styled-components'

export const ChangeNetwork = styled.div`
  padding: ${({ padding }) => padding};
  width: 100%;
  font-size: 9px;
  color: #919191;
`
export const Span = styled.div`
  color: #5551ff;
`
export const CopyBtn = styled.div`
  height: 15px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #d0d0d3;
  border-radius: 4px;
  width: 45px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  font-style: normal;
  font-weight: 500;
  font-size: 7.5px;
  cursor: pointer;
  text-transform: uppercase;
  color: #373749;
  &:hover {
    filter: brightness(0.9);
  }
`
export const WrapTokenAddress = styled.div`
  width: ${({ width }) => width};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 576px) {
    flex-direction: column;
    & > * {
      margin-bottom: 5px;
    }
  }
`
export const Wrapper = styled.div`
  display: flex;
  padding: 40px;
  justify-content: space-between;
  & > * {
    padding: 10px;
  }
  @media screen and (max-width: 1200px) {
    // display: none !important;
    flex-direction: column;
    padding: 20px 5px;
  }
`
export const BoxWrapper = styled(Box)`
  max-width: ${({ maxWidth }) => maxWidth};
  @media screen and (max-width: 1200px) {
    max-width: 100% !important;
  }
`
export const DepositWrapper = styled(Box)`
  max-width: ${({ maxWidth }) => maxWidth};
  @media screen and (max-width: 1200px) {
    max-width: 100% !important;
    display: ${({ active }) => (active === 'bridge' ? 'block' : 'none')};
  }
`
export const ClaimWrapper = styled(Box)`
  max-width: ${({ maxWidth }) => maxWidth};
  @media screen and (max-width: 1200px) {
    max-width: 100% !important;
    display: ${({ active }) => (active === 'claim' ? 'block' : 'none')};
  }
`
export const WrapperInfo = styled(Flex)`
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : '22px !important'};
  @media screen and (max-width: 576px) {
    flex-direction: column;
    & > * {
      margin-bottom: 5px;
    }
  }
`
export const TabContainer = styled(Flex)`
  width: 100%;
  height: 55px;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  @media screen and (min-width: 1200px) {
    display: none !important;
  }
`
export const Tab = styled(Flex)`
  width: 100%;
  height: 55px;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;

  color: ${({ active }) => (active ? '#5551ff' : 'rgba(49, 49, 68, 0.5)')};
  border-bottom: ${({ active }) =>
    active ? '1px solid #5551ff' : 'transparent'};
  text-transform: uppercase;
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  color: #313144;
  margin: ${({ margin }) => margin};
  @media screen and (max-width: 1200px) {
    display: none !important;
  }
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
export const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: -8px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #5551ff;
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const TriangleDown = styled.div`
  width: 0;
  height: 0;
  border-left: 116px solid transparent;
  border-right: 116px solid transparent;
  border-top: 24px solid #d3dbe3;
`
export const BoxDestination = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  height: 190px;
  background: linear-gradient(0deg, #d3dbe3 0%, rgba(231, 235, 243, 0) 105.18%);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px
    ${({ shadowColor }) =>
      shadowColor ? shadowColor : 'rgba(239, 239, 239, 0.25)'};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : '20px')};
  border-top: none;
  position: absolute;
  bottom: 0;
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
