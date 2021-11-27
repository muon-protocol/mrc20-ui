import styled from 'styled-components'

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FlexColumnCenter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`

export const Box = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  background: ${({ background }) =>
    background ? background : 'rgba(255, 255, 255, 0.35)'};
  border: ${({ borderSize }) => (borderSize ? borderSize : '0.5px')} solid
    ${({ borderColor }) =>
      borderColor ? borderColor : 'rgba(210, 210, 210, 0.5)'};

  box-sizing: border-box;
  box-shadow: 0px 4px 4px
    ${({ shadowColor }) =>
      shadowColor ? shadowColor : 'rgba(239, 239, 239, 0.25)'};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '20px'};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : '20px')};
`
