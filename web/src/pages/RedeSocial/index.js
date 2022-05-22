import React, { useState, useEffect} from 'react';
import { ContainerImagem, Container, LoadingIcon } from './styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logoSocialTikTok from '../../assets/images/bannerTikTok.webp';
import logoSocialWhatsApp from '../../assets/images/bannerWhatsapp.webp';
import logoSocialTelegram from '../../assets/images/bannerTelegram.webp';
import logoSocialInstagram from '../../assets/images/bannerInstagram.webp';
import logoSocialFacboock from '../../assets/images/bannerFacboock.webp';
import logoSocialYoutube from '../../assets/images/bannerYoutube.webp';


export default function RedeSocial () {

  const [loading, setLoading] = useState(false);

  useEffect (() => {
    
    async function loadingImagens(){

      if(!loading){
        setLoading(true);
        //await sleep(200);
        setLoading(false);
      }

    }

    loadingImagens();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
});

/*
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} */

  function handleTikTok(short, name){
    window.open(`https://vm.tiktok.com/ZMdCstLgV/`, '_blank');
  }

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

      { 
        loading ?
        <Container>
          <strong>Carregando</strong>
          <LoadingIcon size={22} color="#FFF" />
        </Container>
        : 
        <>
         
          <ContainerImagem>
              <h1>Redes Socias</h1>             
          </ContainerImagem> 

          
          <ContainerImagem>
              <button
                type="button"
                  onClick={() => handleTikTok()}
              >
                <LazyLoadImage className="imagemLoad"
                  alt={`Instagram`}
                  effect="blur"
                  delayTime={300} 
                  src={logoSocialTikTok}
                />    
                          
              </button>             
          </ContainerImagem> 
          <ContainerImagem>
              <button
                type="button"
                  onClick={() => handleInstagram()}
              >
                <LazyLoadImage className="imagemLoad"
                  alt={`Instagram`}
                  effect="blur"
                  delayTime={300} 
                  src={logoSocialInstagram}
                />    
                          
              </button>             
          </ContainerImagem> 
          <ContainerImagem>
              <button
                type="button"
                  onClick={() => handleWatsApp()}
              >
                <LazyLoadImage className="imagemLoad"
                  alt={`WhatsApp`}
                  effect="blur"
                  delayTime={300} 
                  src={logoSocialWhatsApp}
                />    
                          
              </button>             
          </ContainerImagem> 
          <ContainerImagem>
              <button
                type="button"
                  onClick={() => handleTelegram()}
              >
                <LazyLoadImage className="imagemLoad"
                  alt={`Telegram`}
                  effect="blur"
                  delayTime={300} 
                  src={logoSocialTelegram}
                />    
                          
              </button>             
          </ContainerImagem> 
          <ContainerImagem>
              <button
                type="button"
                  onClick={() => handleYoutube()}
              >
                <LazyLoadImage className="imagemLoad"
                  alt={`Youtube`}
                  effect="blur"
                  delayTime={300} 
                  src={logoSocialYoutube}
                />    
                          
              </button>             
          </ContainerImagem>  

          <ContainerImagem>
              <button
                type="button"
                  onClick={() => handleFacboock()}
              >
                <LazyLoadImage className="imagemLoad"
                  alt={`Facboock`}
                  effect="blur"
                  delayTime={300} 
                  src={logoSocialFacboock}
                />    
                          
              </button>             
          </ContainerImagem>  
       </> 
      }

      
      </>
    );
  }
