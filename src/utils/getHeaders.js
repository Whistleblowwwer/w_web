export const getHeadersBase = () => {
  const headers = new Headers()
  headers.append('authorization', `Bearer ${localStorage.token}`)
  return headers
}
