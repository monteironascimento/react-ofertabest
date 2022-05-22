import React from "react";
import { Container, ColumnSocialMidiaDescktop, ContainerGrid, ProdutoColum, ContainerTop } from './styles';
import { SocialIcon } from 'react-social-icons';
import { useHistory} from 'react-router-dom';

export default function Footer() {

  const history = useHistory();

  function handleRouter(path){
    history.push(path);
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
      <ContainerTop>
        <Container>
          <ContainerGrid>
            <ProdutoColum descktop='12' mobile='12'>
              <ColumnSocialMidiaDescktop target="_blanck">
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
            </ProdutoColum>
          </ContainerGrid>
        </Container>

          <Container>
                  <ContainerGrid>
                    <ProdutoColum descktop='12' mobile='12'>
                      <button className="btnRoutes"
                          type="button"
                            onClick={() => handleRouter('/termos-de-uso')}
                        >
                          <span>
                            Termos de Serviço
                          </span>     
                      </button>
                  
                      <button className="btnRoutes"
                          type="button"
                            onClick={() => handleRouter('/politica-de-privacidade')}
                        >
                          <span>
                            Política de Privacidade
                          </span>     
                      </button>
                  
                      
                    </ProdutoColum>
                    <ProdutoColum descktop='12' mobile='12'>
                      
                          <span>
                            Todos direitos reservados para ofertabest.com
                          </span>     
                     
                    </ProdutoColum>
                  </ContainerGrid>
          
              </Container> 
        </ContainerTop>
    </>        
  );
}
