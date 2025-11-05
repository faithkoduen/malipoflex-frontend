const baseUrl = '/api/savingsContributions';

export async function FetchAllSavingsContributions() {
  const response = await fetch(baseUrl, { method: 'GET', cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
  return response.json();
}

export async function CreateSavingsContribution(contribution: any) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contribution),
  });
  if (!response.ok) throw new Error(`Failed to create: ${response.statusText}`);
  return response.json();
}