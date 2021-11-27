import React from 'react'

import ReactModal from 'react-modal'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { Type } from './Text'
import { BorderBottom, ImageWithCursor, Input } from '../common/FormControlls'
import { useMuonState } from '../../context'

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}

const Wrapper = styled.div`
  padding: ${({ padding }) => (padding ? padding : '30px')};
  overflow-y: auto;
  height: 50vh;
  // height: calc(50vh - 100px);
  box-sizing: border-box;
`

const Modal = (props) => {
  const {
    open,
    hide,
    title,
    children,
    search,
    placeholderSearch,
    maxWidth,
    backgroundColor,
    border,
    borderRadius,
    padding,
    boxShadowColor
  } = props

  const { dispatch } = useMuonState()

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: maxWidth ? maxWidth : '450px',
      width: '95%',
      background: backgroundColor ? backgroundColor : '#ffffff',
      border: border ? border : '0.5px solid #D2D2D2',
      borderRadius: borderRadius ? borderRadius : '20px',
      overFlowY: 'hidden',
      boxSizing: 'border-box',
      boxShadow: `0px 4px 4px ${
        boxShadowColor ? boxShadowColor : 'rgba(239, 239, 239, 0.25)'
      }`
    }
  }

  const handleSearch = (data) => {
    dispatch({
      type: 'UPDATE_TOKEN_SEARCH_QUERY',
      payload: data
    })
  }

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      onRequestClose={hide}
      shouldCloseOnOverlayClick={true}
    >
      <Flex flexDirection="column">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          padding={padding ? padding : '30px 30px 25px'}
        >
          <Type.LG fontFamily="FH Oscar" color="#313144" fontSizeXS="16px">
            {title}
          </Type.LG>
          <ImageWithCursor
            width="12.5px"
            height="12.5px"
            paddingRight="0"
            src="/media/common/x.svg"
            onClick={hide}
          />
        </Flex>
        {search && (
          <Flex
            justifyContent="center"
            alignItems="center"
            padding="0 25px 30px"
          >
            <Input
              placeholder={placeholderSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Flex>
        )}
        <BorderBottom />
        <Wrapper>{children}</Wrapper>
      </Flex>
    </ReactModal>
  )
}

export default Modal
