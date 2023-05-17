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

    const { getUrl } = res.locals;

    try {
        res.send(getUrl);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getAndOpenUrls(req, res) {

    const { getUrl } = res.locals;
    const { shortUrl } = req.params;

    try {

        await db.query(`
        UPDATE urls 
            SET "visitCount" = "visitCount" + 1
            WHERE "shortUrl" = $1
        ;`, [shortUrl]);

        res.redirect(getUrl.url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}