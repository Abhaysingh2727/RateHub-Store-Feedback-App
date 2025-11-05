import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';
const prisma = new PrismaClient();
export async function addStore(req:any,res:any){
  const { name,email,address,ownerId } = req.body;
  try{
    const store = await prisma.store.create({ data:{ name,email,address,ownerId } });
    res.status(201).json(store);
  }catch(e:any){ res.status(400).json({ error:e.message }); }
}
export async function listStores(req:AuthRequest,res:any){
  const { q = '' } = req.query as any;
  const userId = req.user?.id;
  const stores = await prisma.store.findMany({
    where:{ OR:[
      { name:{ contains:q, mode:'insensitive' } },
      { address:{ contains:q, mode:'insensitive' } }
    ]},
    orderBy:{ name:'asc' },
    include:{ ratings:true }
  });
  const result = stores.map(s=>{
    const overall = s.ratings.length ? (s.ratings.reduce((a,r)=>a+r.value,0)/s.ratings.length) : 0;
    const userRating = s.ratings.find(r=>r.userId===userId)?.value ?? null;
    return { id:s.id, name:s.name, email:s.email, address:s.address, overallRating:Number(overall.toFixed(2)), userRating };
  });
  res.json(result);
}
export async function ownerDashboard(req:AuthRequest,res:any){
  const me = await prisma.user.findUnique({ where:{ id:req.user!.id } });
  const store = await prisma.store.findFirst({ where:{ ownerId: me?.id }, include:{ ratings:{ include:{ user:true } } } });
  if(!store) return res.status(404).json({ error:'No store for owner' });
  const avg = store.ratings.length ? store.ratings.reduce((a,r)=>a+r.value,0)/store.ratings.length : 0;
  res.json({ store:{ id:store.id, name:store.name }, averageRating:Number(avg.toFixed(2)), raters: store.ratings.map(r=>({ userId:r.userId, name:r.user.name, value:r.value })) });
}