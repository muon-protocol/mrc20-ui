import { Multicall } from 'ethereum-multicall'
import { getWeb3NoAccount } from './web3'

async function multiCall(chainId, contractCallContext) {
  try {
    const web3 = getWeb3NoAccount(chainId)
    const multicall = new Multicall({ web3Instance: web3, tryAggregate: true })
    let { results } = await multicall.call(contractCallContext)
    results = contractCallContext.map((item) => ({
      reference: item.reference,
      contractAddress: item.contractAddress,
      callsReturnContext: results[item.reference]['callsReturnContext'].map((callReturn) => ({
        ...callReturn,
        returnValues: callReturn['returnValues'].map((value) => web3.utils.hexToNumberString(value.hex)),
      })),
    }))
    return results
  } catch (error) {
    console.log('error happend in Multicall', error)
  }
}
export default multiCall
