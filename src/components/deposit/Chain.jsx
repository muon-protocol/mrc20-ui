import React, { useEffect, useState } from 'react'
import SelectBox from './SelectBox'
import { NameChainMap, rpcConfig } from '../../constants/chainsMap'
import { validChains } from '../../constants/settings'
import { ChainStatus, SelectType } from '../../constants/constants'
import { useAddOriginChain, useAddDestChain, useBridge, useRemoveBridge } from '../../state/bridge/hooks'
import Modal from '../modal/Modal'
import { ContentItem, ModalItem } from '../modal/Modal.style'
import { Image } from '../common/FormControlls'
import { Type } from '../text/Text'

const Chain = (props) => {
  const { type, value, marginBottom } = props
  const [chains, setChains] = useState([])
  const bridge = useBridge()
  const addOriginChain = useAddOriginChain()
  const addDestChain = useAddDestChain()
  const removeBridge = useRemoveBridge()
  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }
  useEffect(() => {
    fetchChain()
  }, [type, bridge])

  const fetchChain = () => {
    const chains = validChains.map((item) => ({
      id: item,
      name: NameChainMap[item],
      symbol: rpcConfig[item].symbol,
    }))

    if (type === ChainStatus.DEST_CHAIN && bridge.fromChain) {
      const filter = chains.filter((item) => item.id !== bridge.fromChain.id)
      setChains(filter)
    } else {
      setChains(chains)
    }
  }
  const handleChangeChain = (data) => {
    if (type === ChainStatus.ORIGIN_CHAIN) {
      removeBridge()
      addOriginChain(data)
    } else {
      addDestChain(data)
    }
  }
  return (
    <>
      <SelectBox
        label={`Select ${type === ChainStatus.ORIGIN_CHAIN ? 'Origin' : 'Destination'} Chain`}
        marginBottom={marginBottom ? '35px' : value ? '5px' : '35px'}
        selectedValue={value}
        selectType={SelectType.CHAIN}
        handleOpenModal={handleOpenModal}
      />

      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
        title="Select a chain"
      >
        {chains.map((item, index) => {
          return (
            <ModalItem
              border="1px solid #454d57"
              key={index}
              onClick={() => {
                handleChangeChain(item)
                setOpen(!open)
              }}
            >
              <ContentItem alignItems="center">
                <Image src={`/media/chains/${item?.symbol.toLowerCase()}.svg`} boxSizing="unset" />
                <Type.MD color="#D3DBE3" fontWeight="bold">
                  {item?.name}
                </Type.MD>
              </ContentItem>
            </ModalItem>
          )
        })}
      </Modal>
    </>
  )
}

export default Chain
