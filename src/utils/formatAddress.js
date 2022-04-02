export const formatAddress = (address) => {
  return address
    ? address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length)
    : 'Connect Wallet'
}
