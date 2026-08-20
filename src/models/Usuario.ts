import type Postagem from "./Postagem";

// Modelo que representa um Usuário cadastrado no sistema
export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    postagem?: Postagem[] | null;
}