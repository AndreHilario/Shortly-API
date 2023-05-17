import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function postShortUrl(req, res) {

    const { url } = req.body;

    const code = nanoid(8);

    try {

        const postUrl = await db.query(`
        INSERT INTO urls (url, "shortUrl") 
            VALUES ($1, $2) 
            RETURNING id;
        `, [url, code]);

        const shortUrlBody = {
            id: postUrl.rows[0].id,
            shortUrl: code
        };

        res.status(201).send(shortUrlBody);

    } catch (err) {
        res.status(500).send(err.message);
    }
}