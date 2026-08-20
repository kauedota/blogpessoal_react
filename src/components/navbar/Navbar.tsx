// Barra de navegação fixa exibida em todas as páginas da aplicação
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    // Objeto usado para redirecionar o usuário para outra rota
    const navigate = useNavigate();

    // Consome a função de logout disponibilizada pela AuthContext
    const { handleLogout } = useContext(AuthContext);

    // Desconecta o usuário, avisa e redireciona para a página de login
    function logout(){
        handleLogout();
        alert("Usuario desconectado com sucesso!");
        navigate("/");
    }


    return (
        <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">

            <div className="container flex justify-between text-lg mx-8">
                <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>

            <div className="flex gap-4">
                Postagem
                <Link to='/temas' className='hover:underline'>Temas</Link>
                <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                Perfil
                <Link onClick={logout} to="" className="hover:underline">Sair</Link>
            </div>
            </div>
        </div>
    )
}

export default Navbar