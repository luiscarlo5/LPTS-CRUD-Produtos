export class Produto {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    imagePath?: string;
    createdAt?: string;

    static newProduto(){
        const produto = new Produto();
        return produto;
    }
}
