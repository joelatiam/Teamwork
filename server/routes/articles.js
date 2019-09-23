import express from 'express';
import apiVersion from '../helpers';
import articles from '../controllers/articles';

const router = express.Router();


router.post(`${apiVersion}/articles`, articles.newArticle);

export default router;
