# Evidências dos testes

Salve nesta pasta capturas de tela reais do Postman/Insomnia/Thunder Client. Não há prints automáticos porque eles precisam mostrar a execução da sua própria API.

Registre pelo menos:
1. POST e GET de fornecedor.
2. POST de produto sem fornecedor e GET do produto.
3. PATCH para vincular produto e fornecedor existentes.
4. GET do produto mostrando os dados do fornecedor.
5. PATCH para remover o vínculo e novo GET mostrando `fk_id_fornecedor: null`.
6. Tentativa de vínculo com fornecedor inexistente (404).
7. Busca de ID inexistente (404).
8. Cadastro inválido (400).
9. Testes das demais rotas CRUD.

Sugestão de nomes: `01-cadastrar-fornecedor.png`, `02-listar-fornecedores.png`, etc.
