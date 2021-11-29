import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'

import { Selector, Image } from '../common/FormControlls'
import { Type } from '../common/Text'
const Modal = dynamic(() => import('../common/Modal'))
// import Modal from '../common/Modal'
import { useMuonState } from '../../context'

const Wrapper = styled.div`
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : '20px'};
`
const Item = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ContentItem = styled(Flex)`
  box-sizing: unset !important;
  cursor: pointer;
`
const WrapToken = styled.div`
  cursor: pointer;
`
const Arrow = styled.img`
  cursor: pointer;
`

const SelectBox = (props) => {
  const {
    label,
    placeholder,
    data,
    type,
    onChange,
    value,
    marginBottom,
    border
  } = props
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState('')
  const { state, dispatch } = useMuonState()

  React.useEffect(() => {
    if (value) {
      const selectedValue = data.find((item) => item.id === value)
      if (selectedValue) {
        const selectedValueIcon = selectedValue.symbol.toLowerCase()
        setSelectedValue({ ...selectedValue, selectedValueIcon })
      }
    } else {
      setSelectedValue('')
    }
  }, [value])
  const contentModal =
    data &&
    data.map((item, index) => {
      if (type === 'chain') {
        return (
          <Item key={index}>
            <ContentItem
              alignItems="center"
              onClick={() => {
                onChange(item)
                setOpen(!open)
              }}
            >
              <Image
                src={`/media/chains/${item.symbol.toLowerCase()}.svg`}
                boxSizing="unset"
              />
              <Type.LG
                fontFamily="FH Oscar"
                color="#313144"
                cursor="pointer"
                fontSizeXS="16px"
              >
                {item.name}
              </Type.LG>
            </ContentItem>
          </Item>
        )
      } else {
        if (item && item.address[state.bridge.fromChain.id]) {
          const icon = item.symbol.toLowerCase()
          return (
            <Item key={index}>
              <ContentItem
                alignItems="center"
                onClick={() => {
                  onChange(item)
                  setOpen(!open)
                  dispatch({
                    type: 'UPDATE_TOKEN_SEARCH_QUERY',
                    payload: ''
                  })
                }}
              >
                <Image
                  src={`/media/tokens/${icon}.svg`}
                  onError={(e) => (e.target.src = '/media/tokens/default.svg')}
                  boxSizing="unset"
                />
                <WrapToken>
                  <Type.LG
                    fontFamily="FH Oscar"
                    color="#313144"
                    fontSizeXS="16px"
                    cursor="pointer"
                  >
                    {item.symbol}
                  </Type.LG>
                  <Type.SM
                    fontSize="12.5px"
                    fontFamily="FH Oscar"
                    color="#909090"
                    cursor="pointer"
                  >
                    {item.name}
                  </Type.SM>
                </WrapToken>
              </ContentItem>
              <Type.LG fontFamily="FH Oscar" color="#313144" fontSizeXS="16px">
                {item.balances[state.bridge.fromChain.id]}
              </Type.LG>
            </Item>
          )
        }
      }
    })

  const handleOpenModal = () => {
    setOpen(true)
  }
  return (
    <Wrapper marginBottom={marginBottom}>
      <Type.SM
        fontFamily="FH Oscar"
        color="#313144"
        fontSize="12.5px"
        padding="5px 10px"
      >
        {label}
      </Type.SM>
      <Selector
        padding="0 18px 0 15px"
        onClick={handleOpenModal}
        border={border}
      >
        {selectedValue ? (
          <Flex alignItems="center">
            <Image
              src={`/media/tokens/${selectedValue.selectedValueIcon}.svg`}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              boxSizing="unset"
            />
            <Type.LG
              fontFamily="FH Oscar"
              color="#313144"
              cursor="pointer"
              fontSizeXS="16px"
            >
              {selectedValue.name}
            </Type.LG>
          </Flex>
        ) : (
          <Type.LG
            fontFamily="FH Oscar"
            color="#919191"
            fontSizeXS="16px"
            fontSizeXXS="14px"
          >
            {placeholder ? placeholder : label}
          </Type.LG>
        )}

        <Arrow
          src="/media/common/arrow-down.svg"
          alt="arrow-down"
          cursor="pointer"
        />
      </Selector>

      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
          dispatch({
            type: 'UPDATE_TOKEN_SEARCH_QUERY',
            payload: ''
          })
        }}
        title={label}
        search={type === 'token'}
        placeholderSearch="Search name or paste address"
      >
        {contentModal}
      </Modal>
    </Wrapper>
  )
}

export default SelectBox
