import Helper from '../utils/utils';
import pool from '../database/connection';
import { findAnArticle } from '../database/queries';

/**
 * @class UserAuthentication
 * @description Authenticates a given user
 * @exports UserAuthentication
 */
class UserAuthentication {
  /**
  * verifyAuthHeader
  * @method verifyAuthHeader
  * @static
  * @param {object} req - The request object
  * @return {object} JSON representing user payload
  * @memberof UserAuthentication
  */
  static verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return { error: 'auth' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = Helper.verifyToken(token);

    if (!payload) {
      return { error: 'token' };
    }
    return payload;
  }

  /**
    * verifyUserToken
    * @method verifyUserToken
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing error message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static verifyUserToken(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token cannot be authenticated';
    }

    if (error) {
      return res.status(status).json({ status, error });
    }
    req.user = payload;
    next();
  }

  /**
    * verify isAdmin
    * @method isAdmin
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing error message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static isAdmin(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token cannot be authenticated';
    }

    if (error) {
      return res.status(status).json({ status, error });
    }

    if (payload.job_role !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: 'Only admin can create employee account',
      });
    }
    next();
  }

  /**
  * verify isArticleOwner
  * @method isArticleOwner
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @return {object} JSON representing error message
  * @param {object} next
  * @memberof UserAuthentication
  */
  static async isArticleOwner(req, res, next) {
    const userId = req.user.id;
    const articleId = Number(req.params.articleId);

    try {
      const { rows, rowCount } = await pool.query(findAnArticle, [articleId]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Article not found',
        });
      }
      if (userId !== rows[0].author_id) {
        return res.status(401).json({
          status: 401,
          error: 'Action can only be performed by article owner',
        });
      }
      next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default UserAuthentication;
