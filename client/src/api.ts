const API = '/api';
export function setToken(token:string|null){ if(token) localStorage.setItem('token',token); else localStorage.removeItem('token'); }
export function getToken(){ return localStorage.getItem('token'); }
export async function api(path:string, options:RequestInit = {}){
  const token = getToken();
  const headers:Record<string,string> = { 'Content-Type':'application/json', ...(options.headers as any || {}) };
  if(token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if(!res.ok){ const err = await res.json().catch(()=>({error:'Request failed'})); throw new Error(err.error || JSON.stringify(err)); }
  return res.json();
}