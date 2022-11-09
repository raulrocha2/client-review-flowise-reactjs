import React, { useState } from 'react'
import { ClientRepository } from '../repository/clientRepository'
import { FormQualifica } from './FormQualifica'
import Context from '../contexts/form-context'
import { NextAPI } from '../usecase/nextApi';
import { Link } from "react-router-dom"

function Home() {
  const [idSessao, setIdSessao] = useState('')
  const [idLigacao, setIdLigacao] = useState('')
  const [statusLigacao, setStatusLigacao] = useState('')
  const [client, setClient] = useState([])

  const urlStartSessao = '/cgi-bin/nip-api2?Op=IniciarSessao&Usuario=nipapi&Senha=cdrapi3.1'
  
  const clientRepository = new ClientRepository()
  const nextAPI = new NextAPI(urlStartSessao)

  async function startSession() {
    const result = await nextAPI.startSession()
    setIdSessao(result)
  }

  async function gerarLigacao() {
    const firstClient = await clientRepository.findFirst()
    if (!firstClient) {
      const secondClient = await clientRepository.findSecond()
      setClient(secondClient)
      const result = await nextAPI.gerarLigacao(idSessao, secondClient.telefone)
      setIdLigacao(result)
    } else {
      setClient(firstClient)
      const result = await nextAPI.gerarLigacao(idSessao, firstClient.telefone)
      setIdLigacao(result)
    }
    
  }
  
  async function consultarLigacao() {
    const result = await nextAPI.consultarLigacao(idSessao, idLigacao)
    setStatusLigacao(result)
  }

  async function ChecarConnectedId() {
    await nextAPI.checarConnectedId(idSessao)
  }

  return (
    <div className="App">
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
          <br/>
          <FormQualifica />
        </div>
        <div className='control'>
          <button className='button' onClick={gerarLigacao}>Gerar Ligação</button>
          <button className='button' onClick={consultarLigacao}>Consultar Ligação</button>
          <button className='button' onClick={ChecarConnectedId}>Checar Status Ramal</button>
          <Link className='button' to="/lista-clientes">Listar Clientes</Link>
        </div>
        
        </div>
        
      </ Context.Provider>
    </div>
  );
}

export { Home }
