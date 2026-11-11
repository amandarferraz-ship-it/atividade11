export default class Produto {
    constructor(descricao, preco, peso) {
        this.descricao = descricao;
        this.preco = Number(preco);
        this.peso = Number(peso);
    }

    validarDados() {
        if (typeof this.descricao !== 'string' || this.descricao.trim().length < 3) {
            return 'A descrição do produto deve possuir pelo menos 3 caracteres.';
        }

        if (!Number.isFinite(this.preco) || this.preco <= 0) {
            return 'O preço deve ser um número maior que zero.';
        }

        if (!Number.isFinite(this.peso) || this.peso <= 0) {
            return 'O peso deve ser um número maior que zero.';
        }

        return null;
    }

    static validarId(id) {
        const numero = Number(id);
        return Number.isInteger(numero) && numero > 0;
    }
}
