import { useWeb3React } from '@web3-react/core'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { SEARCHABLE, SelectType } from '../../constants/constants'
import useSearchToken from '../../hooks/useSearchToken'
import { useChangeSearchQuery } from '../../state/application/hooks'
import { useAddToken, useBridge } from '../../state/bridge/hooks'
import { findAndAddToken } from '../../utils/Token'
import SelectBox from './SelectBox'
import Modal from '../modal/Modal'
import { ContentItem, ModalItem } from '../modal/Modal.style'
import { Image } from '../common/FormControlls'
import { Type } from '../text/Text'
import { Flex } from 'rebass'

const Token = (props) => {
  const { value } = props
  const { account } = useWeb3React()

  const addToken = useAddToken()
  const changeSearchQuery = useChangeSearchQuery()
  const tokens = useSearchToken()
  const { fromChain } = useBridge()

  const [tokensList, setTokensList] = useState(tokens)

  useEffect(() => {
    setTokensList(tokens)
  }, [tokens])

  const updateTokenList = useCallback(
    (tokensList) => {
      if (tokensList === 'all') setTokensList(tokens)
      else setTokensList(tokensList)
    },
    [tokensList]
  )

  const changeToken = (data) => {
    addToken(data)
    changeSearchQuery('')
  }

  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }

  const performSearch = debounce((address) => {
    handleSearch(address)
  }, 500)

  const handleSearch = async (address) => {
    if (!address) updateTokenList('all')
    const filteredTokens = await findAndAddToken(address, account, fromChain.id)
    if (filteredTokens) updateTokenList(filteredTokens)
  }
  return (
    <>
      <SelectBox
        label="Select an asset"
        selectType={SelectType.TOKEN}
        selectedValue={value}
        marginBottom={value ? '5px' : '35px'}
        handleOpenModal={handleOpenModal}
      />

      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
          updateTokenList('all')
        }}
        title="Select a token"
        handleSearch={performSearch}
        search={SEARCHABLE}
        placeholderSearch="Search or paste address"
      >
        {tokensList.map((token, index) => {
          return (
            <ModalItem
              key={token.address + index}
              onClick={() => {
                changeToken(token)
                setOpen(!open)
              }}
            >
              <ContentItem alignItems={'center'} justifyContent="space-between" width={'100%'}>
                <Flex alignItems={'center'}>
                  <Image
                    src={token.logo ? token.logo : '/media/tokens/default.svg'}
                    boxSizing="unset"
                    // onError={(e) => (e.target.src = '/media/tokens/default.svg')}
                  />
                  <Type.MD color="#D3DBE3" fontWeight="bold">
                    {token.name}
                  </Type.MD>
                </Flex>
                <Type.MD color="#D3DBE3">{parseFloat(token.balance).toFixed(4)}</Type.MD>
              </ContentItem>
            </ModalItem>
          )
        })}
      </Modal>
    </>
  )
}

export default Token
