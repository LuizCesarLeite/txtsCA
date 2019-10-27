import React, { useState } from 'react';
import api from './services/api';
import './App.css';
import logotipo from './assets/logotipo.png';

function App() {
  const [nome, setNome] = useState('');
  const [ra, setRa] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function processaSubmit (event) {
    event.preventDefault();
    
    const response =  await api.post('/users', {
      nome: nome,
      ra: ra,
      telefone: telefone,
      email: email,
      senha: senha,
    })

    console.log(response)
  }

  return (
    <div className="contenedor">

      <img src={logotipo} alt="Um logotipo qualquer" />

      <div className="conteudo">
        <p className="big">Bem vindes ao <strong>Sistema de Textos CAPed</strong>. <br />Faça seu cadastro para aproveitar o nosso <strong>acervo</strong>.</p>

        <button className="btn" type="Submit">Usar login do Facebook</button>

        <p className="big"></p>
        <p className="big">Ou faça o cadastro <strong>manualmente</strong> preenchendo o formulário abaixo.</p>

        <form onSubmit={processaSubmit}>

          <label htmlFor="Nome">Nome</label>
          <input 
            type="txt" 
            id="nome" 
            placeholder="Nome e sobrenome, pfvr"
            value={nome}
            onChange={event => setNome(event.target.value)}
          >
          </input>

          <label htmlFor="Ra">RA</label>
          <input 
            type="txt" 
            id="ra" 
            placeholder="Seu RA"
            value={ra}
            onChange={event => setRa(event.target.value)}
          >
          </input>

          <label htmlFor="telefone">Telefone</label>
          <input 
            type="tnumber" 
            id="telefone" 
            placeholder="Podemos precisar ;-)"
            value={telefone}
            onChange={event => setTelefone(event.target.value)}
          >
          </input>

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Digite seu melhor email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          >
          </input>

          <label htmlFor="senha">Senha</label>
          <input 
            type="password" 
            id="senha" 
            placeholder="Digite uma senha bacana"
            value={senha}
            onChange={event => setSenha(event.target.value)}
          >
          </input>

          <p className="little">&nbsp;</p>

          <button className="btn" type="Submit">Fazer meu cadastro</button>

        </form>

        <p className="little"></p>
        <p className="little">Já tem cadastro mas não lembre a senha? Clique bem <strong>aqui</strong>.</p>

      </div>
        
    </div>
  );
}

export default App;
