import type Postagem from "./Postagem";

// Modelo que representa um Tema, ao qual várias Postagens podem estar associadas
export default interface Tema {
    id: number;
    descricao: string;
    postagem?: Postagem[] | null;
}