import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import MainBG from '/public/media/app/green_portal.png'

const Menu = dynamic(() => import('./Menu'))

const Container = styled.div`
  width: 100%;
  background: url(${MainBG.src});
  background-position: center;
  background-size: 1200px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
`

const Navbar = styled.nav`
  width: 100%;
  height: 42px;
  background: #FC0;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 576px) {
    height: 45px;
    padding: 0 10px;
  }
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
