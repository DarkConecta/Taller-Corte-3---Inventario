import { Router } from "express";
import { methodHTTP as facturaDetalleController } from "../controllers/facturaDetalle.controllers.js";

const router = Router();

router.get("/", facturaDetalleController.getFacturaDetalles);
router.get("/:id", facturaDetalleController.getFacturaDetalle);
router.post("/", facturaDetalleController.addFacturaDetalle);
router.put("/:id", facturaDetalleController.updateFacturaDetalle);
router.delete("/:id", facturaDetalleController.deleteFacturaDetalle);

export default router;