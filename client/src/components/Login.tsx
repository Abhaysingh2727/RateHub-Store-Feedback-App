import { useState } from 'react';
import { api, setToken } from '../api';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState<string|null>(null);
  const submit=async(e:any)=>{ e.preventDefault(); try{ const res=await api('/auth/login',{method:'POST',body:JSON.stringify({email,password})}); setToken(res.token); setMsg('Logged in!'); setTimeout(()=>window.location.href='/',500);}catch(e:any){setMsg(e.message);} };
  return (<form onSubmit={submit} style={{maxWidth:420,display:'grid',gap:8}}><h2>Login</h2>
    <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
    <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
    <button>Login</button>{msg&&<p>{msg}</p>}</form>);
}