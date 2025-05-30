import getConnection from "../db/database.js";

const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT idProducto, idCategoria, nombre, descripcion, precio, stock, fechaCreacion FROM productos");
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idProducto, idCategoria, nombre, descripcion, precio, stock, fechaCreacion FROM productos WHERE idProducto = ?", [id]);
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addProducto = async (req, res) => {
    try {
        const { idCategoria, nombre, descripcion, precio, stock } = req.body;
        const producto = { idCategoria, nombre, descripcion, precio, stock };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO productos SET ?", producto);
        res.json({ id: result.insertId, ...producto });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { idCategoria, nombre, descripcion, precio, stock } = req.body;
        const producto = { idCategoria, nombre, descripcion, precio, stock };
        const connection = await getConnection();
        const result = await connection.query("UPDATE productos SET ? WHERE idProducto = ?", [producto, id]);
        res.json({ affectedRows: result.affectedRows, ...producto });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM productos WHERE idProducto = ?", [id]);
        res.json({ affectedRows: result.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getProductos,
    getProducto,
    addProducto,
    updateProducto,
    deleteProducto
};