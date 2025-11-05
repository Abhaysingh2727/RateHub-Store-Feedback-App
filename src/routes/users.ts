import { Router } from 'express';
import { body, query } from 'express-validator';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';
import { adminStats, listUsers, addUser } from '../controllers/userController.js';
const router = Router();
router.get('/stats', requireAuth, requireRole(['ADMIN']), adminStats);
router.get('/', requireAuth, requireRole(['ADMIN']), [ query('q').optional().isString(), query('role').optional().isIn(['ADMIN','USER','OWNER']) ], handleValidation, listUsers);
router.post('/', requireAuth, requireRole(['ADMIN']), [
  body('name').isLength({ min:20, max:60 }),
  body('email').isEmail(),
  body('address').isLength({ max:400 }),
  body('password').isStrongPassword({ minLength:8, maxLength:16, minUppercase:1, minSymbols:1 }),
  body('role').isIn(['ADMIN','USER','OWNER'])
], handleValidation, addUser);
export default router;