// Componente raiz da aplicação: define o Provider de autenticação e as rotas
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListaTemas from "./tema/listatemas/ListaTemas";
import FormTema from "./tema/formtema/FormTema";
import DeletarTema from "./tema/deletartema/DeletarTema";




function App() {


  return (
    <>
      {/* AuthProvider disponibiliza o usuário logado e as funções de login/logout para toda a árvore */}
      <AuthProvider>


        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            {/* Mapeamento das rotas da aplicação para seus respectivos componentes de página */}
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/cadastro' element={<Cadastro />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastrartema" element={<FormTema />} />
              <Route path="/editartema/:id" element={<FormTema />} />
              <Route path="/deletartema/:id" element={<DeletarTema />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App