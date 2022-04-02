import React from 'react'

import ReactModal from 'react-modal'
import { Flex } from 'rebass'
import { Type } from '../text/Text'
import { BorderBottom, ImageWithCursor, Input } from '../common/FormControlls'
import { MainWrap, Wrapper } from './Modal.style'

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}

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
    padding,
    handleSearch,
  } = props

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(49, 49, 68, 0.9)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: maxWidth ? maxWidth : '450px',
      background: backgroundColor ? backgroundColor : 'transparent',
      width: '95%',
      border: border ? border : '0',
      overFlowY: 'hidden',
      boxSizing: 'border-box',
      // boxShadow: `0px 4px 4px ${
      //   boxShadowColor ? boxShadowColor : 'rgba(239, 239, 239, 0.25)'
      // }`
    },
  }

  return (
    <ReactModal isOpen={open} style={customStyles} onRequestClose={hide} shouldCloseOnOverlayClick={true}>
      <Flex justifyContent="space-between" alignItems="center" padding={padding ? padding : '15px 15px 15px'}>
        <Type.MD color="#D3DBE3" fontWeight="bold">
          {title}
        </Type.MD>
        <ImageWithCursor width="12.5px" height="12.5px" paddingRight="0" src="/media/common/x.svg" onClick={hide} />
      </Flex>

      <MainWrap>
        {search && (
          <>
            <Flex justifyContent="center" alignItems="center" padding="32px">
              <Input
                placeholder={placeholderSearch}
                onChange={(e) => handleSearch(e.target.value)}
                border="1px solid rgba(172, 175, 243, 0.29)"
                color="#ffffff"
              />
            </Flex>
            <BorderBottom />
          </>
        )}
        <Wrapper>{children}</Wrapper>
      </MainWrap>
    </ReactModal>
  )
}

export default Modal
