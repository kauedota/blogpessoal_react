import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

// Formulário usado tanto para cadastrar quanto para editar uma Postagem
function FormPostagem() {

    const navigate = useNavigate();

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: postagem.tema,
            usuario: usuario,
        });
    }

    function atualizarTema(e: ChangeEvent<HTMLSelectElement>) {
        const temaSelecionado = temas.find((t) => t.id === Number(e.target.value));
        if (temaSelecionado) {
            setTema(temaSelecionado);
        }
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Postagem atualizada com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar a postagem.', 'erro');
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Postagem cadastrada com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar a postagem.', 'erro');
                }
            }
        }

        setIsLoading(false);
        retornar();
    }


    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Postagem' : 'Editar Postagem'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovaPostagem} >
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Título"
                        name='titulo'
                        className="border-2 border-line rounded p-2"
                        value={postagem.titulo || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="texto">Texto da Postagem</label>
                    <textarea
                        placeholder="Escreva aqui o texto da sua postagem"
                        name='texto'
                        className="border-2 border-line rounded p-2"
                        value={postagem.texto || ''}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="tema">Tema da Postagem</label>
                    <select
                        name="tema"
                        id="tema"
                        className="border-2 border-line rounded p-2"
                        value={postagem.tema?.id ?? ''}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarTema(e)}
                    >
                        <option value="" disabled>Selecione um Tema</option>
                        {temas.map((t) => (
                            <option key={t.id} value={t.id}>{t.descricao}</option>
                        ))}
                    </select>
                </div>
                <button
                    className="rounded text-white bg-primary hover:bg-primary-dark w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <Spinner className="h-5 w-5 text-white" /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    );
}

export default FormPostagem;
