import axios from "axios";

// Instância do axios pré-configurada com a URL base da API do Blog Pessoal
const api = axios.create({
  baseURL: 'https://blogpessoal-7t26.onrender.com'
})

// Função  cadastrar Usuario

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) =>{
    // Envia os dados do novo usuário via POST e repassa a resposta para o setState informado
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// Função  autenticar Usuario

export const login = async (url: string, dados: Object, setDados: Function) =>{
    // Envia usuário e senha via POST e repassa a resposta (que inclui o token) para o setState informado
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// Função buscar

export const buscar = async (url: string, setDados: Function, header: Object) => {
    // Faz uma requisição GET (geralmente autenticada via header com token) e repassa o resultado para o setState informado
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

// Função cadastrar

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

// Função atualizar

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

// Função Deletar

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}