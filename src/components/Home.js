import React, { useState } from 'react'
import { FlowiseAPI } from '../flowise/flowiseApi';
import { env } from '../env';

function Home() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

const flowiseApi = new FlowiseAPI(env.URL_FLOWISE)

const handleSubmit = () => {
  if (!question) {
    alert("Please enter your opinion about the service.");
    return;
  }

  setLoading(true)
  console.log(loading);
  flowiseApi.getAnswer({"question": `${question}`}).then((response) => {
    const {answer} = response.json
    setAnswer(answer)
    setLoading(false);

  });
}

  return (
    <div className="App">
        <div className='container'>
          <div className='details'>
            <label className='label'>
             What's your opinion about our service?
            </label>
              <input 
              className='input'
                type="text" 
                value={question} 
                placeholder="Enter your feedback here"
                onChange={(e) => setQuestion(e.target.value)} 
              />
              <div className='flex-container '>
                <button 
                  disabled={loading}
                  className='button' 
                  onClick={handleSubmit}
                >
                {loading ? "Sending..." : "Submit"}
                </button>
              </div>
              <textarea
                className='textArea'
                value={answer}
                readOnly
                placeholder="The response will appear here"
              />
            </div>
        </div>
    </div>
  );
}

export { Home }
