import { Router } from 'express';
import * as produtoController from '../controllers/produtoController.js';

const router = Router();

router.post('/', produtoController.cadastrar);
router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);
router.patch('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.excluir);
router.patch('/:idProduto/fornecedor/:idFornecedor', produtoController.vincular);
router.patch('/:idProduto/remover-fornecedor', produtoController.removerVinculo);

export default router;
