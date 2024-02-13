import React from 'react'
import { Flex } from 'rebass'

import { Image, Selector } from '../common/FormControlls'
import { Wrapper } from '../container/Container'
import { Type } from '../text/Text'
import { Arrow } from './deposit.style'


const SelectBox = (props) => {
  const { label, placeholder, marginBottom, border, handleOpenModal, selectedValue, selectType } = props

  return (
    <Wrapper marginBottom={marginBottom}>
      <Flex width="100%">
        <Type.SM color="#FFF" fontSize="20px" padding="0" style={{ marginBottom: "-2px" }}>
          {label}
        </Type.SM>
      </Flex>
      <Selector padding="0 18px 0 15px" onClick={handleOpenModal} border={border} cursor="pointer">
        {selectedValue ? (
          <Flex alignItems="center">
            <Image
              src={`/media/${selectType}/${selectedValue.symbol?.toLowerCase()}.svg`}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              boxSizing="unset"
              width="20px"
              height="20px"
              marginLeft="0"
            />
            <Type.MD cursor="pointer">
              {selectedValue.name}
            </Type.MD>
          </Flex>
        ) : (
          <Type.SM color="#919191" fontSizeXXS="14px">
            {placeholder ? placeholder : label}
          </Type.SM>
        )}

        <Arrow src="/media/common/arrow-right.svg" alt="arrow-down" cursor="pointer" />
      </Selector>
    </Wrapper >
  )
}

export default SelectBox
