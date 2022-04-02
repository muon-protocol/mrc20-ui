import React, { useState } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const CopyToClipboard = dynamic(() => import('react-copy-to-clipboard'))

import { Button } from '../button/Button'
import { Image, ImageSpin, Link } from '../common/FormControlls'
import { Box } from '../container/Container'
import { Type } from '../text/Text'
import { getTransactionLink } from '../../utils/explorers'
import { LinkType, TransactionStatus } from '../../constants/transactionStatus'
import { useRemoveTransaction, useTx } from '../../state/transactions/hooks'

const Close = styled.span`
  fontsize: 12.5px;
  color: #000000;
  cursor: pointer;
`
const Arrow = styled.span`
  padding: 0 3px 5px;
  color: #000000;
`
const Transaction = () => {
  const tx = useTx()
  const closeTx = useRemoveTransaction()
  const [copy, setCopy] = useState(false)

  const handleClose = () => {
    closeTx()
  }

  React.useEffect(() => {
    setCopy(false)
    return () => {
      setCopy(false)
    }
  }, [tx])
  return (
    <Box
      padding="14px 20px"
      borderRadius="10px"
      background=" linear-gradient(0deg, #E7EBF3 0%, rgba(231, 235, 243, 0.25) 105.18%)"
      border="1px solid #ffffff"
      maxWidth="300px"
    >
      <Flex justifyContent="space-between" width="100%">
        <Type.SM color="#313144" textTransform="capitalize">
          {tx.type}
        </Type.SM>
        <Close onClick={handleClose}>&times;</Close>
      </Flex>
      <Flex justifyContent="flex-start" width="100%" marginTop="15px" alignItems="center">
        <Type.SM color="#313144">{tx.fromChain}</Type.SM>
        {tx.toChain && <Arrow>&rarr;</Arrow>}

        <Type.SM color="#313144">{tx.toChain}</Type.SM>
      </Flex>
      <Flex justifyContent="space-between" width="100%" marginTop="15px">
        {tx.tokenSymbol && (
          <Flex alignItems="center">
            <Type.MD color="#313144" fontWeight="bold">
              {tx.tokenSymbol}
            </Type.MD>
          </Flex>
        )}
        {tx.amount ? (
          <Type.MD color="#313144" fontWeight="bold">
            {parseFloat(tx.amount)}
          </Type.MD>
        ) : (
          ''
        )}
      </Flex>
      <Flex justifyContent="center" flexDirection="column" width="100%" margin="30px 0 15px">
        <Button
          height="35px"
          background="rgba(255, 255, 255, 0.5)"
          border={
            tx.status === TransactionStatus.PENDING
              ? '1px solid #d2d2d2'
              : tx.status === TransactionStatus.SUCCESS
              ? '1px solid #00AA58'
              : '1px solid rgba(255, 164, 81, 1)'
          }
        >
          <Flex justifyContent="space-between" width="100%" padding="0 10px 0 0" alignItems="center">
            <Flex maxWidth="300px" width="100%" alignItems="center">
              {tx.status === 'pending' ? (
                <ImageSpin src={`/media/common/${tx.status}.svg`} marginLeft="10px" alt={tx.status} />
              ) : (
                <Image src={`/media/common/${tx.status}.svg`} marginLeft="10px" alt={tx.status} />
              )}

              <Link target="_blink" href={getTransactionLink(tx.chainId, tx.hash, LinkType.Transaction)}>
                <Type.SM color={tx.status === TransactionStatus.SUCCESS ? '#00AA58' : '#313144'} fontSizeXS="10px">
                  {tx.message}
                </Type.SM>
              </Link>
            </Flex>
            <CopyToClipboard text="{state.transaction.hash}" onCopy={() => setCopy(true)}>
              {copy ? <Type.XS color="#5551ff">copied</Type.XS> : <img src="/media/common/copy.svg" />}
            </CopyToClipboard>
          </Flex>
        </Button>
      </Flex>
    </Box>
  )
}

export default Transaction
