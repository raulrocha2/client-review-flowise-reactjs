import React, { useState } from 'react'
import { FlowiseAPI } from '../flowise/flowiseApi';
import { env } from '../env';

function Home() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')


const flowiseApi = new FlowiseAPI(env.URL_FLOWISE)

const handleSubmit = () => {
  flowiseApi.getAnswer({"question": `${question}`}).then((response) => {
    const {answer} = response.json
    setAnswer(answer)
  });
}
console.log(env.URL_FLOWISE);

  return (
    <div className="App">
        <div className='container'>
        <div className='details'>
        <div>
              <label>
                What do you think of us:
                <input 
                  type="text" 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                />
              </label>
            </div>
          <div className='control'>
            <button className='button' onClick={handleSubmit}>Submit</button>
          </div>
          <h3>Answer: {answer}</h3>
          </div>
        </div>
    </div>
  );
}

export { Home }
