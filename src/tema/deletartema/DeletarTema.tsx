import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Tema from "../../models/Tema"
import { buscar, deletar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"
import Spinner from "../../components/spinner/Spinner"

// Página de confirmação de exclusão de um Tema
function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            ToastAlerta('Tema apagado com sucesso', 'sucesso')
            retornar()
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar o tema.', 'erro')
            }
        }

        setIsLoading(false)
    }

    function retornar() {
        navigate('/temas')
    }


    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-primary text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-cream-dark h-full'>{tema.descricao}</p>
                <div className='flex'>
                    <button
                        className='text-white bg-danger hover:bg-danger-dark w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-white bg-primary hover:bg-primary-dark flex items-center justify-center'
                        onClick={deletarTema}>

                        {isLoading ?
                            <Spinner className="h-5 w-5 text-white" /> :
                            <span>Sim</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema
