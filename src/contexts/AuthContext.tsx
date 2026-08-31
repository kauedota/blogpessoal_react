// Contexto global de autenticação: guarda o usuário logado e expõe login/logout para toda a aplicação
import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import axios from "axios";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

//  Definir os Estados e Funções disponibilizadas pela Context
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogin(usuario: UsuarioLogin): void
    handleLogout(): void
    isLoading: boolean

}

// Quem irá consumir a context
interface AuthProviderProps {
    children: ReactNode
}

// Criar o contexto usando a tipagem AuthContextProps
// O contexto irá disponibilizar os estados e as funções globalmente
export const AuthContext = createContext({} as AuthContextProps)

// INicializar o provedor AuthProvider
// O provedor irá implementar as funções e inicializar os estados

export function AuthProvider({ children }: AuthProviderProps) {

    // inicializar o estado usuario, que é do tipo UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    })
    // Inicializar o estado isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Implementar a função handleLogin
    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true);

        try {
            // Chama o serviço de login; em caso de sucesso, setUsuario é atualizado com os dados + token
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            ToastAlerta("Usuário Autenticado com sucesso!", "sucesso");
        } catch (error) {
            // Trata erros vindos da API (ex: credenciais inválidas) separadamente de erros de conexão
            if (axios.isAxiosError(error) && error.response) {
                ToastAlerta(`Erro ao autenticar o usuário: ${error.response.status}`, "erro");
                console.log('Resposta da API: ', error.message);
            } else {
                ToastAlerta("Erro ao autenticar o usuário! Verifique a conexão com a API!", "erro");
            }
        } finally {
            setIsLoading(false);
        }
    }
    // Implementar a função handleLogout (desconectar o Usuario)
    // Zera o estado usuario, removendo os dados e o token de autenticação
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        })

    }
    return (
        // Disponibiliza usuario, handleLogin, handleLogout e isLoading para todos os componentes filhos
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )


}