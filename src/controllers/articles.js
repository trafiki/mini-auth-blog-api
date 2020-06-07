import pool from '../database/connection';
import {
  createArticle, findAnArticle, modifyArticle, deleteOwnArticle, allfeed,
} from '../database/queries';

/**
 * @class Articles
 */
class Articles {
  /**
     * Authors can create and/or share articles
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON representing success or error message
     * @memberof Articles
     */
  static async createArticles(req, res) {
    const { id } = req.user;

    const values = [
      id,
      req.body.title,
      req.body.article,
    ];

    try {
      const { rows } = await pool.query(createArticle, values);
      const {
        article_id, author_id, title, article, created_on,
      } = rows[0];

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article posted successfully',
          article_id,
          author_id,
          title,
          article,
          created_on,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: error,
        error: error.message,
      });
    }
  }
}

export default Articles;
