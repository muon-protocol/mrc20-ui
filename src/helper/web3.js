import Web3 from 'web3'
import getNodeUrl from './getRpcUrl'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'

export function useActiveWeb3React() {
  const context = useWeb3ReactCore()
  // const contextNetwork = useWeb3ReactCore(NetworkContextName)
  return context.active ? context : getWeb3NoAccount()
}

const RPC_URL = getNodeUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000
})
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
