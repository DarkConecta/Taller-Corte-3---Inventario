import getConnection from "../db/database.js";

const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idCliente, nombre, apellido, direccion, telefono, email, fechaRegistro FROM clientes");
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idCliente, nombre, apellido, direccion, telefono, email, fechaRegistro FROM clientes WHERE idCliente = ?", [id]);
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addCliente = async (req, res) => {
    try {
        const { nombre, apellido, direccion, telefono, email } = req.body;
        const cliente = { nombre, apellido, direccion, telefono, email };
        const connection = await getConnection();
        const [rows] = await connection.query("INSERT INTO clientes SET ?", cliente);
        res.json({ id: rows.insertId, ...cliente });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, direccion, telefono, email } = req.body;
        const cliente = { nombre, apellido, direccion, telefono, email };
        const connection = await getConnection();
        const [rows] = await connection.query("UPDATE clientes SET ? WHERE idCliente = ?", [cliente, id]);
        res.json({ affectedRows: rows.affectedRows, ...cliente });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("DELETE FROM clientes WHERE idCliente = ?", [id]);
        res.json({ affectedRows: rows.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    deleteCliente
};