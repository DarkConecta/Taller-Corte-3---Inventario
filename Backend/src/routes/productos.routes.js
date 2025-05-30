import { Router } from "express";
import { methodHTTP as productosController } from "../controllers/productos.controllers.js";

const router = Router();

router.get("/", productosController.getProductos);
router.get("/:id", productosController.getProducto);
router.post("/", productosController.addProducto);
router.put("/:id", productosController.updateProducto);
router.delete("/:id", productosController.deleteProducto);

export default router;