import express from 'express';
import { getPosts, showPosts } from '../controllers/posts';

const router = express.Router();

router.get('/posts/:instaId', getPosts);
router.get('/img/:url', showPosts);

export default router;
