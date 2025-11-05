import { useEffect, useState } from 'react';
import { api } from '../api';
export default function OwnerDashboard(){
  const [data,setData]=useState<any>(null); const [msg,setMsg]=useState<string|null>(null);
  useEffect(()=>{ (async()=>{ try{ const res=await api('/stores/owner/dashboard'); setData(res);}catch(e:any){setMsg(e.message);} })(); },[]);
  return (<div><h2>Owner Dashboard</h2>{msg&&<p>{msg}</p>}{data&&(<div><p>Store: {data.store.name} | Average rating: {data.averageRating}</p>
    <table border={1} cellPadding={6}><thead><tr><th>User</th><th>Rating</th></tr></thead>
    <tbody>{data.raters.map((r:any,idx:number)=>(<tr key={idx}><td>{r.name}</td><td>{r.value}</td></tr>))}</tbody></table></div>)}</div>);
}