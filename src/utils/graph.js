import axios from 'axios'
import { groupBy, findIndex, orderBy } from 'lodash'
import { validChains, ChainGraphMap } from '../constants/settings'

const getDepositTxs = async (user, chainId) => {
  let bridgeEntities = []
  try {
    const apiUrl = ChainGraphMap[chainId]
    let skip = 0
    let continueQuery = true
    while (continueQuery) {
      const query = `
        {
          bridgeEntities(
            first: 1000,
            skip: ${skip},
            where: {
              user: "${user}"
            }
          ) {
            id
            txId
            tokenId
            fromChain
            toChain
            user
            amount
            tokenAddress
            deposited
            claimed
            time
          }
        }
      `
      skip += 1000
      let { data, status } = await axios.post(apiUrl, {
        query: query,
      })
      if (data !== null && status === 200) {
        let breakLoop = true
        if (data.data?.bridgeEntities?.length) {
          bridgeEntities = [...bridgeEntities, ...data.data.bridgeEntities]
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
  return bridgeEntities
}

export const getPendingTxs = async (account) => {
  let depositTxs = []
  await Promise.all(
    validChains.map(async (chainId) => {
      let chainDepositTxs = await getDepositTxs(account, chainId)
      depositTxs.push(...chainDepositTxs)
    })
  )
  let txGroupedById = groupBy(depositTxs, 'id')


  let pendingTxs = Object.entries(txGroupedById).reduce((acc,  [id,txs]) => {
  
   
    const claimedIndex = findIndex(txs, 'claimed')
    if (claimedIndex !== -1) return acc
  console.log(id)
    acc.push(orderBy(txs, ['time'])[0])
    return acc
  }, [])

  return pendingTxs
}
