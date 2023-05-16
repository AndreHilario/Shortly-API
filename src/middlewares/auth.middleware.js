import { db } from "../database/database.connection.js";

export async function validateSignup(req, res, next) {

    const { email } = req.body;

    const existingUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (existingUser.rowCount > 0) return res.sendStatus(409);

    next();
}