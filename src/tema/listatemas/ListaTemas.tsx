// Página que lista todos os Temas cadastrados, exigindo que o usuário esteja autenticado
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Tema from "../../models/Tema";
import { buscar } from "../../services/Service";
import CardTema from "../cardtema/CardTema"
import { SyncLoader } from "react-spinners";

function ListaTemas() {

    // Objeto responsável por redirecionar o usuário para outra rota
    const navigate = useNavigate();

    // Controla a exibição do loader enquanto os temas são carregados
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado que guarda a lista de temas retornada pela API
    const [temas, setTemas] = useState<Tema[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Se não houver token (usuário não logado), redireciona para a página de login
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // Busca os temas ao montar o componente e sempre que a quantidade de temas mudar
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    // Busca a lista de temas na API usando o token do usuário logado;
    // se o token estiver expirado/inválido (erro 401), desconecta o usuário
    async function buscarTemas() {
        try {
            setIsLoading(true)
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            {isLoading && (
                <SyncLoader
                    color="#312e81"
                    size={32}
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {(!isLoading && temas.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            temas.map((tema) => (
                                <CardTema key={tema.id} tema={tema} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas;
