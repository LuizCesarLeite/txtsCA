import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './paginas/home';
import Perfil from './paginas/perfil';
import Pesquisa from './paginas/pesquisa';

export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component={Home}/>
                <Route path= "/perfil" component={Perfil}/>
                <Route path= "/pesquisa" component={Pesquisa}/>
            </Switch>
        </BrowserRouter>
    );
}