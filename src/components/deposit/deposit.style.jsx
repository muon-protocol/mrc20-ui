import { Flex } from 'rebass'
import styled from 'styled-components'

export const Container = styled.div`
  max-width: '470px';
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px ${({ shadowColor }) => (shadowColor ? shadowColor : 'rgba(239, 239, 239, 0.25)')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '500px')};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Arrow = styled.img`
  cursor: pointer;
`
export const TriangleDown = styled.div`
  width: 0;
  height: 0;
  border-left: 116px solid transparent;
  border-right: 116px solid transparent;
  border-top: 24px solid #d3dbe3;
  position: relative;
`

export const Circle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ background }) => background};
  margin: 0 3px 0 5px;
`
export const WrapperInfo = styled(Flex)`
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '22px !important')};
`
export const WrapTokenAddress = styled.div`
  width: ${({ width }) => width};
  display: flex;
  justify-content: space-between;
  align-items: center;
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
export const CheckCircleWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 5px;
`

export const ReactSelectStyle = {
  container: (styles) => ({
    ...styles,
    width: '100%',
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: '#E6ECF2',
    border: '1px solid #FFFFFF',
    minHeight: '45px',
    ':hover': {
      filter: 'brightness(0.9)',
      border: 'none',
    },
    ':focus': {
      outline: 'none',
    },
  }),
  dropdownIndicator: (styles) => ({ ...styles, paddingRight: '16px' }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? undefined : isFocused ? '#ffffff' : undefined,
      color: isDisabled ? '#ccc' : isSelected ? 'balck' : '#666666',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? '#b7c0cb' : '#E6ECF2') : undefined,
      },
    }
  },
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#E6ECF2',
  }),
}
