import express from 'express';
import Articles from '../controllers/articles';
import UserAuth from '../middleware/auth';

const { createArticles } = Articles;
const { verifyUserToken, isArticleOwner } = UserAuth;

const articleRouter = express.Router();

articleRouter.post('/', verifyUserToken, createArticles);

export default articleRouter;
