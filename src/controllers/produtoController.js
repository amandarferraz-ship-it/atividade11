import Produto from '../models/Produto.js';
import Fornecedor from '../models/Fornecedor.js';
import {
    criarProduto, listarProdutos, buscarProdutoPorId,
    atualizarProduto, excluirProduto, vincularFornecedor,
    removerVinculoFornecedor
} from '../repositories/produtoRepository.js';
import { buscarFornecedorPorId } from '../repositories/fornecedorRepository.js';

export async function cadastrar(req, res, next) {
    try {
        const produto = new Produto(req.body.descricao, req.body.preco, req.body.peso);
        const erro = produto.validarDados();
        if (erro) return res.status(400).json({ mensagem: erro });

        const id = await criarProduto(produto.descricao.trim(), produto.preco, produto.peso);
        return res.status(201).json({ mensagem: 'Produto cadastrado sem fornecedor.', id_produto: id });
    } catch (erro) { next(erro); }
}

export async function listar(req, res, next) {
    try {
        return res.status(200).json(await listarProdutos());
    } catch (erro) { next(erro); }
}

export async function buscarPorId(req, res, next) {
    try {
        const { id } = req.params;
        if (!Produto.validarId(id)) return res.status(400).json({ mensagem: 'ID deve ser um número inteiro positivo.' });
        const produto = await buscarProdutoPorId(Number(id));
        if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        return res.status(200).json(produto);
    } catch (erro) { next(erro); }
}

export async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        if (!Produto.validarId(id)) return res.status(400).json({ mensagem: 'ID deve ser um número inteiro positivo.' });

        const atual = await buscarProdutoPorId(Number(id));
        if (!atual) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

        const campos = {};
        if (req.body.descricao !== undefined) campos.descricao = req.body.descricao;
        if (req.body.preco !== undefined) campos.preco = req.body.preco;
        if (req.body.peso !== undefined) campos.peso = req.body.peso;
        if (Object.keys(campos).length === 0) return res.status(400).json({ mensagem: 'Envie descrição, preço ou peso para atualizar.' });

        const produto = new Produto(
            campos.descricao !== undefined ? campos.descricao : atual.descricao,
            campos.preco !== undefined ? campos.preco : atual.preco,
            campos.peso !== undefined ? campos.peso : atual.peso
        );
        const erro = produto.validarDados();
        if (erro) return res.status(400).json({ mensagem: erro });

        await atualizarProduto(Number(id), campos);
        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
    } catch (erro) { next(erro); }
}

export async function excluir(req, res, next) {
    try {
        const { id } = req.params;
        if (!Produto.validarId(id)) return res.status(400).json({ mensagem: 'ID deve ser um número inteiro positivo.' });
        const existe = await buscarProdutoPorId(Number(id));
        if (!existe) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        await excluirProduto(Number(id));
        return res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });
    } catch (erro) { next(erro); }
}

export async function vincular(req, res, next) {
    try {
        const { idProduto, idFornecedor } = req.params;
        if (!Produto.validarId(idProduto) || !Fornecedor.validarId(idFornecedor)) {
            return res.status(400).json({ mensagem: 'Os dois IDs devem ser números inteiros positivos.' });
        }

        const produto = await buscarProdutoPorId(Number(idProduto));
        if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

        const fornecedor = await buscarFornecedorPorId(Number(idFornecedor));
        if (!fornecedor) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });

        await vincularFornecedor(Number(idProduto), Number(idFornecedor));
        return res.status(200).json({ mensagem: 'Fornecedor vinculado ao produto com sucesso.' });
    } catch (erro) { next(erro); }
}

export async function removerVinculo(req, res, next) {
    try {
        const { idProduto } = req.params;
        if (!Produto.validarId(idProduto)) return res.status(400).json({ mensagem: 'ID deve ser um número inteiro positivo.' });

        const produto = await buscarProdutoPorId(Number(idProduto));
        if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

        await removerVinculoFornecedor(Number(idProduto));
        return res.status(200).json({ mensagem: 'Vínculo removido. Produto e fornecedor foram preservados.' });
    } catch (erro) { next(erro); }
}
