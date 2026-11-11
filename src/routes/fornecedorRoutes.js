import { Router } from 'express';
import * as fornecedorController from '../controllers/fornecedorController.js';

const router = Router();

router.post('/', fornecedorController.cadastrar);
router.get('/', fornecedorController.listar);
router.get('/:id', fornecedorController.buscarPorId);
router.patch('/:id', fornecedorController.atualizar);
router.delete('/:id', fornecedorController.excluir);

export default router;
