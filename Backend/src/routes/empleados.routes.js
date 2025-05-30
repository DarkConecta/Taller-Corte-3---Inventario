import { Router } from "express";
import { methodHTTP as empleadosController } from "../controllers/empleados.controllers.js";

const router = Router();

router.get("/", empleadosController.getEmpleados);
router.get("/:id", empleadosController.getEmpleado);
router.post("/", empleadosController.addEmpleado);
router.put("/:id", empleadosController.updateEmpleado);
router.delete("/:id", empleadosController.deleteEmpleado);

export default router;