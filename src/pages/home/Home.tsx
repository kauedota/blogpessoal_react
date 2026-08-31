// Página inicial exibida após o login, com uma breve mensagem de boas-vindas e as últimas postagens
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Postagem from "../../models/Postagem";
import { buscar } from "../../services/Service";
import CardPostagem from "../../components/postagem/cardpostagem/CardPostagem";
import Spinner from "../../components/spinner/Spinner";

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token !== '') {
      buscarPostagens();
    }
  }, [token]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);
      await buscar('/postagens', setPostagens, {
        headers: { Authorization: token },
      });
    } catch {
      // Home não bloqueia a navegação se a busca falhar
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Conteiner Principal */}
      <div className="bg-primary-dark flex justify-center">

        {/* Seção com duas colunas */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 text-white">

          {/* Conteúdo de texto */}
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-2xl md:text-5xl font-bold">
              Seja Bem Vindo
            </h2>

            <p className="text-xl">
              Expresse aqui seus pensamentos
            </p>

            <div className="flex justify-around gap-4">
              <Link to="/cadastrarpostagem" className="rounded-lg border-2 border-solid border-white py-2 px-4 hover:bg-white hover:text-primary-dark transition-colors">
                Nova Postagem
              </Link>
            </div>
          </div>

          {/* Imagem da Página home */}
          <div className="flex justify-center">
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Imagem da página Home"
              className="w-2/3"
            />
          </div>

        </div>
      </div>

      {/* Últimas postagens */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-dark">Últimas postagens</h3>
          <Link to="/postagens" className="text-primary hover:underline">Ver todas</Link>
        </div>

        {isLoading && (
          <div className="flex justify-center my-8">
            <Spinner className="h-12 w-12 text-primary" />
          </div>
        )}

        {!isLoading && postagens.length === 0 && (
          <span className="text-xl text-center block my-8 text-dark">
            Nenhuma Postagem foi encontrada!
          </span>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postagens.slice(0, 3).map((postagem) => (
            <CardPostagem key={postagem.id} postagem={postagem} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
