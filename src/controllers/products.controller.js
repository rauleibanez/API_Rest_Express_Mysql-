import { pool } from "../database.js";
/* ----------------------------------------------------------
 *             APIs para la tabla PRODUCTOS
 * ----------------------------------------------------------
 */
/* ------------[CREAR UN REGISTRO]-------------- */
// POST(http://localhost:3000/products)
export const createProduct = async (req, res) => {
    try {
        const { desc, cant, prec } = req.body;
        const [rows] = await pool.query("INSERT INTO productos (desc_prod, cant_prod, prec_prod) VALUES (?, ?, ?)", [desc, cant, prec]);
    res.status(201).json({ id: rows.insertId, desc, cant, prec});
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal!" });
    }
};
/* ------------[OBTENER TODOS LOS REGISTROS]-------------- */
// GET(http://localhost:3000/products)
export const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal!" });
    }
};
/* ------------[OBTENER UN REGISTRO POR ID]-------------- */
//
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_prod = ?", [id]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Producto no Encontrado!" });
        }
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal!" });
    }
};
/* ------------[ACTUALIZAR UN REGISTRO POR ID]-------------- */
export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { desc, cant, prec } = req.body;
        const [result] = await pool.query("UPDATE productos SET desc_prod = ?, cant_prod = ?, prec_prod = ? WHERE id_prod = ?", [desc, cant, prec, id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Producto no encontrado!" });
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_prod = ?", [id]);   res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal!" });
    }
}
/* ------------[ELIMINAR UN REGISTRO POR ID]-------------- */
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM productos WHERE id_prod = ?", [id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Producto no encontrado!" });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal!" });
    }
};