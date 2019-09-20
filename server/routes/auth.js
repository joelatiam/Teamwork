import express from 'express';
import apiVersion from '../helpers';
import auth from '../controllers/auth';

const router = express.Router();


router.post(`${apiVersion}/auth/signup`, auth.signup);


export default router;
