import dynamic from 'next/dynamic'
import React from 'react'
const CopyToClipboard = dynamic(() => import('react-copy-to-clipboard'))
// import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyBtn, WrapTokenAddress, WrapperInfo } from '.'
import { useMuonState } from '../../context'
import { getToken } from '../../helper/Tokens'
import { Type } from '../common/Text'

const CopyTokenAddress = (props) => {
  const { state } = useMuonState()
  const [copy, setCopy] = React.useState(false)
  const { toChain } = props
  const [token, setToken] = React.useState('')

  React.useEffect(() => {
    const findToken = async () => {
      let address =
        state.bridge.token.address[
          toChain ? state.bridge.toChain.id : state.bridge.fromChain.id
        ]
      // let token = state.tokens.find((item) => {
      //   return (
      //     item.address[
      //       toChain ? state.bridge.toChain.id : state.bridge.fromChain.id
      //     ] === address
      //   )
      // })
      // if (!token) {
      let token = await getToken(
        address,
        state.account,
        toChain ? state.bridge.toChain : state.bridge.fromChain
      )
      // }
      setToken(token)
    }
    findToken()
  }, [state.account, state.bridge.token, toChain])

  React.useEffect(() => {
    setCopy(false)

    return () => {
      setCopy(false)
    }
  }, [state.bridge.token])
  // alert(token)
  return (
    <WrapperInfo
      maxWidth="450px"
      width="100%"
      justifyContent="space-between"
      padding="0 15px"
      alignItems="center"
    >
      {token && (
        <>
          <WrapTokenAddress>
            <Type.SM
              fontSize="12px"
              fontFamily="FH Oscar"
              color="#6F7077"
              fontSizeXXS="8px"
              padding="0 5px"
            >
              {`${token.symbol} ${
                toChain
                  ? state.bridge.toChain.symbol
                  : state.bridge.fromChain.symbol
              }:`}
            </Type.SM>
            <Type.SM
              fontSize="12px"
              fontFamily="FH Oscar"
              color="#6F7077"
              fontSizeXXS="8px"
            >
              {
                state.bridge.token.address[
                  toChain ? state.bridge.toChain.id : state.bridge.fromChain.id
                ]
              }
            </Type.SM>
          </WrapTokenAddress>
          <CopyToClipboard
            text={
              state.bridge.token.address[
                toChain ? state.bridge.toChain.id : state.bridge.fromChain.id
              ]
            }
            onCopy={() => setCopy(true)}
          >
            <CopyBtn>{copy ? 'copied' : 'copy'}</CopyBtn>
          </CopyToClipboard>
        </>
      )}
    </WrapperInfo>
  )
}

export default CopyTokenAddress
