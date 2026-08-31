// Card que exibe uma Postagem individual, com ações para editar e deletar
import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagemProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagemProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <div className="flex w-full bg-primary py-2 px-4 items-center gap-4 text-white">
                <img
                    src={postagem.usuario?.foto}
                    className='h-12 w-12 rounded-full object-cover'
                    alt={postagem.usuario?.nome} />
                <h3 className='text-lg font-bold uppercase'>
                    {postagem.usuario?.nome}
                </h3>
            </div>

            <div className='p-6 bg-cream-dark h-full flex flex-col gap-2'>
                <h4 className='text-lg font-semibold uppercase'>{postagem.titulo}</h4>
                <p>{postagem.texto}</p>
                <p className='text-sm'>Tema: {postagem.tema?.descricao}</p>
                <p className='text-sm'>
                    Data: {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}
                </p>
            </div>

            <div className="flex">
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='w-full text-white bg-primary hover:bg-primary-dark
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletarpostagem/${postagem.id}`} className='text-white bg-danger hover:bg-danger-dark w-full
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem
