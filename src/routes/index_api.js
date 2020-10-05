import { pool } from 'src/db/connection_pool';
import { Entity } from 'src/lib/entity';

export const get = (req, res, next) => {
    pool.query('select * from get_menu()', (err, result) => {
        res.end(JSON.stringify(result.rows));
    });

}

export const post = async (req, res, next) => {
    const { content, tableContentId } = req.body;
    const sql = `INSERT INTO lesson (${Entity.defaultFields().join(', ')}, content, table_content_id ) VALUES (${Entity.defaultParams().join(', ')}, $2, $3) RETURNING *`;
    const result = await pool.query(sql, [...Entity.defaultFieldValues(), content, tableContentId]);

    res.end(JSON.stringify(result.rows[0]));

}