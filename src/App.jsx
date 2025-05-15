import { BrowserRouter, Routes, Route } from 'react-router-dom' // Importa os componentes do React Router para manipular as rotas da aplicação
//import LoginPage from './pages/LoginPage' // Importa a página de login que será exibida quando o usuário acessar a rota '/login'
import DashboardPage from './pages/DashboardPage' // Importa a página do dashboard (página principal) que será exibida na rota raiz '/'

import './App.css' // Importa o arquivo de estilos CSS para a aplicação (aplica estilos globais)

function App() { // Componente principal da aplicação
  return (
    <BrowserRouter> {/* Envolve a aplicação para que a navegação entre páginas funcione sem recarregar */}
      <Routes> {/* Define as rotas da aplicação */}
        {/* Define a rota para a página de login, onde o componente LoginPage será renderizado
        <Route path="/login" element={<LoginPage />} /> */}
        {/* Define a rota para o Dashboard, que será a página principal da aplicação */}
        <Route path="/" element={<DashboardPage />} />
      </Routes>
      
    </BrowserRouter>
  )
}


export default App