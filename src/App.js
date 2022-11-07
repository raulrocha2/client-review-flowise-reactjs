import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home, ListarClientes } from './components'


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/lista-clientes' element={<ListarClientes />} />
        </Routes>
      </BrowserRouter>
      <br/>
      <br/>
      <footer className='footer'>&copy; 2022 RenRaDevs.com</footer>
    </div>
  );
}

export default App;
