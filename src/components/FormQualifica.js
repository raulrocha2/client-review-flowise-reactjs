
import React, { useContext, useState } from 'react'
import { ClientRepository } from '../repository/clientRepository'
import Context from '../contexts/form-context'
import axios from 'axios'
import XMLParser from 'react-xml-parser'

function FormQualifica() {
  const [descricao, setDescricao] = useState('')

  const clientRepository = new ClientRepository()
  const { idSessao, idLigacao, client}  = useContext(Context)

  async function consultarLigacao(idSessao, idLigacao) {
    const { data } = await axios.get(`/cgi-bin/nip-api2?Op=ConsultarLigacao&IdSessao=${idSessao}&IdLigacao=${idLigacao}`)
    const responseJson = new XMLParser().parseFromString(data)
    return responseJson.children[1].value
  }


  async function QualificarLigacao() {
    const statusLigacao = await consultarLigacao(idSessao, idLigacao)
    const clientId = client.id
    clientRepository.update(clientId, statusLigacao, descricao)
  }

  return (
    <div>
      <h2>Qualificar Cliente</h2>
      <textarea id="textarea" name="textarea" rows="4" cols="50" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
      <br/>
      <button onClick={QualificarLigacao}>Qualificar</button>
     
    </div>
  )
}

export { FormQualifica } 