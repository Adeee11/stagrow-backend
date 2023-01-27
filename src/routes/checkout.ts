import express from 'express';
import { getCheckout,getTest } from '../controllers/checkout';

const router = express.Router();

router.post('/checkout', getCheckout);
router.post('/test', getTest);

export default router;
