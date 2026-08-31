import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import Spinner from "../../spinner/Spinner"

// Página de confirmação de exclusão de uma Postagem
function DeletarPostagem() {

    const navigate = useNavigate()

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
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

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            ToastAlerta('Postagem apagada com sucesso', 'sucesso')
            retornar()
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem.', 'erro')
            }
        }

        setIsLoading(false)
    }

    function retornar() {
        navigate('/postagens')
    }


    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-primary text-white font-bold text-2xl'>
                    {postagem.titulo}
                </header>
                <p className='p-8 text-3xl bg-cream-dark h-full'>{postagem.texto}</p>
                <div className='flex'>
                    <button
                        className='text-white bg-danger hover:bg-danger-dark w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-white bg-primary hover:bg-primary-dark flex items-center justify-center'
                        onClick={deletarPostagem}>

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

export default DeletarPostagem
