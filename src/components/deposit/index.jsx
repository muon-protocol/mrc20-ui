import React, { useEffect, useState, useCallback } from 'react'
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
import { useError } from '../../state/application/hooks'
import { findAndAddToken } from '../../utils/Token'
import useSearchToken from '../../hooks/useSearchToken'
import { useWeb3React } from '@web3-react/core'

const Deposit = () => {
  const bridge = useBridge()
  const changeTokenOnOriginBridge = useChangeTokenOnOriginChain()
  const changeTokenOnDestBridge = useChangeTokenOnDestChain()
  const addAmount = useAddAmount()
  const { removeErrorInfo } = useError()

  const tokens = useSearchToken()
  const { account } = useWeb3React()
  const [fetchExist, setFetchExist] = useState(false)
  const [tokenBalance, setTokenBalance] = useState(bridge.token?.balance)
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

  useEffect(() => {
    const checkTokenExist = async () => {
      if (bridge.fromChain && bridge.token) {
        let tokenId = await getTokenId(bridge.fromChain.id, bridge.token.address)
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

  useEffect(() => {
    let token = tokensList.find((item) => item.address === bridge.token?.address)
    if (token) setTokenBalance(token.balance)
  }, [tokensList, bridge.token])

  const handleSearch = async (address) => {
    if (!address) updateTokenList('all')
    const filteredToken = await findAndAddToken(address, account, bridge.fromChain.id)
    if (filteredToken) updateTokenList([filteredToken])
  }

  const updateAmount = (value) => {
    removeErrorInfo()
    addAmount(value)
  }

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <Title>Muon MRC20 </Title>
      <GradientTitle margin="0 0 10px">Cross-Chain Transfer</GradientTitle>
      <Container>
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
          <Chain type={ChainStatus.ORIGIN_CHAIN} value={bridge?.fromChain} />
          {bridge.fromChain && <NetworkHint validChain={bridge.fromChain.id} />}
          <Token
            value={bridge?.token}
            tokensList={tokensList}
            updateTokenList={updateTokenList}
            handleSearch={handleSearch}
          />
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
            onChange={(value) => updateAmount(value)}
            value={bridge.amount}
            tokenBalance={tokenBalance}
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
