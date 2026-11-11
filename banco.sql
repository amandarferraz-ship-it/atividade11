CREATE DATABASE IF NOT EXISTS api_produtos_fornecedores;
USE api_produtos_fornecedores;

CREATE TABLE IF NOT EXISTS fornecedor (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    peso DECIMAL(10,3) NOT NULL,
    fk_id_fornecedor INT NULL,
    CONSTRAINT fk_produto_fornecedor
        FOREIGN KEY (fk_id_fornecedor)
        REFERENCES fornecedor(id_fornecedor)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Dados de exemplo: 3 fornecedores e 5 produtos
INSERT INTO fornecedor (nome, cnpj) VALUES
('Fornecedor Alfa', '12345678000190'),
('Fornecedor Beta', '23456789000101'),
('Fornecedor Gama', '34567890000112');

INSERT INTO produto (descricao, preco, peso) VALUES
('Parafuso sextavado', 1.50, 0.025),
('Porca de aço', 0.90, 0.015),
('Chapa de metal', 85.00, 4.500),
('Cabo elétrico', 12.90, 0.300),
('Motor elétrico', 450.00, 8.200);
