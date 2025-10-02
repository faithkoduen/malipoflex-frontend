const baseUrl = '/api/users';

export async function fetchUsers() {
  try {
    const response = await fetch(baseUrl); 
    if (!response.ok) {
      throw new Error('Something went wrong: ' + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error('Failed to fetch users: ' + error.message);
  }
}


