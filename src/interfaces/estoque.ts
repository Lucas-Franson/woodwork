import { ImageProps } from "react-native";

export default interface Estoque {
    id: number;
    nome: string;
    detalhes: string;
    quantidade: number;
    image: string;
}