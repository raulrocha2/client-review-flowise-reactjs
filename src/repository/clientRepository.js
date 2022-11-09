
import axios from 'axios'

export class ClientRepository {

  async findFirst() {
    const { data } = await axios.get('http://localhost:5000/clients')
    const client = data.find(client => client.qualificado === false && client.tentativas_contato === 0)
    return client
  }

  async findSecond() {
    const { data } = await axios.get('http://localhost:5000/clients')
    const client = data.find(client => (
      client.qualificado === false && client.tentativas_contato <= 3)
      )
    return client
  }

  async update(clientId, statusLigacao, descricao, qualificado, tentativas_contato, intersse) {
    return await axios.patch(`http://localhost:5000/clients/${clientId}`, 
    {
      "status": statusLigacao,
      descricao,
      qualificado,
      tentativas_contato,
      intersse
    }
    )
  }

  async findAll() {
    const { data } = await axios.get('http://localhost:5000/clients')
    return data
  }
}
