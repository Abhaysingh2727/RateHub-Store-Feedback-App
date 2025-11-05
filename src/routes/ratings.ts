import { Router } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';
import { upsertRating } from '../controllers/ratingController.js';
const router = Router();
router.post('/', requireAuth, [ body('storeId').isInt(), body('value').isInt({ min:1, max:5 }) ], handleValidation, upsertRating);
export default router;