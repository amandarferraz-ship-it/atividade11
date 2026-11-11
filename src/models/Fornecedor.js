export default class Fornecedor {
    constructor(nome, cnpj) {
        this.nome = nome;
        this.cnpj = cnpj;
    }

    validarDados() {
        if (typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            return 'O nome do fornecedor deve possuir pelo menos 3 caracteres.';
        }

        if (typeof this.cnpj !== 'string' || this.cnpj.length !== 14) {
            return 'O CNPJ deve possuir exatamente 14 caracteres.';
        }

        return null;
    }

    static validarId(id) {
        const numero = Number(id);
        return Number.isInteger(numero) && numero > 0;
    }
}
