import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';
const prisma = new PrismaClient();
export async function upsertRating(req:AuthRequest,res:any){
  const { storeId, value } = req.body;
  if(value<1||value>5) return res.status(400).json({ error:'Rating must be 1-5' });
  const rating = await prisma.rating.upsert({
    where:{ userId_storeId:{ userId:req.user!.id, storeId } },
    update:{ value },
    create:{ userId:req.user!.id, storeId, value }
  });
  res.json(rating);
}