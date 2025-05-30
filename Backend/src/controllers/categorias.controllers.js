import getConnection from "../db/database.js";

const getCategorias = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idCategoria, nombreCategoria, descripcion FROM categorias");
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idCategoria, nombreCategoria, descripcion FROM categorias WHERE idCategoria = ?", [id]);
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addCategoria = async (req, res) => {
    try {
        const { nombreCategoria, descripcion } = req.body;
        const categoria = { nombreCategoria, descripcion };
        const connection = await getConnection();
        const [rows] = await connection.query("INSERT INTO categorias SET ?", categoria);
        res.json({ id: rows.insertId, ...categoria });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCategoria, descripcion } = req.body;
        const categoria = { nombreCategoria, descripcion };
        const connection = await getConnection();
        const [rows] = await connection.query("UPDATE categorias SET ? WHERE idCategoria = ?", [categoria, id]);
        res.json({ affectedRows: rows.affectedRows, ...categoria });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("DELETE FROM categorias WHERE idCategoria = ?", [id]);
        res.json({ affectedRows: rows.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getCategorias,
    getCategoria,
    addCategoria,
    updateCategoria,
    deleteCategoria
};