import { pool } from 'src/db/connection_pool';

export const get = async (req, res, next) => {
    const result = await pool.query('select * from get_courses($1)', [req.query.id]);
    res.end(JSON.stringify(result.rows));
}