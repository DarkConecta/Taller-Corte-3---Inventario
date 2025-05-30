import getConnection from "../db/database.js";

const getFacturaDetalles = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT idFacturaDetalle, idFactura, idProducto, cantidad, precioUnitario, subtotal FROM facturadetalle");
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const getFacturaDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idFacturaDetalle, idFactura, idProducto, cantidad, precioUnitario, subtotal FROM facturadetalle WHERE idFacturaDetalle = ?", [id]);
        res.json(result);
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const addFacturaDetalle = async (req, res) => {
    try {
        const { idFactura, idProducto, cantidad, precioUnitario, subtotal } = req.body;
        const detalle = { idFactura, idProducto, cantidad, precioUnitario, subtotal };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO facturadetalle SET ?", detalle);
        res.json({ id: result.insertId, ...detalle });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const updateFacturaDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { idFactura, idProducto, cantidad, precioUnitario, subtotal } = req.body;
        const detalle = { idFactura, idProducto, cantidad, precioUnitario, subtotal };
        const connection = await getConnection();
        const result = await connection.query("UPDATE facturadetalle SET ? WHERE idFacturaDetalle = ?", [detalle, id]);
        res.json({ affectedRows: result.affectedRows, ...detalle });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

const deleteFacturaDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM facturadetalle WHERE idFacturaDetalle = ?", [id]);
        res.json({ affectedRows: result.affectedRows });
    } catch (error) {
        console.error("Error 500", error);
        res.status(500).send(error.message);
    }
};

export const methodHTTP = {
    getFacturaDetalles,
    getFacturaDetalle,
    addFacturaDetalle,
    updateFacturaDetalle,
    deleteFacturaDetalle
};