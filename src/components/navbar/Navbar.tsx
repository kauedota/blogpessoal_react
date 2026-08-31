import { useContext, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    // Objeto usado para redirecionar o usuário para outra rota
    const navigate = useNavigate();

    // Controla a exibição do menu no formato mobile (hambúrguer)
    const [menuAberto, setMenuAberto] = useState(false);

    // Consome a função de logout disponibilizada pela AuthContext
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token

    // Desconecta o usuário, avisa e redireciona para a página de login
    function logout() {
        setMenuAberto(false);
        handleLogout();
        ToastAlerta("Usuário desconectado com sucesso!", "sucesso");
        navigate("/");
    }

    function fecharMenu() {
        setMenuAberto(false);
    }

    const links = [
        { to: '/postagens', label: 'Postagens' },
        { to: '/cadastrarpostagem', label: 'Cadastrar postagem' },
        { to: '/temas', label: 'Temas' },
        { to: '/cadastrartema', label: 'Cadastrar tema' },
        { to: '/perfil', label: 'Perfil' },
    ]

    let component: ReactNode

    if (token !== '') {

        component = (
            <div className='w-full bg-primary-dark text-white'>
                <div className="container mx-auto flex justify-between items-center text-lg px-4 py-4 md:px-8">
                    <Link to="/" onClick={fecharMenu} className="text-2xl font-bold">Blog Pessoal</Link>

                    <button
                        className="md:hidden"
                        onClick={() => setMenuAberto(!menuAberto)}
                        aria-label="Abrir menu"
                    >
                        {menuAberto ? <X size={28} /> : <List size={28} />}
                    </button>

                    <div className='hidden md:flex items-center gap-4'>
                        {links.map((link) => (
                            <Link key={link.to} to={link.to} className='hover:underline'>{link.label}</Link>
                        ))}
                        <Link onClick={logout} to="" className="hover:underline">Sair</Link>
                    </div>
                </div>

                {menuAberto && (
                    <div className='md:hidden flex flex-col gap-4 px-4 pb-4 text-lg'>
                        {links.map((link) => (
                            <Link key={link.to} to={link.to} onClick={fecharMenu} className='hover:underline'>{link.label}</Link>
                        ))}
                        <Link onClick={logout} to="" className="hover:underline">Sair</Link>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Navbar
