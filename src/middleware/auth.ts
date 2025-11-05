import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface AuthRequest extends Request { user?: { id: number; role: 'ADMIN'|'USER'|'OWNER' }; }
export const requireAuth = (req:AuthRequest,res:Response,next:NextFunction)=>{
  const auth = req.headers.authorization;
  if(!auth?.startsWith('Bearer ')) return res.status(401).json({error:'Missing token'});
  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = { id: payload.id, role: payload.role }; next();
  } catch { return res.status(401).json({error:'Invalid token'}); }
};
export const requireRole = (roles:Array<'ADMIN'|'OWNER'|'USER'>) =>
  (req:AuthRequest,res:Response,next:NextFunction)=>{
    if(!req.user) return res.status(401).json({error:'Unauthorized'});
    if(!roles.includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
    next();
  };