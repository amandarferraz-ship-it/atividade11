import Fornecedor from '../models/Fornecedor.js';
import {
    criarFornecedor, listarFornecedores, buscarFornecedorPorId,
    atualizarFornecedor, excluirFornecedor
} from '../repositories/fornecedorRepository.js';

export async function cadastrar(req, res, next) {
    try {
        const fornecedor = new Fornecedor(req.body.nome, req.body.cnpj);
        const erro = fornecedor.validarDados();
        if (erro) return res.status(400).json({ mensagem: erro });

        const id = await criarFornecedor(fornecedor.nome.trim(), fornecedor.cnpj);
        return res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso.', id_fornecedor: id });
    } catch (erro) { next(erro); }
}

export async function listar(req, res, next) {
    try {
        return res.status(200).json(await listarFornecedores());
    } catch (erro) { next(erro); }
}

export async function buscarPorId(req, res, next) {
    try {
        const { id } = req.params;
        if (!Fornecedor.validarId(id)) return res.status(400).json({ mensagem: 'ID deve ser um número inteiro positivo.' });
        const fornecedor = await buscarFornecedorPorId(Number(id));
        if (!fornecedor) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        return res.status(200).json(fornecedor);
    } catch (erro) { next(erro); }
}

export async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        if (!Fornecedor.validarId(id)) return res.status(400).json({ mensagem: 'ID deve ser um número inteiro positivo.' });

        const campos = {};
        if (req.body.nome !== undefined) campos.nome = req.body.nome;
        if (req.body.cnpj !== undefined) campos.cnpj = req.body.cnpj;
        if (Object.keys(campos).length === 0) return res.status(400).json({ mensagem: 'Envie pelo menos nome ou cnpj para atualizar.' });

        const atual = await buscarFornecedorPorId(Number(id));
        if (!atual) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });

        const fornecedor = new Fornecedor(
            campos.nome !== undefined ? campos.nome : atual.nome,
            campos.cnpj !== undefined ? campos.cnpj : atual.cnpj
        );
        const erro = fornecedor.validarDados();
        if (erro) return res.status(400).json({ mensagem: erro });

        await atualizarFornecedor(Number(id), campos);
        return res.status(200).json({ mensagem: 'Fornecedor atualizado com sucesso.' });
    } catch (erro) { next(erro); }
}

export async function excluir(req, res, next) {
    try {
        const { id } = req.params;
        if (!Fornecedor.validarId(id)) return res.status(400).json({ mensagem: 'ID deve ser um número inteiro positivo.' });
        const existe = await buscarFornecedorPorId(Number(id));
        if (!existe) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
        await excluirFornecedor(Number(id));
        return res.status(200).json({ mensagem: 'Fornecedor excluído. Produtos relacionados foram mantidos sem fornecedor.' });
    } catch (erro) { next(erro); }
}
