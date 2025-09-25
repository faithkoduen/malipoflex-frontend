// const baseUrl = '/api/loans'

// export async function FetchPendingLoans() {
//   try {
//     const response = await fetch(baseUrl)
//     if (!response.ok) {
//       throw new Error('Failed to fetch pending loans: ' + response.statusText)
//     }
//     const result = await response.json()
//     return result
//   } catch (error) {
//     throw new Error('Failed to fetch pending loans: ' + (error as Error).message)
//   }
// }

const baseUrl = "http://127.0.0.1:8000/api"

export async function FetchAllLoans() {
  try {
    const response = await fetch(`${baseUrl}/loanAccounts/`)
    if (!response.ok) {
      throw new Error('Failed to fetch all loans: ' + response.statusText)
    }
    const result = await response.json()
    return result
  } catch (error) {
    throw new Error('Failed to fetch all loans: ' + (error as Error).message)
  }
}

export async function FetchLoanById(loanId: number) {
  try {
    const response = await fetch(`${baseUrl}/loanAccounts/${loanId}/`)
    if (!response.ok) {
      throw new Error('Failed to fetch loan: ' + response.statusText)
    }
    const result = await response.json()
    return result
  } catch (error) {
    throw new Error('Failed to fetch loan: ' + (error as Error).message)
  }
}