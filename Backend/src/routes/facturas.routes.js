import { Router } from "express";
import { methodHTTP as facturasController } from "../controllers/facturas.controllers.js";

const router = Router();

router.get("/", facturasController.getFacturas);
router.get("/:id", facturasController.getFactura);
router.post("/", facturasController.addFactura);
router.put("/:id", facturasController.updateFactura);
router.delete("/:id", facturasController.deleteFactura);

export default router;