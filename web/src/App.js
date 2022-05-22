import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from './components/Header';
import Footer from './components/Footer';


import Routes from './routes';

import history from './services/history';
import store from './store/index';

import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module'


ReactGA.initialize('UA-196401335-1');
TagManager.initialize({gtmId: 'GTM-KGSTXM6'})

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
       
        <Routes />
        
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
