import express from 'express';
import { getVideos, showVideos } from '../controllers/videos';

const router = express.Router();

router.get('/videos/:instaId', getVideos);

router.get('/video/:url', showVideos);

export default router;
