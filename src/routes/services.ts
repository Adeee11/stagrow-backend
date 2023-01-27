import express from 'express';
import { getProduct } from '../controllers/services';

const router = express.Router();
router.get('/product/:type', getProduct);

export default router;
