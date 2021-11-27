import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'
const Menu = dynamic(() => import('./Menu'))
// import Menu from './Menu'

const Container = styled.div`
  background: #f8f8ff;
  height: 100%;
`

const Navbar = styled.nav`
  width: 100%;
  height: 55px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.div``

const index = (props) => {
  const { children } = props
  return (
    <Container>
      <Navbar>
        <Menu />
      </Navbar>

      <Content>{children}</Content>
    </Container>
  )
}

export default index
