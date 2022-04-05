import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { validChains } from '../constants/settings'
import { useAppState } from '../state/application/hooks'
import { useBridge } from '../state/bridge/hooks'
import { combineDefaultAndLocalStorage, findAndAddToken } from '../utils/Token'
import useBalances from './useBalances'

const useSearchToken = () => {
  const { account } = useWeb3React()
  const { searchQuery } = useAppState()
  const bridge = useBridge()
  const defaultTokens = useBalances(validChains, combineDefaultAndLocalStorage(), bridge.fetch)
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    const searchToken = async () => {
      try {
        // search address
        if (searchQuery && bridge.fromChain) {
          let result = await findAndAddToken(searchQuery, account, bridge.fromChain.id)
          setTokens([result])
        }
        //  filter based on chain
        else if (bridge.fromChain && defaultTokens) {
          const filter = defaultTokens.filter((item) => bridge.fromChain.id === item.chainId)
          setTokens(filter)
        } else {
          setTokens([])
        }
      } catch (error) {
        console.log('Error happend in searchToken', error)
      }
    }
    searchToken()
  }, [searchQuery, bridge.fromChain, defaultTokens])
  return tokens
}

export default useSearchToken
