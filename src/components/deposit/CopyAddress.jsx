import dynamic from 'next/dynamic'
import React from 'react'
const CopyToClipboard = dynamic(() => import('react-copy-to-clipboard'))
import { WrapTokenAddress, WrapperInfo, CopyBtn } from './deposit.style'
import { Type } from '../text/Text'

const CopyAddress = (props) => {
  const { marginBottom, tokenSymbol, chainSymbol, address } = props
  const [copy, setCopy] = React.useState(false)

  React.useEffect(() => {
    setCopy(false)

    return () => {
      setCopy(false)
    }
  }, [tokenSymbol])

  return (
    <WrapperInfo width="100%" justifyContent="space-between" alignItems="center" marginBottom={marginBottom}>
      <WrapTokenAddress>
        <Type.SM fontSize="9px" color="#313144" fontSizeXXS="7px" padding="0 5px">
          {`${tokenSymbol} ${chainSymbol}:`}
        </Type.SM>
        <Type.SM fontSize="9px" color="#313144" fontSizeXXS="7px">
          {address}
        </Type.SM>
      </WrapTokenAddress>
      <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
        <CopyBtn>{copy ? 'copied' : 'copy'}</CopyBtn>
      </CopyToClipboard>
    </WrapperInfo>
  )
}

export default CopyAddress
