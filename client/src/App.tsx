import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import StoresList from './components/StoresList';
import AdminDashboard from './components/DashboardAdmin';
import OwnerDashboard from './components/DashboardOwner';
import { getToken, setToken } from './api';
function Nav(){
  const token = getToken();
  const logout = ()=>{ setToken(null); window.location.href='/'; };
  return (<nav style={{display:'flex',gap:12,padding:12,borderBottom:'1px solid #ccc'}}>
    <Link to="/">Stores</Link><Link to="/admin">Admin</Link><Link to="/owner">Owner</Link>
    {!token ? (<><Link to="/login">Login</Link><Link to="/signup">Sign up</Link></>) : <button onClick={logout}>Logout</button>}
  </nav>);
}
export default function App(){
  return (<div><Nav/><div style={{padding:16}}>
    <Routes>
      <Route path="/" element={<StoresList/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/owner" element={<OwnerDashboard/>}/>
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes></div></div>);
}