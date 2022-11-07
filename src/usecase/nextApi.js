import axios from 'axios'
import XMLParser from 'react-xml-parser'

export class NextAPI {
  
  constructor (url, clientRepository){
    this.url = url
    this.clientRepository = clientRepository
  }
  
  async startSession() {
    const { data } = await axios.get(this.url)
    const responseJson = new XMLParser().parseFromString(data)
    return responseJson.children[1].value
  }

  async gerarLigacao(idSessao) {
    const currentClient = await this.clientRepository.findFirst()
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=Discar&IdSessao=${idSessao}&Origem=7172&Destino=${currentClient.telefone}`)
    console.log(data)
    const responseJson = new XMLParser().parseFromString(data)
    return responseJson.children[1].value
  }
  

  async consultarLigacao(idSessao, idLigacao) {
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=ConsultarLigacao&IdSessao=${idSessao}&IdLigacao=${idLigacao}`)
    const responseJson = new XMLParser().parseFromString(data)
    return responseJson.children[1].value
  }



  async checarConnectedId(idSessao) {
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=ChecarConnectedId&IdSessao=${idSessao}&Numero=9813`)
    const responseJson = new XMLParser().parseFromString(data)
    console.log('responseJson', responseJson.children[1].value);
    //setStatusLigacao(responseJson.children[1].value)
  }

}