

export class ClientRepository {

  constructor(clients) {
    this.clients = clients
  }
  
  findFirst() {
    console.log('findFirst',this.clients);
    const client = this.clients.find(client => client.qualificado === false)
    //console.log('client', client);
    return client
  }

  update(clientId, statusLigacao) {
    const clientIndex = this.clients.findIndex(client => client.id === clientId)
    this.clients[clientIndex].qualificado = true
    this.clients[clientIndex].status = statusLigacao
    //console.log('update', this.clients);
  }
}
