// USERS
export const createUser = 'INSERT INTO users (username, first_name, last_name, email, password, job_role) values ($1, $2, $3, $4, $5, $6) returning *';
export const findEmail = 'SELECT * FROM users WHERE email = $1';

// ARTICLES
export const createArticle = 'INSERT INTO articles (author_id, title, article) values ($1, $2, $3) returning *';
export const findAnArticle = 'SELECT * FROM articles WHERE article_id = $1';
export const modifyArticle = 'UPDATE articles SET title = $1 , article = $2 WHERE article_id = $3 and author_id = $4 RETURNING *';
export const deleteOwnArticle = 'DELETE FROM articles WHERE articleid = $1 returning *';
export const allfeed = 'SELECT * FROM articles';
