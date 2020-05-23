import dotenv from 'dotenv';
import pool from './connection';
import Helper from '../utils/utils';

dotenv.config();

const password = process.env.PASSWORD;
const hashedPassword = Helper.hashPassword(password);

const addAllsqlTableQueries = `
      INSERT INTO users(username, first_name, last_name, email, password, job_role)
      VALUES ('trafiki' ,'Tunde', 'Akerele', 'trafiki@miniblog.com', '${hashedPassword}', 'admin'),
             ( 'oyi' ,'Oyiza', 'Salami', 'oyi@miniblog.com', '${hashedPassword}', 'author');
      `;

async function insertAllToTables() {
  try {
    const create = await pool.query(addAllsqlTableQueries);
    console.log(`addAllsqlTableQueries: ${create.command}ED`);
  } catch (error) {
    console.log(`addAllsqlTableQueries: ${error}`);
  }
}

export default insertAllToTables;
