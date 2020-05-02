import 'dotenv/config';
import { Pool } from 'pg';

const connect = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(connect);

pool.on('connect', () => {
  console.log('Successfully connected to the auth_blog database');
});

export default pool;
