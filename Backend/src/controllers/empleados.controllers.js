import getConnection from "../db/database.js";

const getEmpleados = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT idEmpleado, nombre, apellido, cargo, email, telefono, fechaContratacion, fechaRegistro FROM empleados");
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idEmpleado, nombre, apellido, cargo, email, telefono, fechaContratacion, fechaRegistro FROM empleados WHERE idEmpleado = ?", [id]);
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addEmpleado = async (req, res) => {
    try {
        const { nombre, apellido, cargo, email, telefono, fechaContratacion } = req.body;
        const empleado = { nombre, apellido, cargo, email, telefono, fechaContratacion };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO empleados SET ?", empleado);
        res.json({ id: result.insertId, ...empleado });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, cargo, email, telefono, fechaContratacion } = req.body;
        const empleado = { nombre, apellido, cargo, email, telefono, fechaContratacion };
        const connection = await getConnection();
        const result = await connection.query("UPDATE empleados SET ? WHERE idEmpleado = ?", [empleado, id]);
        res.json({ affectedRows: result.affectedRows, ...empleado });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM empleados WHERE idEmpleado = ?", [id]);
        res.json({ affectedRows: result.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getEmpleados,
    getEmpleado,
    addEmpleado,
    updateEmpleado,
    deleteEmpleado
};