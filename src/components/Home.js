import React, { useEffect, useState } from 'react'
import { ClientRepository } from '../repository/clientRepository'
import { FormQualifica } from './FormQualifica'
import Context from '../contexts/form-context'
import { NextAPI } from '../usecase/nextApi';
import { Header } from './Header';


function Home() {
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
      <Context.Provider value={{ idSessao, idLigacao, statusLigacao, client, clients }}>

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
         <button onClick={gerarLigacao}>Gerar Ligação</button>
         <button onClick={consultarLigacao}>Consultar Ligação</button>
         <button onClick={ChecarConnectedId}>Checar Status Ramal</button>
         <button onClick={ListarClientes}>Listar Clientes </button>
        </div>
        <table>
          <thead>
              <tr>
                  <th>NOME</th>
                  <th>QUALIFICADO</th>
                  <th></th>
              </tr>
          </thead>

          <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.nome}</td>
              <td>{client.qualificado ? 'true' : 'false'}</td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
        
      </ Context.Provider>
    </div>
  );
}

export { Home }
