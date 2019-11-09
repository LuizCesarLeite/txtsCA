import React from "react";
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom'

export default function Home() {
    const responseFacebook = (response) => {
        console.log(response);
        console.log(response.email);
        console.log(response.name);
        console.log(response.picture.data.url);
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
            <p className="big">Ou faça o cadastro <strong>manualmente</strong> preenchendo um pequeno formulário.</p>

            <Link to="/cadmanual">
            <button className="btn" type="Submit">Cadastro manual</button>
            </Link>

            <p className="little"></p>
            <p className="little">Já tem cadastro mas não lembre a senha? Clique bem <strong>aqui</strong>.</p>

        </>
    )
}
