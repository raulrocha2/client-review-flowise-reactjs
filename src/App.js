import './App.css';
import axios from 'axios';
import XMLParser from 'react-xml-parser'
import React, { useState } from 'react'
import { ClientRepository } from './repository/clientRepository'
import { FormQualifica } from './components/FormQualifica'
import Context from './contexts/form-context'
import { NextAPI } from './usecase/nextApi';
import { Header } from './components/Header';


function App() {
  const [idSessao, setIdSessao] = useState('')
  const [idLigacao, setIdLigacao] = useState('')
  const [statusLigacao, setStatusLigacao] = useState('')
  const [client, setClient] = useState([])

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
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=ConsultarLigacao&IdSessao=${idSessao}&IdLigacao=${idLigacao}`)
    const responseJson = new XMLParser().parseFromString(data)
    setStatusLigacao(responseJson.children[1].value)
  }



  async function ChecarConnectedId() {
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=ChecarConnectedId&IdSessao=${idSessao}&Numero=9813`)
    const responseJson = new XMLParser().parseFromString(data)
    console.log('responseJson', responseJson.children[1].value);
    //setStatusLigacao(responseJson.children[1].value)
  }


  return (
    <div className="App">
       <Header />
      <Context.Provider value={{ idSessao, idLigacao, statusLigacao, client }}>

        <div className='container'>

         <div className='details'>
          <button onClick={startSession}>Iniciar Sessão</button>
            <h2>Dados da Ligação</h2>
            <h3>ID da Sessão: {idSessao}</h3>
            <h3>Status da liga: {statusLigacao}</h3>
            <h3>ID da Ligação: {idLigacao}</h3>
            <h3>ID do Cliente: {client.id}</h3>
            <h3>Nome do Cliente: {client.nome}</h3>
            <h3>Endereço: {client.endereco}</h3>
            <h3>Telefone: {client.telefone}</h3>
            <FormQualifica />
          </div>
          <div className='control'>
          <button onClick={gerarLigacao}>Gerar Ligação</button>
          <button onClick={consultarLigacao}>Consultar Ligação</button>
          <button onClick={ChecarConnectedId}>Checar Status Ramal</button>
          </div>
        </div>
      </ Context.Provider>
      <footer className='footer'>&copy; 2022 RenRaDevs.com</footer>
    </div>
  );
}

export default App;
