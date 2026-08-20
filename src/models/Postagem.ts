import type Tema from "./Tema";
import type Usuario from "./Usuario";

// Modelo que representa uma Postagem do blog, espelhando o objeto retornado pela API
export default interface Postagem {
    id: number;
titulo: string;
texto: string;
data: string; // serve somente para exibir a data, entao usa-se string
tema: Tema | null;
usuario: Usuario | null;
}