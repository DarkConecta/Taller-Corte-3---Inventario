import getConnection from "../db/database.js";

const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT idCliente, nombre, apellido, direccion, telefono, email, fechaRegistro FROM clientes");
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idCliente, nombre, apellido, direccion, telefono, email, fechaRegistro FROM clientes WHERE idCliente = ?", [id]);
        res.json(result);
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
        const result = await connection.query("INSERT INTO clientes SET ?", cliente);
        res.json({ id: result.insertId, ...cliente });
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
        const result = await connection.query("UPDATE clientes SET ? WHERE idCliente = ?", [cliente, id]);
        res.json({ affectedRows: result.affectedRows, ...cliente });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM clientes WHERE idCliente = ?", [id]);
        res.json({ affectedRows: result.affectedRows });
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