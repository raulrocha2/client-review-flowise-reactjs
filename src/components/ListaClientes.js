
import React, { useEffect, useState}  from 'react'
import { ClientRepository } from '../repository/clientRepository'

function ListarClientes() {
  const [clients, setClients] = useState([])

  const clientRepository = new ClientRepository()

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
    <div>
      <table className="styled-table">
        <thead>
            <tr>
              <th></th>
              <th>NOME</th>
              <th>QUALIFICADO</th>
              <th>DESCRIÇÂO</th>
            </tr>
        </thead>

        <tbody>
        {clients.map(client => (
          <tr key={client.id}>
            <td></td>
            <td>{client.nome}</td>
            <td>{client.qualificado ? 'Sim' : 'Não'}</td>
            <td>{client.descricao}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export { ListarClientes } 