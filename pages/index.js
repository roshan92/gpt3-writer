import Head from 'next/head';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Smart-IFA Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Smart-IFA Writer</h1>
          </div>
          <div className="header-subtitle">
            <h2>input your fact find below, we'll generate your email</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            className="prompt-box"
            placeholder="
              James - 45,
              Wife: Kathy - 43,
              
              2 kids
              • Max - 7,
              • Rob - 5,

              Property:
              
              Main residence - £850K,
              Mortgage - £350K,
              15 year term

              Interest rate -
                2.3%,
              Monthly repayment
              - £1,600 p/m
            "
            value={userInput}
            onChange={onUserChangedText} 
          />
          <div className="prompt-buttons">
              <a
                className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}
              >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Email</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>&#9889; build by roshan & alan</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
