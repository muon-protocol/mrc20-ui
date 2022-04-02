import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'

const useAllowance = (fromChain, contractAddress, spender, abi, fetch) => {
  const [allowance, setAllowance] = useState('0')
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        if (fromChain !== chainId) return
        const contract = getContract(abi, contractAddress, web3)
        let allowance = await contract.methods.allowance(account, spender).call()
        setAllowance(allowance)
      } catch (error) {
        console.log('error happend in fetch Allowance', error)
      }
    }
    if (contractAddress && spender && chainId && account && web3) fetchAllowance()
  }, [contractAddress, spender, chainId, account, web3, fetch, fromChain])
  return allowance
}

export default useAllowance
