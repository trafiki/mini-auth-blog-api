/* eslint-disable no-console */
import pool from '../connection';

const articlesTable = `
DROP TABLE IF EXISTS articles CASCADE;
  CREATE TABLE IF NOT EXISTS articles(
    article_id SERIAL PRIMARY KEY NOT NULL,
    author_id INTEGER NOT NULL,
    title VARCHAR(128) NOT NULL,
    article TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
  )`;

/**
 * Function representing ArticlesTableHandler
 * @returns {object} representing sucess or failure
 */
async function createArticlesTable() {
  try {
    const create = await pool.query(articlesTable);
    console.log(`articlesTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`articlesTable: ${error}`);
  }
}

export default createArticlesTable;
