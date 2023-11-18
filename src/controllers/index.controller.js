import { pool } from "../database.js";

export const index = (req, res) => res.json({ message: "Welcome API" });

export const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" as result');
  res.json(result[0]);
};