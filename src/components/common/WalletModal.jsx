import React from 'react'
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core'
import { Image } from './FormControlls'
import Modal from './Modal'
import { connectorsByName } from '../../helper/connectors'
import { ModalItem } from '../home'

const WalletModal = (props) => {
  const { open, hide } = props

  const web3React = useWeb3React()
  const { activate } = web3React
  return (
    <Modal open={open} hide={hide} title="Connect Wallet">
      {Object.keys(connectorsByName).map((name) => {
        return (
          <ModalItem
            key={name}
            onClick={() => {
              activate(connectorsByName[name])
              hide()
            }}
          >
            <Flex
              padding="0 20px"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
              color={'#D3DBE3'}
            >
              {name}
              <Image
                width="24px"
                height="24px"
                paddingRight="0"
                src={`/media/common/${name}.svg`}
              />
            </Flex>
          </ModalItem>
        )
      })}
    </Modal>
  )
}

export default WalletModal
