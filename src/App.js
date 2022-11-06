import './App.css';
import React, { useEffect, useState } from 'react'
import { ClientRepository } from './repository/clientRepository'
import { FormQualifica } from './components/FormQualifica'
import Context from './contexts/form-context'
import { NextAPI } from './usecase/nextApi';
import { Header } from './components/Header';
import { Home } from './components/Home';


function App() {
  const [idSessao, setIdSessao] = useState('')
  const [idLigacao, setIdLigacao] = useState('')
  const [statusLigacao, setStatusLigacao] = useState('')
  const [client, setClient] = useState([])
  const [clients, setClients] = useState([])

  const urlStartSessao = '/cgi-bin/nip-api2?Op=IniciarSessao&Usuario=nipapi&Senha=cdrapi3.1'
  
  const clientRepository = new ClientRepository()
  const nextAPI = new NextAPI(urlStartSessao, clientRepository)

  

  async function startSession() {
    const result = await nextAPI.startSession()
    setIdSessao(result)
  }

  async function gerarLigacao() {
    const currentClient = await clientRepository.findFirst()
    setClient(currentClient)
    const result = await nextAPI.gerarLigacao(idSessao)
    setIdLigacao(result)
  }
  

  async function consultarLigacao() {
    const result = await nextAPI.consultarLigacao(idSessao, idLigacao)
    setStatusLigacao(result)
  }



  async function ChecarConnectedId() {
    await nextAPI.checarConnectedId(idSessao)
  }

  async function ListarClientes() {
    const clients = await clientRepository.findAll()
    setClients(clients)
  }

  useEffect(() => {
    (async () => {
      await ListarClientes()
    })()
  }, [])

  
  return (
    <div className="App">
      <Header />
       <Home />
      <footer className='footer'>&copy; 2022 RenRaDevs.com</footer>
    </div>
  );
}

export default App;
