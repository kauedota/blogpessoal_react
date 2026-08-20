// Modelo usado no processo de login, inclui o token retornado pela API após autenticação
export default interface UsuarioLogin {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    token: string;
}