import { Flex, Box } from 'rebass'
import styled from 'styled-components'

export const ChangeNetwork = styled.div`
  padding: ${({ padding }) => padding};
  width: 100%;
  font-family: 'FH Oscar';
  font-size: 12.5px;
  color: #919191;
`
export const Span = styled.span`
  color: #5551ff;
`
export const CopyBtn = styled.div`
  width: 45px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 0.25px solid #efefef;
  border-radius: 25px;
  font-family: FH Oscar;
  font-style: normal;
  font-weight: 500;
  font-size: 7.5px;
  cursor: pointer;
  text-transform: uppercase;
  color: #5551ff;
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
  font-family: FH Oscar;
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
  font-family: Reckless;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 25px;
  text-align: center;
  color: #5f5cfe;
  margin: ${({ margin }) => margin};
  @media screen and (max-width: 1200px) {
    display: none !important;
  }
  @media screen and (max-width: 576px) {
    font-size: 17px;
  }
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
