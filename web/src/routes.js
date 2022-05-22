import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Recentes from './pages/Recentes';
import Oferta from './pages/Oferta';
import Search from './pages/Search';
import Destaques from './pages/Destaques';
import Cupons from './pages/Cupons';
import Lojas from './pages/Lojas';
import Categorias from './pages/Categorias';
import RecentesCategoria from './pages/RecentesCategoria';
import RecentesLoja from './pages/RecentesLoja';
import RedeSocial from './pages/RedeSocial';
import Privacidade from './pages/Privacidade';
import Termos from './pages/Termos';

export default function Routes({search}) {

  return (
    <Switch>
      <Route path="/" exact component={Destaques} forceRefresh={true}/>
      <Route path="/recentes" exact component={Recentes}/>
      <Route path="/destaques" exact component={Destaques}/>
      <Route path="/redes-sociais" exact component={RedeSocial}/>
      
      <Route path="/cupons" exact component={Cupons}/>
      <Route path="/lojas" exact component={Lojas}/>
      <Route path="/categorias" exact component={Categorias}/>

      <Route path="/promo/:short" exact component={Oferta} />
      <Route path="/oferta/:short" exact component={Oferta} />
      <Route path="/lk/:short" exact component={Oferta} />

      <Route path="/categoria/:uid" exact component={RecentesCategoria} />
      <Route path="/categoriaRecentes/:descricao" exact component={RecentesCategoria} />
      
      
      <Route path="/loja/:uid" exact component={RecentesLoja} />
      <Route path="/loja-recente/:description" exact component={RecentesLoja} />
      <Route path="/search/:description" exact component={Search} render={true} forceRefresh={true} />


      <Route path="/politica-de-privacidade" exact component={Privacidade} />
      <Route path="/termos-de-uso" exact component={Termos} />
      
    </Switch>
    
  );
}
//<Route path="/cart" component={Cart} />
//<Route path="/login/:description" exact component={Oferta} />
//<Route path="/adicionar/:description" exact component={Oferta} />