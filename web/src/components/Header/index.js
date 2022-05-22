import React, { useState, useRef, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import { Container, Button, Form, Input, ContainerGrid, ProdutoColum, ColumnSocialMidiaDescktop} from './styles';
import { MdSearch } from 'react-icons/md';
import logo from '../../assets/images/logo_header.webp';
import { SocialIcon } from 'react-social-icons';
import { ScrollCategorias } from '../ScrollCategorias';
import googleAnalistics from "../../tools/GoogleAnalytics";
export default function Header() {

  const history = useHistory();
 
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();

  const [analitcs, setAnalitcs] = useState(false);
  useEffect (() => {
    async function gerarAnalitics(){
      if(!analitcs){
        setAnalitcs(true)
        googleAnalistics(history);
        await sleep(2000);
        setAnalitcs(false)
      }
    }
    gerarAnalitics();
  })

  async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 

  const onFormSubmit = e => {
    // When form submited, clear input, close the searchbar and do something with input
    //history.push({
    //    pathname: `/search/${input}`,
    //    state: { input: input }
    // });
    redir(input)
    e.preventDefault();
    setInput("");
    setBarOpened(false);
    
    return;
  };

  async function redir(input){
    window.open(`http://${window.location.hostname === 'localhost' ? 'localhost:3100' : window.location.hostname}/search/${input}`, "_self");
  }

  function handleRouter(route) {
    history.push(route);
  };

  function handleHome(route) {
    window.open(`http://${window.location.hostname === 'localhost' ? 'localhost:3100' : window.location.hostname}/`, "_self");
  };

  function handleWatsApp(short, name){
    window.open(`https://chat.whatsapp.com/Kxra4l33KhZ0ITbLCzjiwj`, '_blank');
  }

  function handleTelegram(short, name){
    window.open(`https://t.me/ofertabesttt`, '_blank');
  }

  function handleInstagram(short, name){
    window.open(`https://instagram.com/ofertabestt`, '_blank');
  }

  function handleYoutube(short, name){
    window.open(`https://www.youtube.com/channel/UClZ1tR_a75hcp73hSDrJofg`, '_blank');
  }

  function handleFacboock(short, name){
    window.open(`https://www.facebook.com/ofertabestt`, '_blank');
  }
 
  return (
    
    <>
    <Container>
      {
        window.innerWidth <= 768 ? (

          !barOpened && (
            <>  
              <ColumnSocialMidiaDescktop target="_blanck">
                <button type="button" onClick={() => handleHome()}>
                  <img src={logo} alt="OfertaBest" className="imgOfertabest"/>
                </button>
               
              </ColumnSocialMidiaDescktop> 
            </>  
          )
        ) : 
        (
          <>  
            <ColumnSocialMidiaDescktop target="_blanck">
              <button type="button" onClick={() => handleHome()}>
                  <img src={logo} alt="OfertaBest"  className="imgOfertabest"/>
              </button>
              <button type="button" onClick={() => handleWatsApp()}>
                  <SocialIcon network="whatsapp" bgColor="#0000" fgColor="white" style={{ height: 40, width: 40 }} />
              </button>
              <button type="button" onClick={() => handleTelegram()}>
                  <SocialIcon network="telegram" bgColor="#0000" fgColor="white" style={{ height: 40, width: 40 }} />
              </button>
              <button type="button" onClick={() => handleInstagram()}>
                  <SocialIcon network="instagram" bgColor="#0000" fgColor="white" style={{ height: 40, width: 40 }} />
              </button>
              <button type="button" onClick={() => handleYoutube()}>
                    <SocialIcon network="youtube" bgColor="#0000" fgColor="white" style={{ height: 40, width: 40 }} />
                </button>
                <button type="button" onClick={() => handleFacboock()}>
                    <SocialIcon network="facebook" bgColor="#0000" fgColor="white" style={{ height: 40, width: 40 }} />
                </button>
            </ColumnSocialMidiaDescktop> 
          </>  
          
        )
      }
    
      <Form
        barOpened={barOpened}
        onClick={() => {
          // When form clicked, set state of baropened to true and focus the input
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        // on focus open search bar
        onFocus={() => {
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        // on blur close search bar
        onBlur={() => {
         
          setBarOpened(false);
        }}
        // On submit, call the onFormSubmit function
        onSubmit={onFormSubmit}
        
        ref={formRef}
      >
        <Button type="submit" barOpened={barOpened}>
          <MdSearch size={24} color="#FFF" />
        </Button>
        <Input
          onChange={e => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          barOpened={barOpened}
          placeholder="Encontre sua oferta!"
        />
      </Form>

    </Container>
    
    {
        window.innerWidth <= 768 ? (

          !barOpened && (
              <>
                <Container>
                  <ContainerGrid>
                    <ProdutoColum descktop='12' mobile='12'>
                      <button className="btnRoutes"
                          type="button"
                            onClick={() => handleRouter('/destaques')}
                        >
                          <span>
                            Destaques
                          </span>     
                      </button>
                  
                      <button className="btnRoutes"
                          type="button"
                            onClick={() => handleRouter('/recentes')}
                        >
                          <span>
                            Recentes
                          </span>     
                      </button>
                  
                      <button className="btnRoutes"
                          type="button"
                            onClick={() => handleRouter('/cupons')}
                        >
                          <span>
                            Cupons
                          </span>     
                      </button>
                      

                    </ProdutoColum>
                  </ContainerGrid>
          
              </Container> 
              <ScrollCategorias/>
              </>
          )
        ) : 
        (
          <>
            <Container>
                <ContainerGrid >
                  <ProdutoColum descktop='12' mobile='12'>
                    <button className="btnRoutes"
                        type="button"
                          onClick={() => handleRouter('/destaques')}
                      >
                        <span>
                          Destaques
                        </span>     
                    </button>
                
                    <button className="btnRoutes"
                        type="button"
                          onClick={() => handleRouter('/recentes')}
                      >
                        <span>
                          Recentes
                        </span>     
                    </button>
                
                    <button className="btnRoutes"
                        type="button"
                          onClick={() => handleRouter('/cupons')}
                      >
                        <span>
                          Cupons
                        </span>     
                    </button>
                
                    <button className="btnRoutes"
                        type="button"
                          onClick={() => handleRouter('/lojas')}
                      >
                        <span>
                          Lojas
                        </span>     
                    </button>
                              
                  </ProdutoColum>
                </ContainerGrid>
        
            </Container>
            <ScrollCategorias />
          </>
        )
      }

     
    
    </>
  );
}


/*
      <Cart to="/cart">
        <div>
          <strong>Favoritos</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdFavorite size={36} color="#FFF" />
      </Cart>

      
      */