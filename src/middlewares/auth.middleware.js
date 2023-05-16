import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function validateSignup(req, res, next) {

    const { email } = req.body;

    const existingUser = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    if (existingUser.rowCount > 0) return res.sendStatus(409);

    next();
}

export async function validateLogin(req, res, next) {

    const { email, password } = req.body;

    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    if (user.rowCount === 0) return res.status(401).send({ message: "User unauthprized" });

    const comparePassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!comparePassword) return res.status(401).send({ message: "User unauthorized" });

    next();


}