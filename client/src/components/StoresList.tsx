import { useEffect, useState } from 'react';
import { api } from '../api';
type StoreRow = { id:number; name:string; email:string; address:string; overallRating:number; userRating:number|null };
export default function StoresList(){
  const [rows,setRows]=useState<StoreRow[]>([]); const [q,setQ]=useState(''); const [msg,setMsg]=useState<string|null>(null);
  const load=async()=>{ try{ const data=await api(`/stores?q=${encodeURIComponent(q)}`); setRows(data);}catch(e:any){setMsg(e.message);} };
  useEffect(()=>{ load(); },[]);
  const rate=async(id:number,value:number)=>{ try{ await api('/ratings',{method:'POST',body:JSON.stringify({storeId:id,value})}); await load(); }catch(e:any){ setMsg(e.message);} };
  return (<div><h2>Stores</h2><input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)}/><button onClick={load}>Search</button>{msg&&<p>{msg}</p>}
    <table border={1} cellPadding={6}><thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Overall</th><th>Your rating</th><th>Rate</th></tr></thead>
    <tbody>{rows.map(r=>(<tr key={r.id}><td>{r.name}</td><td>{r.email}</td><td>{r.address}</td><td>{r.overallRating}</td><td>{r.userRating ?? '-'}</td>
      <td>{[1,2,3,4,5].map(v=>(<button key={v} onClick={()=>rate(r.id,v)} style={{marginRight:4}}>{v}</button>))}</td></tr>))}</tbody></table></div>);
}