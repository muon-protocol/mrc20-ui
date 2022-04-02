import { Interface } from '@ethersproject/abi'
import { AddressZero } from '@ethersproject/constants'
import { getMultiCallContract } from './contractHelpers'
import { toCheckSumAddress } from './toCheckSumAddress'

const multicall = async (web3, abi, calls, chainId) => {
  try {
    const multi = getMultiCallContract(web3, chainId)

    const itf = new Interface(abi)
    const calldata = calls.map((call) => [
      toCheckSumAddress(call.address),
      itf.encodeFunctionData(call.name, call.params),
    ])
    const { returnData } = await multi.methods.aggregate(calldata).call()
    const res = returnData
      .filter((item) => item !== AddressZero)
      .map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
    return res
  } catch (error) {
    console.log('Error happened in Multicall:', error)
  }
}

export default multicall
