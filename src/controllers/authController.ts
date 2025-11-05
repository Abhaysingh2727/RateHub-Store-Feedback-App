import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth.js';
const prisma = new PrismaClient();
export async function signup(req:any,res:any){
  const { name, email, address, password } = req.body;
  try{
    const hashed = await bcrypt.hash(password,10);
    const user = await prisma.user.create({ data:{ name, email, address, password: hashed, role:'USER' }});
    res.status(201).json({ id: user.id });
  }catch(e:any){ res.status(400).json({ error: e.message }); }
}
export async function login(req:any,res:any){
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where:{ email } });
  if(!user) return res.status(401).json({ error:'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({ error:'Invalid credentials' });
  const token = jwt.sign({ id:user.id, role:user.role }, process.env.JWT_SECRET as string, { expiresIn:'7d' });
  res.json({ token, role:user.role, name:user.name });
}
export async function changePassword(req:AuthRequest,res:any){
  const { oldPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where:{ id: req.user!.id } });
  if(!user) return res.status(404).json({ error:'User not found' });
  const ok = await bcrypt.compare(oldPassword, user.password);
  if(!ok) return res.status(400).json({ error:'Old password incorrect' });
  const hashed = await bcrypt.hash(newPassword,10);
  await prisma.user.update({ where:{ id:user.id }, data:{ password: hashed }});
  res.json({ ok:true });
}