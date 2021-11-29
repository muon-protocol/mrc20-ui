import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'

import AmountBox from '../common/AmountBox'
import { Box } from '../common/Container'
import { Type } from '../common/Text'
import SelectBox from './SelectBox'
import { chains } from '../../constants/chains'
import { useMuonState } from '../../context'
import { Title } from '.'

const CopyTokenAddress = dynamic(() => import('./CopyTokenAddress'))
const Info = dynamic(() => import('./Info'))
const ActionButton = dynamic(() => import('./ActionButton'))

const Image = styled.img`
  // margin: 50px 0 20px;
`
const Wrapper = styled.div`
  // max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Deposit = (props) => {
  const {
    wrongNetwork,
    destChains,
    // tokenBalance,
    updateBridge,
    handleConnectWallet,
    handleDeposit,
    handleApprove,
    errorAmount
  } = props
  const { state } = useMuonState()

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Title>Muon MRC20 </Title>
      <Title margin="0 0 33px">Cross-Chain Transfer</Title>
      <Box>
        <Type.SM
          color="rgba(49, 49, 68, 0.5)"
          fontSize="12.5px"
          padding="10px 0"
          fontFamily="Reckless"
        >
          Powerd by Muon Network
        </Type.SM>
        <Wrapper>
          <SelectBox
            label="Select Origin Chain"
            data={chains}
            type="chain"
            value={state.bridge.fromChain.id}
            onChange={(data) => updateBridge('fromChain', data)}
          />
          <SelectBox
            label="Select an Asset"
            data={state.showTokens}
            type="token"
            marginBottom="10px"
            value={state.bridge.token.id}
            border={
              state.bridge.fromChain && state.bridge.token
                ? !state.fromChainTokenExit
                  ? '0.75px solid rgba(220, 81, 81, 1)'
                  : '0.75px solid rgba(0, 227, 118, 1)'
                : ''
            }
            onChange={(data) => {
              updateBridge('token', data)
            }}
          />
          {state.bridge.token && state.bridge.fromChain && (
            <Info
              generateBridge={state.fromChainTokenExit}
              chain={state.bridge.fromChain}
            />
          )}

          <AmountBox
            value={state.bridge.amount}
            tokenBalance={state.tokenBalance}
            errorAmount={errorAmount}
            onChange={(data) => updateBridge('amount', data)}
          />
          {state.bridge.token && state.bridge.fromChain && <CopyTokenAddress />}
          <Flex justifyContent="center" margin="38px 0 25px">
            <Image src="/media/common/ex.svg" alt="change" />
          </Flex>
          <SelectBox
            marginBottom="10px"
            label="Select Destination Chain"
            placeholder="Destination Chain"
            data={destChains}
            type="chain"
            value={state.bridge.toChain.id}
            onChange={(data) => updateBridge('toChain', data)}
            border={
              state.bridge.toChain && state.bridge.token
                ? !state.toChainTokenExit
                  ? '0.75px solid rgba(220, 81, 81, 1)'
                  : '0.75px solid rgba(0, 227, 118, 1)'
                : ''
            }
          />
          {state.bridge.token && state.bridge.toChain && (
            <>
              <Info
                generateBridge={state.toChainTokenExit}
                chain={state.bridge.toChain}
              />
              {state.toChainTokenExit && <CopyTokenAddress toChain={true} />}
            </>
          )}

          <ActionButton
            wrongNetwork={wrongNetwork}
            handleConnectWallet={handleConnectWallet}
            handleDeposit={handleDeposit}
            handleApprove={handleApprove}
          />
          <Flex justifyContent="center" margin="50px 0 20px">
            <Image src="/media/common/logo.svg" alt="Muon Logo" />
          </Flex>
        </Wrapper>
      </Box>
    </Flex>
  )
}

export default Deposit
