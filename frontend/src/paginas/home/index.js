import React, { useState } from "react";
import api from '../../services/api';

import FacebookLogin from 'react-facebook-login';

export default function Home({ history }) {
    const responseFacebook = (response) => {
        console.log(response);
        console.log(response.email);
        console.log(response.name);
        console.log(response.picture.data.url);
    }
  
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

        history.push('/perfil');
    }

    return (
        <>  

            <p className="big">Bem vindes ao <strong>Sistema de Textos CAPed</strong>. Faça seu cadastro usando seu <strong>ID do Facebook</strong> para aproveitar o nosso <strong>acervo</strong>.</p>

            <FacebookLogin
            cssClass="btn"
            appId="381163456103277"
            fields="name,email,picture"
            callback={responseFacebook}
            />

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

            <button className="btn" type="Submit">Cadastro manual</button>

            </form>

            <p className="little"></p>
            <p className="little">Já tem cadastro mas não lembre a senha? Clique bem <strong>aqui</strong>.</p>

        </>
    )
}