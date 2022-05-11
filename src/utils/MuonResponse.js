import Muon from 'muon'

const getErrorMessage = (error) => {
  switch (true) {
    case error.includes('Invalid JSON RPC response'):
      return 'Invalid JSON RPC Response'
    // : muonResponse.error['Returned error']
    // ? muonResponse.error['Returned error'].error.details
    default:
      return error
  }
}

const MuonResponse = async (app, method, params) => {
  try {
    const muon = new Muon(process.env.NEXT_PUBLIC_MUON_NODE_GATEWAY)

    const muonResponse = await muon
      .app(app)
      .method(method, {
        ...params,
      })
      .call()
    if (!muonResponse.confirmed) {
      const errorMessage = muonResponse.error?.message
        ? muonResponse.error.message
        : muonResponse.error
        ? `Muonization error: ${getErrorMessage(muonResponse.error)}`
        : 'Muon response failed.'
      return { ...muonResponse, errorMessage }
    }
    return muonResponse
  } catch (error) {
    return { confirmed: false, errorMessage: error }
  }
}

export default MuonResponse
