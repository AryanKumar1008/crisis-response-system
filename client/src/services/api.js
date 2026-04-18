const API_URL = 'http://localhost:5000';

export async function createAlert(data) {
  const response = await fetch(`${API_URL}/alert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getAlerts() {
  const response = await fetch(`${API_URL}/alerts`);
  return response.json();
}

export async function resolveAlert(id) {
  const response = await fetch(`${API_URL}/alert/${id}/resolve`, {
    method: 'PATCH',
  });
  return response.json();
}

export async function createBloodRequest(data) {
  const response = await fetch(`${API_URL}/blood-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getBloodRequests() {
  const response = await fetch(`${API_URL}/blood-requests`);
  return response.json();
}
