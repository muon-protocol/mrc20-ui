import { ERC20_ABI } from '../constants/ABI'
import multicall from './multicall'
import { getBalanceNumber } from '../helper/formatBalance'
import { useCrossWeb3 } from '../hooks/useWeb3'
import { useWeb3React } from '@web3-react/core'

const getAssetBalances = async (chains, tokens, account) => {
  return tokens
}

const useAssetBalances = async (chains, tokens, account) => {
  const { account } = useWeb3React()
  const [balances, setBalances] = React.useState(null)

  let crossWeb3 = {}
  for (let index = 0; index < chains.length; index++) {
    const chainId = chains[index].id
    const web3 = useCrossWeb3(chainId)
    crossWeb3 = { ...crossWeb3, [chainId]: web3 }
  }

  React.useEffect(() => {
    const fetchBalances = async () => {
      for (let index = 0; index < chains.length; index++) {
        const chain = chains[index]
        const calls = tokens
          .filter((item) => item.address[chain.id])
          .map((token) => {
            return {
              address: token.address[chain.id],
              name: 'balanceOf',
              params: [account]
            }
          })

        const result = await multicall(
          crossWeb3[chain.id],
          ERC20_ABI,
          calls,
          chain.id
        )
        if (result && result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            const balance = result[i]
            const address = calls[i].address

            let token = tokens.find(
              (token) => token.address[chain.id] === address
            )
            token.balances[chain.id] = getBalanceNumber(
              balance,
              tokens[address]?.decimals
            )
          }
        }
      }
      setBalances(tokens)
    }
    if (account) fetchBalances()
  }, [account])
}

export default getAssetBalances
