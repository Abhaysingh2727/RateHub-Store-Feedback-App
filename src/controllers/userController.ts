import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function adminStats(_req:any,res:any){
  const [users,stores,ratings] = await Promise.all([prisma.user.count(),prisma.store.count(),prisma.rating.count()]);
  res.json({ users, stores, ratings });
}
export async function listUsers(req:any,res:any){
  const { q = '', role } = req.query as any;
  const users = await prisma.user.findMany({
    where:{
      AND:[
        { OR:[
          { name:{ contains:q, mode:'insensitive' } },
          { email:{ contains:q, mode:'insensitive' } },
          { address:{ contains:q, mode:'insensitive' } }
        ]},
        role ? { role: role as any } : {}
      ]
    },
    orderBy:{ name:'asc' },
    select:{ id:true, name:true, email:true, address:true, role:true, store:true }
  });
  res.json(users);
}
export async function addUser(req:any,res:any){
  const { name,email,password,address,role } = req.body;
  try{
    const bcrypt = await import('bcryptjs');
    const hashed = await bcrypt.default.hash(password,10);
    const user = await prisma.user.create({ data:{ name,email,address,password:hashed,role } });
    res.status(201).json({ id:user.id });
  }catch(e:any){ res.status(400).json({ error:e.message }); }
}