import './App.css';
import axios from 'axios';
import XMLParser from 'react-xml-parser'
import React, { useState, useEffect } from 'react'
import { ClientRepository } from './repository/clientRepository'
import { clientsDefault } from './database/data.js'


function App() {
  const [idSessao, setIdSessao] = useState('')
  const [idLigacao, setIdLigacao] = useState('')
  const [statusLigacao, setStatusLigacao] = useState('')
  const [client, setClient] = useState([])
  const [qualificado, setQualificado] = useState(false)

  const clientRepository = new ClientRepository(clientsDefault)

  const urlStartSessao = '/cgi-bin/nip-api2?Op=IniciarSessao&Usuario=nipapi&Senha=cdrapi3.1'
  

  useEffect(() => {
    setClient([])
  }, [])

  async function startSession() {
    const { data } = await axios.get(urlStartSessao)
    const responseJson = new XMLParser().parseFromString(data)
    setIdSessao(responseJson.children[1].value)
  }

  async function gerarLigacao() {
    const currentClient = clientRepository.findFirst()
    setClient(currentClient)
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=Discar&IdSessao=${idSessao}&Origem=7172&Destino=${client.telefone}`)
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

  async function QualificarLigacao() {
    const clientId = client.id
    clientRepository.update(clientId, statusLigacao)
  }

  return (
    <div className="App">
      <>
         <button onClick={startSession}>Iniciar Sessão</button>
         <button onClick={gerarLigacao}>Gerar Ligação</button>
         <button onClick={QualificarLigacao}>Qualificar</button>
         <button onClick={consultarLigacao}>Consultar Ligação</button>
         <button onClick={ChecarConnectedId}>Checar Status Ramal</button>
      </>
      <h3>ID da Sessão: {idSessao}</h3>
      <h3>Status da liga: {statusLigacao}</h3>
      <h3>ID da Ligação: {idLigacao}</h3>
      <h3>ID do Cliente: {client.id}</h3>
      <h3>Nome do Cliente: {client.nome}</h3>
      <h3>Endereço: {client.endereco}</h3>
      <h3>Telefone: {client.telefone}</h3>
    </div>
  );
}

export default App;
