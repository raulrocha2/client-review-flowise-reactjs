
import axios from 'axios'

export class ClientRepository {

  async findFirst() {
    const { data } = await axios.get('http://localhost:5000/clients')
    const client = data.find(client => client.qualificado === false)
    return client
  }

  async update(clientId, statusLigacao, descricao) {
    return await axios.patch(`http://localhost:5000/clients/${clientId}`, 
    {
      "status": statusLigacao,
      "qualificado": true,
      descricao
    }
    )
  }
}
