import express from 'express';
import dotenv from 'dotenv';
import fornecedorRoutes from './routes/fornecedorRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'API de Produtos e Fornecedores funcionando.' });
});

app.use('/fornecedor', fornecedorRoutes);
app.use('/produto', produtoRoutes);
app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.use((erro, req, res, next) => {
    console.error(erro);
    if (erro.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ mensagem: 'Já existe um fornecedor com esse CNPJ.' });
    }
    if (erro.code === 'ER_NO_REFERENCED_ROW_2' || erro.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({ mensagem: 'Não foi possível realizar a operação por causa de um relacionamento.' });
    }
    return res.status(500).json({ mensagem: 'Erro interno ou falha ao acessar o banco de dados.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
