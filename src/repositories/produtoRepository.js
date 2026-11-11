import conexao from '../config/conexao.js';

export async function criarProduto(descricao, preco, peso) {
    const [resultado] = await conexao.execute(
        'INSERT INTO produto (descricao, preco, peso) VALUES (?, ?, ?)',
        [descricao, preco, peso]
    );
    return resultado.insertId;
}

export async function listarProdutos() {
    const [linhas] = await conexao.execute(
        `SELECT p.id_produto, p.descricao, p.preco, p.peso,
                f.id_fornecedor, f.nome AS fornecedor_nome, f.cnpj AS fornecedor_cnpj
         FROM produto p
         LEFT JOIN fornecedor f ON p.fk_id_fornecedor = f.id_fornecedor
         ORDER BY p.id_produto`
    );
    return linhas;
}

export async function buscarProdutoPorId(id) {
    const [linhas] = await conexao.execute(
        `SELECT p.id_produto, p.descricao, p.preco, p.peso,
                p.fk_id_fornecedor,
                f.id_fornecedor, f.nome AS fornecedor_nome, f.cnpj AS fornecedor_cnpj
         FROM produto p
         LEFT JOIN fornecedor f ON p.fk_id_fornecedor = f.id_fornecedor
         WHERE p.id_produto = ?`,
        [id]
    );
    return linhas[0] ?? null;
}

export async function atualizarProduto(id, campos) {
    const colunas = [];
    const valores = [];

    if (campos.descricao !== undefined) {
        colunas.push('descricao = ?');
        valores.push(campos.descricao);
    }
    if (campos.preco !== undefined) {
        colunas.push('preco = ?');
        valores.push(campos.preco);
    }
    if (campos.peso !== undefined) {
        colunas.push('peso = ?');
        valores.push(campos.peso);
    }

    if (colunas.length === 0) return false;

    valores.push(id);
    const [resultado] = await conexao.execute(
        `UPDATE produto SET ${colunas.join(', ')} WHERE id_produto = ?`,
        valores
    );
    return resultado.affectedRows > 0;
}

export async function excluirProduto(id) {
    const [resultado] = await conexao.execute(
        'DELETE FROM produto WHERE id_produto = ?',
        [id]
    );
    return resultado.affectedRows > 0;
}

export async function vincularFornecedor(idProduto, idFornecedor) {
    const [resultado] = await conexao.execute(
        'UPDATE produto SET fk_id_fornecedor = ? WHERE id_produto = ?',
        [idFornecedor, idProduto]
    );
    return resultado.affectedRows > 0;
}

export async function removerVinculoFornecedor(idProduto) {
    const [resultado] = await conexao.execute(
        'UPDATE produto SET fk_id_fornecedor = NULL WHERE id_produto = ?',
        [idProduto]
    );
    return resultado.affectedRows > 0;
}
