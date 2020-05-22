import express from 'express';
import Users from '../controllers/users';
import UserAuth from '../middleware/auth';

const { createUsers, login } = Users;
const { isAdmin } = UserAuth;

const userRouter = express.Router();

userRouter.post('/create-user', isAdmin, createUsers);
userRouter.post('/signin', login);

export default userRouter;
