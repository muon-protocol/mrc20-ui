import styled from 'styled-components'

export const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  height: ${({ height }) => (height ? height : '45px')};
  background: ${({ background }) => (background ? background : '#E6ECF2')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: ${({ border }) => (border ? border : '1px solid #FFFFFF')};
  color: ${({ color }) => (color ? color : '#919191')};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  cursor: ${({ cursor }) => (cursor ? cursor : 'default')};
  &:focus {
    outline: none;
  }
  &:hover {
    filter: brightness(0.9);
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '390px')};
  width: 100%;
  height: ${({ height }) => (height ? height : '45px')};
  background: ${({ background }) => (background ? background : '#D7D7D7')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: ${({ border }) => (border ? border : 'transparent')};
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
  &:focus {
    outline: none;
  }

  &:hover {
    filter: ${({ cursor }) =>
      cursor !== 'pointer' ? 'brightness(1)' : 'brightness(0.9)'};
  }
`
export const BorderBottom = styled.div`
  border-bottom: ${({ border }) =>
    border ? border : ' 1px solid rgba(172, 175, 243, 0.3)'};
`
export const Input = styled.input`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '400px')};
  width: 100%;
  background: ${({ background }) => (background ? background : 'transparent')};
  height: ${({ height }) => (height ? height : '45px')};
  border: ${({ border }) => (border ? border : '1px solid #5F5CFE')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  box-sizing: border-box;
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'Montserrat')};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '15px')};
  color: ${({ color }) => (color ? color : '#313144')};
  &:focus {
    outline: none;
  }
  padding: 0 17px;
  @media screen and (max-width: 576px) {
    font-size: ${({ fontSizeXS }) => (fontSizeXS ? fontSizeXS : '13px')};
    max-width: 150px;
  }
  @media screen and (max-width: 460px) {
    max-width: 120px;
    /* font-size: 10px; */
  }
  ::placeholder {
    color: #909090;
    opacity: 1; /* Firefox */
    font-size: 13px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #909090;
    font-size: 13px;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #909090;
    font-size: 13px;
  }
`
export const Image = styled.img`
  width: ${({ width }) => (width ? width : '26px')};
  height: ${({ height }) => (height ? height : '26px')};
  padding-right: ${({ paddingRight }) =>
    paddingRight ? paddingRight : '11px'};
  box-sizing: ${({ boxSizing }) => boxSizing};
`

export const ImageWithCursor = styled(Image)`
  cursor: pointer;
`
export const Link = styled.a`
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  cursor: pointer;
  font-weight: 400;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`
export const ImageSpin = styled.img`
  padding: 0 10px;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
