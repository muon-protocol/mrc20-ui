import axios from 'axios'
import { validChains, ChainGraphMap } from '../constants/settings'

const getDepositClaimTxs = async (user, chainId) => {
  let depositEntities = []
  let claimEntities = []
  try {
    const apiUrl = ChainGraphMap[chainId]
    let skip = 0
    let continueQuery = true
    while (continueQuery) {
      const query = `
        {
          depositEntities(
            first: 1000,
            skip: ${skip},
            where: {
              user: "${user}"
            }
          ) {
            txId
            tokenId
            toChain
            amount
          }
          claimEntities(
            first: 1000, 
            skip: ${skip},
            where: {
              user: "${user}"
            }
          ) {
            txId
            fromChain
          }
        }
      `
      skip += 1000
      let response = await axios.post(apiUrl, {
        query: query,
      })
      const data = response.data
      if (data !== null && response.status === 200) {
        let breakLoop = true
        if (data.data?.depositEntities?.length) {
          depositEntities = [...depositEntities, ...data.data.depositEntities]
          breakLoop = false
        }
        if (data.data?.claimEntities?.length) {
          claimEntities = [...claimEntities, ...data.data.claimEntities]
          breakLoop = false
        }
        if (breakLoop) {
          continueQuery = false
        }
      } else {
        break
      }
    }
  } catch (error) {
    console.log('Error happend in fetching data from graph', error)
  }
  return [depositEntities, claimEntities]
}

export const getPendingTxs = async (account) => {
  let pendingTxs = {}
  let depositTxs = {}
  let claimTxs = {}
  await Promise.all(
    validChains.map(async (chainId) => {
      let [chainDepositTxs, chainClaimTxs] = await getDepositClaimTxs(account, chainId)
      depositTxs[chainId.toString()] = chainDepositTxs
      claimTxs[chainId.toString()] = chainClaimTxs
    })
  )
  Object.keys(depositTxs).map((depositChain) => {
    depositTxs[depositChain].map((dEntity) => {
      let found = claimTxs[dEntity.toChain].find((cEntity) => {
        return cEntity.fromChain === depositChain && cEntity.txId === dEntity.txId
      })
      if (!found) {
        pendingTxs[dEntity.toChain] = pendingTxs[dEntity.toChain] || []
        dEntity['fromChain'] = depositChain
        pendingTxs[dEntity.toChain] = [...pendingTxs[dEntity.toChain], dEntity]
      }
    })
  })
  return pendingTxs
}
