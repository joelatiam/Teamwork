import express from 'express';
import apiVersion from '../helpers';
import articles from '../controllers/articles';

const router = express.Router();

router.post(`${apiVersion}/articles`, articles.newArticle);
router.post(`${apiVersion}/articles/:articleId/comments`, articles.newComment);
router.get(`${apiVersion}/articles/:articleId`, articles.articleDetails);

export default router;
