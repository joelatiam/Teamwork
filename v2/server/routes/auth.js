import express from 'express';
import apiVersion from '../helpers/index';
import auth from '../controllers/auth';

const router = express.Router();

router.post(`${apiVersion}/auth/signup`, auth.signup);
router.post(`${apiVersion}/auth/signin`, auth.signin);

export default router;
