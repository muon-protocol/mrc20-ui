import Muon from 'muon'

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
        ? muonResponse.error
        : 'Muon response failed.'
      return { ...muonResponse, errorMessage }
    }
    return muonResponse
  } catch (error) {
    return { confirmed: false, errorMessage: error }
  }
}

export default MuonResponse
