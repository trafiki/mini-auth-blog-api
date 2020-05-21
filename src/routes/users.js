import express from 'express';
import Users from '../controllers/users';

const { createUsers, login } = Users;

const userRouter = express.Router();

userRouter.post('/create-user', createUsers);
userRouter.post('/signin', login);

export default userRouter;
