import { useEffect, useState } from 'react';
import { api } from '../api';
type User = { id:number; name:string; email:string; address:string; role:'ADMIN'|'USER'|'OWNER'; store?: any };
export default function AdminDashboard(){
  const [stats,setStats]=useState<{users:number;stores:number;ratings:number}|null>(null);
  const [list,setList]=useState<User[]>([]); const [q,setQ]=useState(''); const [role,setRole]=useState<string>(''); const [msg,setMsg]=useState<string|null>(null);
  const load=async()=>{ try{ const s=await api('/users/stats'); setStats(s); const users=await api(`/users?q=${encodeURIComponent(q)}${role?`&role=${role}`:''}`); setList(users);}catch(e:any){setMsg(e.message);} };
  useEffect(()=>{ load(); },[]);
  return (<div><h2>Admin Dashboard</h2>{stats&&<p>Total users: {stats.users} | stores: {stats.stores} | ratings: {stats.ratings}</p>}
    <div style={{margin:'8px 0'}}><input placeholder="Filter q" value={q} onChange={e=>setQ(e.target.value)}/>
    <select value={role} onChange={e=>setRole(e.target.value)}><option value="">All</option><option value="ADMIN">ADMIN</option><option value="USER">USER</option><option value="OWNER">OWNER</option></select>
    <button onClick={load}>Apply</button></div>{msg&&<p>{msg}</p>}
    <table border={1} cellPadding={6}><thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th><th>Owner?</th></tr></thead>
    <tbody>{list.map(u=>(<tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td><td>{u.store?'Yes':'-'}</td></tr>))}</tbody></table></div>);
}