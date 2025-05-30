import { Router } from "express";
import { methodHTTP as proveedoresController } from "../controllers/proveedores.controllers.js";

const router = Router();

router.get("/", proveedoresController.getProveedores);
router.get("/:id", proveedoresController.getProveedor);
router.post("/", proveedoresController.addProveedor);
router.put("/:id", proveedoresController.updateProveedor);
router.delete("/:id", proveedoresController.deleteProveedor);

export default router;