# API de Produtos e Fornecedores

API REST desenvolvida com Node.js, Express e MySQL2 para cadastrar, consultar, atualizar e excluir produtos e fornecedores, além de gerenciar o vínculo entre eles.

## 1. Requisitos
- Node.js instalado
- MySQL Server e MySQL Workbench
- Postman, Insomnia ou Thunder Client
- Git

## 2. Configuração do banco
1. Abra o MySQL Workbench.
2. Abra e execute o arquivo `banco.sql`.
3. O script cria o banco `api_produtos_fornecedores`, as tabelas e dados de exemplo.
4. Na raiz do projeto, copie `.env.example` e renomeie a cópia para `.env`.
5. Preencha usuário e senha do seu MySQL. Não envie o `.env` ao GitHub.

Exemplo:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=api_produtos_fornecedores
PORT=3000
```

## 3. Instalação e execução
No terminal do VS Code, dentro da pasta do projeto:
```bash
npm install
npm run dev
```
A API ficará disponível em `http://localhost:3000`.

## 4. Rotas obrigatórias

### Fornecedor
| Método | Caminho | Função |
|---|---|---|
| POST | `/fornecedor` | Cadastrar |
| GET | `/fornecedor` | Listar todos |
| GET | `/fornecedor/:id` | Buscar por ID |
| PATCH | `/fornecedor/:id` | Atualizar parcialmente |
| DELETE | `/fornecedor/:id` | Excluir |

### Produto
| Método | Caminho | Função |
|---|---|---|
| POST | `/produto` | Cadastrar sem fornecedor |
| GET | `/produto` | Listar todos |
| GET | `/produto/:id` | Buscar por ID com dados do fornecedor |
| PATCH | `/produto/:id` | Atualizar descrição, preço ou peso |
| DELETE | `/produto/:id` | Excluir |

### Relacionamento
| Método | Caminho | Função |
|---|---|---|
| PATCH | `/produto/:idProduto/fornecedor/:idFornecedor` | Vincular ou substituir fornecedor |
| PATCH | `/produto/:idProduto/remover-fornecedor` | Remover somente o vínculo |

## 5. Exemplos de requisições

POST `http://localhost:3000/fornecedor`
```json
{
  "nome": "Fornecedor Delta",
  "cnpj": "45678901000123"
}
```

POST `http://localhost:3000/produto`
```json
{
  "descricao": "Rolamento industrial",
  "preco": 35.90,
  "peso": 0.450
}
```

PATCH `http://localhost:3000/produto/1`
```json
{
  "preco": 39.90
}
```

PATCH `http://localhost:3000/produto/1/fornecedor/1`
Body vazio.

PATCH `http://localhost:3000/produto/1/remover-fornecedor`
Body vazio.

## 6. Códigos HTTP
- `200`: consulta, atualização, exclusão ou vínculo realizado.
- `201`: cadastro realizado.
- `400`: dados ou IDs inválidos.
- `404`: recurso não encontrado.
- `500`: falha inesperada ou no banco.

## 7. Organização
- `models`: classes e validações.
- `repositories`: comandos SQL.
- `controllers`: regras da requisição e respostas HTTP.
- `routes`: caminhos e métodos HTTP.
- `config/conexao.js`: conexão centralizada com MySQL.

## 8. Testes e evidências
A coleção está em `docs/colecao-postman.json`. Importe-a no Postman, execute as requisições e salve capturas reais em `docs/testes/`. O arquivo `docs/testes/LEIA-ME.md` contém a lista de evidências a registrar.
