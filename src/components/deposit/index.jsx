import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { AddressZero } from '@ethersproject/constants'
import { ChainStatus } from '../../constants/constants'
import { useAddAmount, useBridge } from '../../state/bridge/hooks'
import NetworkHint from '../common/NetworkHint'
import { Box } from '../container/Container'
import { GradientTitle, Title } from '../text/Title'
import Chain from './Chain'
import Token from './Token'
import Info from './Info'
import { getTokenId, checkTokenOnDestBridge } from '../../utils/checkTokenOnBridge'
import { useChangeTokenOnOriginChain, useChangeTokenOnDestChain } from '../../state/bridge/hooks'
import CopyAddress from './CopyAddress'
import { Container, TriangleDown } from './deposit.style'
import AmountBox from '../common/AmountBox'

const Deposit = () => {
  const bridge = useBridge()
  const changeTokenOnOriginBridge = useChangeTokenOnOriginChain()
  const changeTokenOnDestBridge = useChangeTokenOnDestChain()
  const addAmount = useAddAmount()
  const [fetchExist, setFetchExist] = useState(false)

  useEffect(() => {
    const checkTokenExist = async () => {
      if (bridge.fromChain && bridge.token) {
        let tokenId = await getTokenId(bridge.fromChain.id, bridge.token.address)
        console.log({ tokenId })
        changeTokenOnOriginBridge(tokenId)
      }
    }
    checkTokenExist()
  }, [bridge.fromChain, bridge.token])

  useEffect(() => {
    const checkTokenExist = async () => {
      setFetchExist(true)
      if (bridge.toChain) {
        let address = await checkTokenOnDestBridge(bridge.toChain.id, bridge.tokenOnOriginBridge)
        console.log({ address })
        if (address !== AddressZero) {
          changeTokenOnDestBridge(address)
        } else {
          changeTokenOnDestBridge(false)
        }
      }
      setFetchExist(false)
    }
    checkTokenExist()
  }, [bridge.toChain, bridge.tokenOnOriginBridge])
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <Title>Muon MRC20 </Title>
      <GradientTitle margin="0 0 10px">Cross-Chain Transfer</GradientTitle>
      <Container>
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
          <Chain type={ChainStatus.ORIGIN_CHAIN} value={bridge?.fromChain} />
          {bridge.fromChain && <NetworkHint validChain={bridge.fromChain.id} />}
          <Token value={bridge?.token} />
          {bridge.fromChain && bridge.token && (
            <>
              <Info chain={bridge.fromChain.name} name={bridge.token.name} exist={bridge.tokenOnOriginBridge !== '0'} />
              <CopyAddress
                tokenSymbol={bridge.token.symbol}
                chainSymbol={bridge.fromChain.symbol}
                address={bridge.token.address}
              />
            </>
          )}
          <AmountBox
            onChange={(value) => addAmount(value)}
            value={bridge.amount}
            tokenBalance={bridge.token?.balance}
            // errorAmount={errorAmount}
            margin={bridge.token?.id ? '0 0 5px' : '0 0 35px'}
          />
        </Box>
        <Box background="#f2f4fb" padding="0" borderRadius="0" border="none">
          <TriangleDown />
        </Box>
        <Box background="linear-gradient(0deg, #d3dbe3 0%, rgba(231, 235, 243, 0) 105.18%)">
          <Chain type={ChainStatus.DEST_CHAIN} value={bridge?.toChain} marginBottom={fetchExist || !bridge.token} />
          {bridge.toChain && bridge.token && !fetchExist && (
            <>
              <Info
                chain={bridge.toChain.name}
                name={bridge.token.name}
                exist={bridge.tokenOnDestBridge}
                marginBottom={!bridge.tokenOnDestBridge}
              />
              {bridge.tokenOnDestBridge && (
                <CopyAddress
                  tokenSymbol={bridge.token.symbol}
                  chainSymbol={bridge.toChain.symbol}
                  address={bridge.tokenOnDestBridge}
                />
              )}
            </>
          )}
        </Box>
      </Container>
    </Flex>
  )
}

export default Deposit
