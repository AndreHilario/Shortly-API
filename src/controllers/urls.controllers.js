import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function postShortUrl(req, res) {

    const { url } = req.body;

    const code = nanoid(8);

    try {

        const postUrl = await db.query(`
        INSERT INTO urls ("shortUrl", url) 
            VALUES ($1, $2) 
            RETURNING id;
        `, [code, url]);

        const shortUrlBody = {
            id: postUrl.rows[0].id,
            shortUrl: code
        };

        res.status(201).send(shortUrlBody);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res) {

    const { id } = req.params;

    try {
        const getUrl = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);
        if (getUrl.rowCount === 0) return res.sendStatus(404);

        res.send(getUrl.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}