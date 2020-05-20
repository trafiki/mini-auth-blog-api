import express from 'express';
import Users from '../controllers/users';

const { createUsers } = Users;

const userRouter = express.Router();

userRouter.post('/create-user', createUsers);

export default userRouter;
