import axios from "axios";
import { toast } from "react-toastify";

// Id fixo do toast de aviso, evita duplicar o alerta em requisições concorrentes
const AVISO_SERVIDOR_ID = "aviso-servidor-iniciando";
// Só avisa se a resposta demorar mais que isso (requisição "normal" responde bem mais rápido)
const AVISO_SERVIDOR_DELAY_MS = 4000;

// Instância do axios pré-configurada com a URL base da API do Blog Pessoal
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // O Render (plano free) "dorme" a API por inatividade; a primeira requisição
  // após esse período pode levar até ~1 minuto para acordar o servidor
  timeout: 60000,
})

// Avisa o usuário quando uma requisição demora, sinal de que o servidor está acordando
api.interceptors.request.use((config) => {
  const avisoTimeoutId = setTimeout(() => {
    toast.info("Iniciando servidor, isso pode levar até 1 minuto na primeira requisição", {
      toastId: AVISO_SERVIDOR_ID,
      position: "top-right",
      theme: "colored",
      autoClose: false,
      closeOnClick: true,
    })
  }, AVISO_SERVIDOR_DELAY_MS)

  ;(config as any).avisoTimeoutId = avisoTimeoutId
  return config
})

function limparAvisoServidor(config?: any) {
  clearTimeout(config?.avisoTimeoutId)
  toast.dismiss(AVISO_SERVIDOR_ID)
}

api.interceptors.response.use(
  (response) => {
    limparAvisoServidor(response.config)
    return response
  },
  (error) => {
    limparAvisoServidor(error.config)
    return Promise.reject(error)
  }
)

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