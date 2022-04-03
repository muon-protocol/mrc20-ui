import React from 'react'
import { useWeb3React } from '@web3-react/core'

import { ERC20_ABI } from '../constants/ABI'
import multicall from '../utils/multicall'
import { getWeb3NoAccount } from '../utils/web3'
import { fromWei } from '../utils/wei'

const useBalances = (chains, tokens, fetch, refresh) => {
  const { account } = useWeb3React()
  const [balances, setBalances] = React.useState(null)
  React.useEffect(() => {
    const fetchBalances = async () => {
      let tokenB = []
      for (let index = 0; index < chains.length; index++) {
        const chainId = chains[index]
        const web3 = getWeb3NoAccount(chainId)
        const calls = tokens
          .filter((item) => item.chainId === chainId)
          .map((token) => {
            return {
              address: token.address,
              name: 'balanceOf',
              params: [account],
            }
          })
        const result = await multicall(web3, ERC20_ABI, calls, chainId)
        if (result && result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            let token = tokens.find((token) => token.address === calls[i].address && token.chainId === chainId)
            let balance = fromWei(result[i].toString(), token.decimals)
            tokenB.push({ ...token, balance })
          }
        }
      }
      setBalances(tokenB)
    }
    if (account) fetchBalances()
  }, [account, fetch, refresh])
  return balances
}

export default useBalances

// import React from 'react'
// import { useWeb3React } from '@web3-react/core'
// import multiCall from '../utils/ethereumMulticall'
// import { fromWei } from '../utils/wei'

// const useBalances = (chains, tokens, fetch, refresh) => {
//   const { account } = useWeb3React()
//   const [balances, setBalances] = React.useState(null)
//   React.useEffect(() => {
//     const fetchBalances = async () => {
//       const abi = [
//         {
//           inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
//           name: 'balanceOf',
//           outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//           stateMutability: 'view',
//           type: 'function',
//         },
//       ]
//       for (let index = 0; index < chains.length; index++) {
//         const chainId = chains[index]
//         let contractCallContext = tokens
//           .filter((token) => token.chainId === chainId)
//           .map((token) => {
//             return {
//               reference: token.name + chainId,
//               contractAddress: token.address,
//               abi,
//               calls: [
//                 {
//                   reference: 'balance',
//                   methodName: 'balanceOf',
//                   methodParameters: [account],
//                 },
//               ],
//             }
//           })
//         const result = await multiCall(chainId, contractCallContext)
//         if (result && result.length > 0) {
//           for (let i = 0; i < result.length; i++) {
//             const balance = result[i].callsReturnContext[0].returnValues[0]
//             const address = result[i].contractAddress

//             let token = tokens.find((token) => token.address === address)
//             token.balance = fromWei(balance, token.decimals)
//           }
//         }
//       }
//       setBalances(tokens)
//     }

//     if (account) fetchBalances()
//   }, [account, fetch, refresh])
//   return balances
// }

// export default useBalances
