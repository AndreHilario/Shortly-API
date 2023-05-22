import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function postShortUrl(req, res) {

    const { url } = req.body;
    const { userId } = res.locals;

    const code = nanoid(8);

    try {

        const postUrl = await db.query(`
        INSERT INTO urls ("shortUrl", url, "userId") 
            VALUES ($1, $2, $3) 
            RETURNING id;
        `, [code, url, userId]);

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
        const newGetUrl = {
            id: getUrl.id,
            shortUrl: getUrl.shortUrl,
            url: getUrl.url
        };
        res.status(200).send(newGetUrl);
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

        getUrl.visitCount += 1

        res.redirect(getUrl.url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrls(req, res) {

    const { id } = req.params;

    try {
        await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}