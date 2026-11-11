import conexao from '../config/conexao.js';

export async function criarFornecedor(nome, cnpj) {
    const [resultado] = await conexao.execute(
        'INSERT INTO fornecedor (nome, cnpj) VALUES (?, ?)',
        [nome, cnpj]
    );
    return resultado.insertId;
}

export async function listarFornecedores() {
    const [linhas] = await conexao.execute(
        'SELECT id_fornecedor, nome, cnpj FROM fornecedor ORDER BY id_fornecedor'
    );
    return linhas;
}

export async function buscarFornecedorPorId(id) {
    const [linhas] = await conexao.execute(
        'SELECT id_fornecedor, nome, cnpj FROM fornecedor WHERE id_fornecedor = ?',
        [id]
    );
    return linhas[0] ?? null;
}

export async function atualizarFornecedor(id, campos) {
    const colunas = [];
    const valores = [];

    if (campos.nome !== undefined) {
        colunas.push('nome = ?');
        valores.push(campos.nome);
    }
    if (campos.cnpj !== undefined) {
        colunas.push('cnpj = ?');
        valores.push(campos.cnpj);
    }

    if (colunas.length === 0) return false;

    valores.push(id);
    const [resultado] = await conexao.execute(
        `UPDATE fornecedor SET ${colunas.join(', ')} WHERE id_fornecedor = ?`,
        valores
    );
    return resultado.affectedRows > 0;
}

export async function excluirFornecedor(id) {
    const [resultado] = await conexao.execute(
        'DELETE FROM fornecedor WHERE id_fornecedor = ?',
        [id]
    );
    return resultado.affectedRows > 0;
}
