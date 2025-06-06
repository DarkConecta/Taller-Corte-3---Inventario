import getConnection from "../db/database.js";

const getProveedores = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idProveedor, nombreProveedor, contacto, telefono, email, direccion, fechaRegistro FROM proveedores");
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idProveedor, nombreProveedor, contacto, telefono, email, direccion, fechaRegistro FROM proveedores WHERE idProveedor = ?", [id]);
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addProveedor = async (req, res) => {
    try {
        const { nombreProveedor, contacto, telefono, email, direccion } = req.body;
        const proveedor = { nombreProveedor, contacto, telefono, email, direccion };
        const connection = await getConnection();
        const [rows] = await connection.query("INSERT INTO proveedores SET ?", proveedor);
        res.json({ id: rows.insertId, ...proveedor });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreProveedor, contacto, telefono, email, direccion } = req.body;
        const proveedor = { nombreProveedor, contacto, telefono, email, direccion };
        const connection = await getConnection();
        const [rows] = await connection.query("UPDATE proveedores SET ? WHERE idProveedor = ?", [proveedor, id]);
        res.json({ affectedRows: rows.affectedRows, ...proveedor });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("DELETE FROM proveedores WHERE idProveedor = ?", [id]);
        res.json({ affectedRows: rows.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getProveedores,
    getProveedor,
    addProveedor,
    updateProveedor,
    deleteProveedor
};