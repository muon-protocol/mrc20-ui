import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { useMuonState } from '../../context'
import { findChain, fromWei } from '../../utils/utils'

import { Box } from '../common/Container'
import { Image, Button, BorderBottom } from '../common/FormControlls'
import { Type } from '../common/Text'
import { ChangeNetwork, Span } from '../home'
import { addRPC } from '../../helper/addRPC'

const NetWork = styled.div`
  width: 35px;
  height: 15px;
  background: rgba(255, 255, 255, 0.5);
  border: 0.5px solid #d2d2d2;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.005em;
  margin-left: 7px;
  padding: 1px 0 2px;
`

const ClaimToken = (props) => {
  const { state } = useMuonState()
  const { claims, handleClaim } = props
  return (
    <Box borderRadius="10px" padding="14px 20px 19px">
      <Flex width="100%">
        <Type.SM fontSize="12.5px" color="#919191" fontFamily="FH Oscar">
          Claim Token
        </Type.SM>
      </Flex>
      {claims.map((claim, index) => {
        let amount = fromWei(claim.amount)
        const chain = findChain(Number(claim.toChain))
        const icon =
          claim.token.symbol.charAt(0) === 'μ'
            ? claim.token.symbol.split('-')[1].toLowerCase()
            : claim.token.symbol.toLowerCase()

        return (
          <Flex width="100%" padding="0 3px" key={index} flexDirection="column">
            <Flex
              justifyContent="space-between"
              width="100%"
              alignItems="center"
              padding="30px 0 0"
            >
              <Flex alignItems="center">
                <Image
                  src={`/media/tokens/${icon}.svg`}
                  onError={(e) => (e.target.src = '/media/tokens/default.svg')}
                  paddingRight="8px"
                  boxSizing="unset"
                  width="20px"
                  height="20px"
                />
                <Type.LG
                  fontFamily="FH Oscar"
                  color="#313144"
                  fontSizeXS="16px"
                >
                  {claim.token.symbol}
                </Type.LG>
                <NetWork>
                  <Type.XS
                    color="#313144"
                    fontSize="10.5px"
                    fontFamily="FH Oscar"
                  >
                    {chain.symbol}
                  </Type.XS>
                </NetWork>
              </Flex>
              <Type.LG color="#313144" fontFamily="FH Oscar" fontSizeXS="16px">
                {amount}
              </Type.LG>
            </Flex>
            {Number(claim.toChain) === state.chainId ? (
              <Button
                margin="15px 0 30px"
                background="rgba(95, 92, 254, 1)"
                border="0.5px solid #D2D2D2"
                height="35px"
                onClick={() => handleClaim(claim)}
              >
                <Type.SM
                  fontSize="12.5px"
                  color="#ffffff"
                  fontFamily="FH Oscar"
                  cursor="pointer"
                >
                  Claim Token
                </Type.SM>
              </Button>
            ) : (
              <Button
                margin="15px 0 30px"
                background=" rgba(255, 255, 255, 0.5)"
                border="0.5px solid rgba(210, 210, 210, 0.5)"
                height="35px"
                cursor="default"
                onClick={() => addRPC(claim.toChain)}
              >
                <Type.SM
                  fontSize="12.5px"
                  color="#313144"
                  fontFamily="FH Oscar"
                  cursor="pointer"
                >
                  Change Network to Claim
                </Type.SM>
              </Button>
            )}
            {claims.length - 1 !== index && <BorderBottom />}
          </Flex>
        )
      })}

      <ChangeNetwork padding="40px 10px 0">
        <Span> Change to the destination Network </Span>
        to claim your token on respective networks.{' '}
      </ChangeNetwork>
    </Box>
  )
}

export default ClaimToken
