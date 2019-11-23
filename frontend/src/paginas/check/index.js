import React, { useState } from "react";
import api from '../../services/api';

export default function Check({ history }) {
    
    const [token, setToken] = useState('');

    async function confirmationPost (event) {
        event.preventDefault();
        
        const response =  await api.post('/confirma', {
            token: token.trim(),
        })
    
        const nToken  = response.data.token;
        console.log(nToken);
        console.log('Funfaaaaa');

        // history.push('/perfil');
    }

    return (
        <>  
            <p className="big">Coloque o token <strong>que você recebeu via email</strong> no campo abaixo abaixo.</p>

            <form onSubmit={confirmationPost}>

                <input 
                type="txt" 
                id="token" 
                placeholder="Coloque o token de verficação aqui, pfvr..."
                value={token}
                onChange={event => setToken(event.target.value)}
            >
            </input>

            <p className="little">&nbsp;</p>

            <button className="btn" type="Submit">Verificar token</button>

            </form>

            <p className="little"></p>
            <p className="little">Precisa receber outro token de verificação? Clique bem <strong>aqui</strong>.</p>

        </>
    )
}