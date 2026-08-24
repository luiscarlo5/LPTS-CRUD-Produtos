export class Produto {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    imagePath?: string;

    static newProduto(){
        const produto = new Produto();
        return produto;
    }
}
