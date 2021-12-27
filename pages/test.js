import React from 'react'
import axios from 'axios'

const test = () => {
  const [response, setResponse] = React.useState()
  const getTimestamp = () => Math.floor(Date.now() / 1000)
  const time = getTimestamp()
  const msgParams = [
    {
      type: 'uint256', // Any valid solidity type
      name: 'time', // Any string label you want
      value: time // The value to sign
    },
    {
      type: 'address',
      name: 'forAddress',
      value: '0x4CC129Ca88ff495C1E1Fb33688FEf77461dD2b10'
    }
  ]
  let eip712TypedData = {
    types: {
      EIP712Domain: [{ name: 'name', type: 'string' }],
      Message: [
        { type: 'uint256', name: 'time' },
        { type: 'address', name: 'forAddress' }
      ]
    },
    domain: { name: 'MUON Presale' },
    primaryType: 'Message',
    message: {
      time: time,
      forAddress: '0x4CC129Ca88ff495C1E1Fb33688FEf77461dD2b10'
    }
  }
  let dataToSign = JSON.stringify(eip712TypedData)

  signMsg(dataToSign, '0x4CC129Ca88ff495C1E1Fb33688FEf77461dD2b10', time)
  function signMsg(msgParams, from, time) {
    web3.currentProvider.sendAsync(
      {
        from: from,
        id: time,
        jsonrpc: '2.0',
        method: 'eth_signTypedData_v4',
        params: [from, msgParams]
      },
      async function (err, result) {
        if (err) return console.error(err)
        if (result.error) {
          return console.error(result.error.message)
        }
        const BASE_URL = 'http://node1.muon.net/v1/'
        // const BASE_URL = 'http://localhost:8000/v1/'
        console.log({ result: result.result })
        let data = {
          app: 'presale',
          method: 'deposit',
          params: {
            token: 'deus',
            amount: 1,
            forAddress: '0x4CC129Ca88ff495C1E1Fb33688FEf77461dD2b10',
            time,
            sign: result.result,
            chainId: 137
          }
        }
        try {
          const response = await axios.post(BASE_URL, data)
          console.log(response)
          setResponse(JSON.stringify(response.data, undefined, 2))
        } catch (error) {
          console.log(error)
        }
      }
    )
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <pre id="json">{response}</pre>
    </div>
  )
}

export default test
