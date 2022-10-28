import './App.css';
import axios from 'axios';
import XMLParser from 'react-xml-parser'
import React, { useState } from 'react'
import { ClientRepository } from './repository/clientRepository'
import { FormQualifica } from './components/FormQualifica'
import Context from './contexts/form-context'


function App() {
  const [idSessao, setIdSessao] = useState('')
  const [idLigacao, setIdLigacao] = useState('')
  const [statusLigacao, setStatusLigacao] = useState('')
  const [client, setClient] = useState([])

  const clientRepository = new ClientRepository()

  const urlStartSessao = '/cgi-bin/nip-api2?Op=IniciarSessao&Usuario=nipapi&Senha=cdrapi3.1'
  

  async function startSession() {
    const { data } = await axios.get(urlStartSessao)
    const responseJson = new XMLParser().parseFromString(data)
    setIdSessao(responseJson.children[1].value)
  }

  async function gerarLigacao() {
    const currentClient = await clientRepository.findFirst()
    setClient(currentClient)
    console.log(currentClient.telefone);
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=Discar&IdSessao=${idSessao}&Origem=7172&Destino=${currentClient.telefone}`)
    const responseJson = new XMLParser().parseFromString(data)
    setIdLigacao(responseJson.children[1].value)
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

  // async function QualificarLigacao() {
  //   const clientId = client.id
  //   clientRepository.update(clientId, statusLigacao)
  // }

  return (
    <div className="App">
      <Context.Provider value={{ idSessao, idLigacao, statusLigacao, client }}>
         <button onClick={startSession}>Iniciar Sessão</button>
         <button onClick={gerarLigacao}>Gerar Ligação</button>
         <button onClick={consultarLigacao}>Consultar Ligação</button>
         <button onClick={ChecarConnectedId}>Checar Status Ramal</button>
     
        <h3>Dados do Cliente </h3>
        <h4>ID da Sessão: {idSessao}</h4>
        <h4>Status da liga: {statusLigacao}</h4>
        <h4>ID da Ligação: {idLigacao}</h4>
        <h4>ID do Cliente: {client.id}</h4>
        <h4>Nome do Cliente: {client.nome}</h4>
        <h4>Endereço: {client.endereco}</h4>
        <h4>Telefone: {client.telefone}</h4>

        <FormQualifica />
      </ Context.Provider>
    </div>
  );
}

export default App;
