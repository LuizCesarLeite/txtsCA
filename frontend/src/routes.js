import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './paginas/home';
import CadManual from './paginas/cadmanual';
import Perfil from './paginas/perfil';
import Pesquisa from './paginas/pesquisa';
import Confirma from './paginas/confirma';
import Check from './paginas/check';

export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component={Home}/>
                <Route path= "/cadmanual" component={CadManual}/>
                <Route path= "/perfil" component={Perfil}/>
                <Route path= "/pesquisa" component={Pesquisa}/>
                <Route path= "/confirma" component={Confirma}/>
                <Route path= "/check" component={Check}/>
            </Switch>
        </BrowserRouter>
    );
}