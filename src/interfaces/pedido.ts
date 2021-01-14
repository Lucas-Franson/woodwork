import Cliente from "./cliente";
import Produto from "./produto";

export default interface Pedido {
    id: number;
    nome: string;
    detalhes: string;
    idCliente: number;
    itens: [];
    dataFinal: Date;
    valorFinal: string;
}