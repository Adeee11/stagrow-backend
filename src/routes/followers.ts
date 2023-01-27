import express from 'express';
import { getFollowers } from '../controllers/followers';

const router = express.Router();
router.get('/followers/:instaId', getFollowers);

export default router;
