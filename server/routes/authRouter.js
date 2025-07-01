import express from 'express';

const authrouter = express.Router();    
import { register,Login } from '../controllers/authController.js';


authrouter.post('/register', register);
authrouter.post('/login', Login);
// authRouter.post('/logout', logout);

export default authrouter;