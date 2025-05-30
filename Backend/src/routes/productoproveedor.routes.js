import { Router } from "express";
import { methodHTTP as productoProveedorController } from "../controllers/productoProveedor.controllers.js";

const router = Router();

router.get("/", productoProveedorController.getProductoProveedores);
router.get("/:idProducto/:idProveedor", productoProveedorController.getProductoProveedor);
router.post("/", productoProveedorController.addProductoProveedor);
router.put("/:idProducto/:idProveedor", productoProveedorController.updateProductoProveedor);
router.delete("/:idProducto/:idProveedor", productoProveedorController.deleteProductoProveedor);

export default router;