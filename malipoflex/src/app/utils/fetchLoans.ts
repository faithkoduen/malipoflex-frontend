const baseUrl = '/api/loans'; 

export async function fetchLoans() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Something went wrong: ' + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error('Failed to fetch loans: ' + error.message);
  }
};




