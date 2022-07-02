import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 40px 20px;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    padding: 20px 5px;
    align-items: center;
  }

  @media screen and (max-width: 780px) {
    flex-direction: column;
    padding: 0 20px;
    padding-top: 50px;
    align-items: center;
  }
`

export const Wrapper = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom};
`

export const Box = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  background: ${({ background }) => (background ? background : 'rgba(255, 255, 255, 0.35)')};
  box-sizing: border-box;
  box-shadow: 0px 4px 4px ${({ shadowColor }) => (shadowColor ? shadowColor : 'rgba(239, 239, 239, 0.25)')};
  border: ${({ border }) => (border ? border : 'transparent')};

  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '10px')};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : '20px')};
`
