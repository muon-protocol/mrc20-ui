import styled from 'styled-components'
import { Type } from '../text/Text'
import { RowCenter } from '../Row'

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
  color: ${({ active }) => (active ? '#000' : '#313144')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
`


export const BaseButton = styled(RowCenter)`
  padding: 1rem;
  height: 100%;
  font-weight: 600;
  border-radius: 4px;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    opacity: 50%;
    cursor: auto;
    pointer-events: none;
  }
  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);
  > * {
    user-select: none;
  }
  > a {
    text-decoration: none;
  }
`

export const PrimaryButton = styled(BaseButton)`
  z-index: 0;
  width: 100%;
  font-weight:400;
  height: ${({ height }) => (height ? height : '40px')};
  color: #08091A;
  white-space: nowrap;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid #FF0;
  background: #FC0;

  &:focus,
  &:hover {
    background:#f3c40a;
  }

`

export const MainButton = styled(PrimaryButton)`
  height: 54px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 14px;
`

export const SecondaryButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.nileLight};
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.nileDark};
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg3};
  }
  &:hover {
    background: ${({ theme }) => theme.nileGrad};
  }
  opacity: 1;
  ${({ theme, disabled }) =>
    disabled &&
    `
    opacity:0.7;
    background: ${theme.bg3};

   &:hover{
      background: ${theme.bg3};
     }
  `}
`

export const ConnectButton = styled(PrimaryButton)`
  height: 34px;
  background: ${({ theme }) => theme.gradTreasure};
  border: unset;
  padding: 5px 22px;
  font-size: 14px;
  margin: 3px 0px;
  border-radius: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.bg01};
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg0};
  }
  &:hover {
    background: ${({ theme }) => theme.gradLight};
  }
`


export const TableButton = styled(PrimaryButton)`
  width: ${({ width }) => (width ? width : '132px')};
  height: 40px;
  padding: 0;
  border-radius: 8px;
  white-space: nowrap;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    & > * {
      margin: -4px;
    }
  `}
`

export const WhiteButton = styled(TableButton)`
  background: ${({ theme }) => theme.bg1};
  border: 2px solid ${({ theme }) => theme.text0};
  color: ${({ theme }) => theme.text0};

  &:focus,
  &:hover {
    background: ${({ theme }) => theme.bg3};
  }
`
export const GreenButton = styled(SecondaryButton)`
  width: unset;
  background: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.darkSecondary};
  color: ${({ theme }) => theme.nileLight};

  &:focus,
  &:hover {
    background: ${({ theme }) => theme.nileGrad};
    border: 1px solid ${({ theme }) => theme.strokeNile};
  }

  ${({ theme, disabled }) =>
    disabled &&
    `
    opacity:0.5;
    &:focus,
    &:hover {
      background: ${theme.bg3};
    }
  `}
`

export const MaxButton = styled.div`
  font-size: 12px;
  background: ${({ theme }) => theme.bg01};
  color: ${({ theme }) => theme.nileSecondary};
  font-weight: 500;
  padding: 5px;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
    filter: brightness(1.25);
  }
`

export const OptionButton = styled(BaseButton)`
  height: 44px;
  width: 100px;
  font-family: 'IBM Plex Mono';
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  padding: 0;
  color: ${({ theme }) => theme.text0};
  border: none;
  background: ${({ theme, active }) => (active ? theme.bg3 : theme.bg1)};
  position: relative;
  z-index: 1;
  transition: all 0.1s;
  cursor: ${({ active }) => active && 'pointer'};

  ${({ theme }) => theme.mediaWidth.upToMedium`
      margin-right: 3px;
  `}

  &:hover {
    border: none;
    background: ${({ theme, active }) => (active ? theme.nileBlack : theme.bg1)};
  }
`
