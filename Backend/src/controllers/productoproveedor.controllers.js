import getConnection from "../db/database.js";

const getProductoProveedores = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT idProducto, idProveedor, precioProveedor, fechaAsociacion FROM productoproveedor");
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getProductoProveedor = async (req, res) => {
    try {
        const { idProducto, idProveedor } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idProducto, idProveedor, precioProveedor, fechaAsociacion FROM productoproveedor WHERE idProducto = ? AND idProveedor = ?", [idProducto, idProveedor]);
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addProductoProveedor = async (req, res) => {
    try {
        const { idProducto, idProveedor, precioProveedor } = req.body;
        const relacion = { idProducto, idProveedor, precioProveedor };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO productoproveedor SET ?", relacion);
        res.json(relacion); // No hay un ID autoincremental único
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateProductoProveedor = async (req, res) => {
    try {
        const { idProducto, idProveedor } = req.params;
        const { precioProveedor } = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE productoproveedor SET precioProveedor = ? WHERE idProducto = ? AND idProveedor = ?", [precioProveedor, idProducto, idProveedor]);
        res.json({ affectedRows: result.affectedRows, precioProveedor });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteProductoProveedor = async (req, res) => {
    try {
        const { idProducto, idProveedor } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM productoproveedor WHERE idProducto = ? AND idProveedor = ?", [idProducto, idProveedor]);
        res.json({ affectedRows: result.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getProductoProveedores,
    getProductoProveedor,
    addProductoProveedor,
    updateProductoProveedor,
    deleteProductoProveedor
};