import React, { useState } from "react";
import api from '../../services/api';

export default function CadManual({ history }) {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    async function processaSubmit (event) {
        event.preventDefault();
        
        const response =  await api.post('/users', {
            nome: nome,
            telefone: telefone,
            email: email,
            senha: senha,
        })
    
        const _id  = response.data._id;
        localStorage.setItem('user', _id);
        console.log(_id);

        // history.push('/check');
    }

    return (
        <>  
            <p className="big">Faça o cadastro <strong>manualmente</strong> preenchendo o formulário abaixo.</p>

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

            <button className="btn" type="Submit">Fazer cadastro manual</button>

            </form>

            <p className="little"></p>
            <p className="little">Já tem cadastro mas não lembre a senha? Clique bem <strong>aqui</strong>.</p>

        </>
    )
}