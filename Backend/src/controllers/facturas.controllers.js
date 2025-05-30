import getConnection from "../db/database.js";

const getFacturas = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idFactura, idCliente, idEmpleado, fechaFactura, numeroFactura, totalFactura, estado, fechaCreacion FROM facturas");
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("SELECT idFactura, idCliente, idEmpleado, fechaFactura, numeroFactura, totalFactura, estado, fechaCreacion FROM facturas WHERE idFactura = ?", [id]);
        res.json(rows);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addFactura = async (req, res) => {
    try {
        const { idCliente, idEmpleado, fechaFactura, numeroFactura, totalFactura, estado } = req.body;
        const factura = { idCliente, idEmpleado, fechaFactura, numeroFactura, totalFactura, estado };
        const connection = await getConnection();
        const [rows] = await connection.query("INSERT INTO facturas SET ?", factura);
        res.json({ id: rows.insertId, ...factura });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { idCliente, idEmpleado, fechaFactura, numeroFactura, totalFactura, estado } = req.body;
        const factura = { idCliente, idEmpleado, fechaFactura, numeroFactura, totalFactura, estado };
        const connection = await getConnection();
        const [rows] = await connection.query("UPDATE facturas SET ? WHERE idFactura = ?", [factura, id]);
        res.json({ affectedRows: rows.affectedRows, ...factura });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [rows] = await connection.query("DELETE FROM facturas WHERE idFactura = ?", [id]);
        res.json({ affectedRows: rows.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getFacturas,
    getFactura,
    addFactura,
    updateFactura,
    deleteFactura
};