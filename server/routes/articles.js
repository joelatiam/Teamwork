import express from 'express';
import apiVersion from '../helpers';
import articles from '../controllers/articles';

const router = express.Router();

router.post(`${apiVersion}/articles`, articles.newArticle);
router.post(`${apiVersion}/articles/:articleID/comments`, articles.newComment);
router.get(`${apiVersion}/articles/:articleID`, articles.articleDetails);
router.get(`${apiVersion}/feeds`, articles.allArticles);
router.delete(`${apiVersion}/articles/:articleID`, articles.deleteArticle);
router.patch(`${apiVersion}/articles/:articleID`, articles.editArticle);

export default router;
