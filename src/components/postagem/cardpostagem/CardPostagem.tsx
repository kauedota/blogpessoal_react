// Card que exibe uma Postagem individual, com ações para editar e deletar
import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

// Props recebidas pelo componente: a postagem a ser exibida
interface CardPostagemProps {
    postagem: Postagem
}

// Converte a data retornada pela API (ex: 2026-01-25T13:41:53.000000) para "Domingo, 25 de janeiro de 2026 às 13:41:53"
function formatarData(data: string): string {
    const date = new Date(data)
    const dataPorExtenso = date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    const [diaSemana, resto] = dataPorExtenso.split(', ')
    const diaSemanaCapitalizada = diaSemana
        .split('-')
        .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
        .join('-')
    const hora = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
    return `${diaSemanaCapitalizada}, ${resto} às ${hora}`
}

function CardPostagem({ postagem }: CardPostagemProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-primary text-white font-bold flex items-center gap-3'>
                <img
                    src={postagem.usuario?.foto}
                    alt={postagem.usuario?.nome}
                    className='w-10 h-10 rounded-full object-cover border-2 border-white'
                />
                <span className='text-lg'>{postagem.usuario?.nome}</span>
            </header>
            <div className='p-8 bg-cream-dark h-full flex flex-col gap-2'>
                <p className='text-2xl font-bold'>{postagem.titulo}</p>
                <p className='text-lg'>{postagem.texto}</p>
                <p className='text-sm'>Tema: {postagem.tema?.descricao}</p>
                <p className='text-sm'>Data: {formatarData(postagem.data)}</p>
            </div>

            <div className='flex'>
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
