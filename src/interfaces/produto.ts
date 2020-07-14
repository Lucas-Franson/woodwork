interface itensProduto {
    id: number;
    qtd: number;
}

export default interface Produto {
    id: number;
    nome: string;
    detalhes: string;
    itens: itensProduto[];
    image: string;
}

