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
  width: 100%;
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : '20px'};
`
const Item = styled.div`
  background: #2b2b3c;
  border: 1px solid rgba(172, 175, 243, 0.29);
  margin: 7.5px auto;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #42425f;
  }
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
          <Item
            key={index}
            onClick={() => {
              onChange(item)
              setOpen(!open)
            }}
          >
            <ContentItem alignItems="center">
              <Image
                src={`/media/chains/${item.symbol.toLowerCase()}.svg`}
                boxSizing="unset"
              />
              <Type.MD color="#D3DBE3" fontWeight="bold">
                {item.name}
              </Type.MD>
            </ContentItem>
          </Item>
        )
      } else {
        if (item && item.address[state.bridge.fromChain.id]) {
          const icon = item.symbol.toLowerCase()
          return (
            <Item
              key={index}
              onClick={() => {
                onChange(item)
                setOpen(!open)
                dispatch({
                  type: 'UPDATE_TOKEN_SEARCH_QUERY',
                  payload: ''
                })
              }}
            >
              <ContentItem alignItems="center">
                <Image
                  src={`/media/tokens/${icon}.svg`}
                  onError={(e) => (e.target.src = '/media/tokens/default.svg')}
                  boxSizing="unset"
                />
                <WrapToken>
                  <Type.MD color="#D3DBE3" cursor="pointer">
                    {item.name}
                  </Type.MD>
                </WrapToken>
              </ContentItem>
              <Type.MD color="#D3DBE3">
                {item.balances[state.bridge.fromChain.id]}
              </Type.MD>
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
      <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
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
            <Type.MD color="#313144" cursor="pointer">
              {selectedValue.name}
            </Type.MD>
          </Flex>
        ) : (
          <Type.MD color="#919191" fontSizeXXS="14px">
            {/* {placeholder ? placeholder : label} */}
          </Type.MD>
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
