
import React, { useContext, useState } from 'react'
import { ClientRepository } from '../repository/clientRepository'
import Context from '../contexts/form-context'
import { NextAPI } from '../usecase/nextApi'

function FormQualifica() {
  const [descricao, setDescricao] = useState('')
  const [qualificado, setQualificado] = useState(false)
  const [contatar_novamente, setContatar_novamente] = useState(false)
  const [intersse, setIntersse] = useState(false)

  const urlStartSessao = '/cgi-bin/nip-api2?Op=IniciarSessao&Usuario=nipapi&Senha=cdrapi3.1'
  const clientRepository = new ClientRepository()
  const nextAPI = new NextAPI(urlStartSessao, clientRepository)

  const { idSessao, idLigacao, client}  = useContext(Context)

  async function QualificarLigacao() {
    const statusLigacao = await nextAPI.consultarLigacao(idSessao, idLigacao)
    const clientId = client.id
    let tentativas_contato = 0
    if (contatar_novamente) {
      tentativas_contato = client.tentativas_contato + 1
    } else {
      tentativas_contato = client.tentativas_contato
    }
    clientRepository.update(
      clientId, 
      statusLigacao, 
      descricao, 
      qualificado, 
      tentativas_contato,
      intersse
      )
  }

  return (
    <div className='form-qa'>
      <h2>Qualificar Cliente</h2>
      <textarea 
        id="textarea" 
        name="textarea" 
        rows="5" 
        cols="40" 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)}
      ></textarea>
      <label>
        <input 
          type="checkbox" 
          id="input1" 
          name="input1" 
          checked={qualificado}
          onChange={(e) => setQualificado(e.target.checked)}
          /> Qualificar 
      </label>
      <label>
        <input 
          type="checkbox" 
          id="input2" 
          name="input2" 
          checked={intersse}
          onChange={(e) => setIntersse(e.target.checked)}
          /> Tem interesse
      </label>
      <label>
        <input 
          type="checkbox" 
          id="input4" 
          name="input4" 
          checked={contatar_novamente}
          onChange={(e) => setContatar_novamente(e.target.checked)}
          /> Não Atende
      </label>
      <label>
        <input 
          type="checkbox" 
          id="input5" 
          name="input5" 
          checked={contatar_novamente}
          onChange={(e) => setContatar_novamente(e.target.checked)}
          /> Contatar Novamente 
      </label>
        <br />
        <br />
      <button onClick={QualificarLigacao}>Finalizar ligação</button>     
    </div>
  )
}

export { FormQualifica } 