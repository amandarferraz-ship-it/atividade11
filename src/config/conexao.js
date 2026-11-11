import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("Configuração do MySQL:");
console.log("Usuário:", process.env.DB_USER);
console.log("Banco:", process.env.DB_NAME);

const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default conexao;