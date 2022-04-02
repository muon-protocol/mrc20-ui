import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isAddress } from '@ethersproject/address'
import { getWeb3NoAccount } from '../utils/web3'
import { getContract } from '../utils/contractHelpers'
import { fromWei } from '../utils/wei'

const useBalance = (contractAddress, chainId, abi, fetch) => {
  const [balance, setBalance] = useState('0')
  const { account } = useWeb3React()

  useEffect(() => {
    const fetchBalance = async () => {
      const web3 = getWeb3NoAccount(chainId)

      const contract = getContract(abi, contractAddress, web3)
      let walletBalance = null
      if (!isAddress(contractAddress)) {
        walletBalance = await web3.eth.getBalance(account)
      } else {
        walletBalance = await contract.methods.balanceOf(account).call()
      }
      setBalance(fromWei(walletBalance))
    }
    if (account) fetchBalance()
  }, [account, chainId, fetch])
  return balance
}

export default useBalance
