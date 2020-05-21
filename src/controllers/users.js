/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import Helper from '../utils/utils';
import pool from '../database/connection';
import { createUser, findEmail } from '../database/queries';

/**
 * @class Users
 */
class Users {
  /**
   * Create User Account
   * Admin can create user account
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} - JSON representing success or error message
   * @memberof Users
   */
  static async createUsers(req, res) {
    const {
      username, first_name, last_name, email, password, job_role,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const values = [username, first_name, last_name, email, hashedPassword, job_role];

    try {
      const { rows } = await pool.query(createUser, values);
      const { id } = rows[0];
      const token = Helper.generateToken({
        id,
        username,
        first_name,
        last_name,
        email,
        job_role,
      });
      return res.status(201).json({
        status: 'success',
        data: {
          username,
          message: 'User account created successfully',
          token,
          id,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * Login User Account
   * User can login
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} - JSON representing success or error message
   * @memberof Users
   */
  static async login(req, res) {
    const { email } = req.body;
    const value = [email];
    try {
      const { rows } = await pool.query(findEmail, value);
      if (rows[0]) {
        const validPassword = Helper.verifyPassword(rows[0].password, req.body.password);
        if (validPassword) {
          const {
            id,
            username,
            first_name,
            last_name,
            job_role,
          } = rows[0];
          const token = Helper.generateToken({
            id,
            username,
            first_name,
            last_name,
            email,
            job_role,
          });
          return res.status(200).json({
            status: 'success',
            data: {
              username,
              message: 'Login successful',
              token,
              id,
            },
          });
        }
        return res.status(401).json({
          status: 'unauthorized',
          error: 'Either email or passowrd is incorrect',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default Users;
