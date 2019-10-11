import express from 'express';
import apiVersion from './helpers';

const router = express.Router();

const postmanAPI = 'https://documenter.getpostman.com/view/7381509/SVn3tFRQ?version=latest#4646ba70-cc0d-48a5-85a4-ffe347602349';

router.get(`${apiVersion}/docs`, (req, res) => res.redirect(postmanAPI));

export default router;
