import { useState } from 'react';
import { api } from '../api';
export default function Signup(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [address,setAddress]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState<string|null>(null);
  const submit=async(e:any)=>{ e.preventDefault(); try{ await api('/auth/signup',{method:'POST',body:JSON.stringify({name,email,address,password})}); setMsg('Account created! Please login.'); }catch(e:any){ setMsg(e.message);} };
  return (<form onSubmit={submit} style={{maxWidth:520,display:'grid',gap:8}}><h2>Sign up</h2>
    <input placeholder="Full Name (20-60 chars)" value={name} onChange={e=>setName(e.target.value)}/>
    <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
    <input placeholder="Address (<=400 chars)" value={address} onChange={e=>setAddress(e.target.value)}/>
    <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
    <button>Create account</button>{msg&&<p>{msg}</p>}</form>);
}