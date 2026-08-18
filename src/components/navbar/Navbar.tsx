import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="w-full flex justify-center bg-indigo-900 text-white">
      <div className="container flex flex-wrap items-center justify-between py-4 px-4">
        <a href="#" className="text-2xl font-bold">
          <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>
        </a>

        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-indigo-300">Home</a>
          <a href="#" className="hover:text-indigo-300">Postagens</a>
          <a href="#" className="hover:text-indigo-300">Temas</a>
          <a href="#" className="hover:text-indigo-300">Cadastrar Usuário</a>
          <a href="#" className="hover:text-indigo-300">Login</a>
          <Link to="/login" className="hover:underline">Sair</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
