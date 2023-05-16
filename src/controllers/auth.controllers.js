import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    try {

        await db.query(`INSERT INTO users (name, email, password, "confirmPassword") VALUES ($1, $2, $3, $4)`, [name, email, hash, hash]);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function login(req, res) {

}