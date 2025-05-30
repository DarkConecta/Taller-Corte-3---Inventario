import { Router } from "express";
import { methodHTTP as clientesController } from "../controllers/clientes.controllers.js";

const router = Router();

router.get("/", clientesController.getClientes);
router.get("/:id", clientesController.getCliente);
router.post("/", clientesController.addCliente);
router.put("/:id", clientesController.updateCliente);
router.delete("/:id", clientesController.deleteCliente);

export default router;