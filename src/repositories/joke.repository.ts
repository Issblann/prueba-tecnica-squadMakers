import pool from '../config/db';

export class JokeRepository {
    async save(text: string, type: string) {
        const result = await pool.query('INSERT INTO jokes (text, type) VALUES ($1, $2) RETURNING *', [text, type]);
        return result.rows[0];
    }

    async update(id: number, newText: string, type: string) {
        const result = await pool.query('UPDATE jokes SET text = $1, type = $2 WHERE id = $3 RETURNING *', [
            newText,
            type,
            id,
        ]);
        return result.rows[0];
    }

    async findById(id: number) {
        const result = await pool.query('SELECT * FROM jokes WHERE id = $1', [id]);
        return result.rows[0];
    }

    async delete(id: number) {
        await pool.query('DELETE FROM jokes WHERE id = $1', [id]);
    }
}
