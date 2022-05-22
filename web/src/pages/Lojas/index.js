import React, {useState, useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { isEmpty } from '../../tools/Empty'
import { ProductList, LoadingIcon, Container, ProductItem , ProdutoColum} from './styles';
import { getLojas } from '../../services/controller/LojaControllerApi'
import { useHistory } from 'react-router-dom';

export default function Lojas () {

  const history = useHistory();
  const [lojas, setLojas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loading, setLoading] = useState(false);


  useEffect (() => {
    async function loadLojas(){
      setLoading(true);

      if(page === 1){
        setTotalPage(1)
        setLojas([])
      }

      try {

        const response = await getLojas(page); 

        if(isEmpty(response)){
          setTotalPage(page -1)
          setLoading(false);
          return;

        }else{
          
          const data = response.map(loja => ({
            ...loja,
          }));

          const obj = [...lojas, ...data]
          setLojas(obj);
          setTotalPage(page +1)
        }

      } catch (error) {
          
      }
      setLoading(false);
    }
    loadLojas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    
  });

  function handleScroll(){
   
    if(window.innerHeight + document.documentElement.scrollTop < 
        document.documentElement.offsetHeight || page > totalPage || loading){
          
          return;
        }
    setPage(page + 1)
  }

  function handleClickLoja(descricao) {
    //history.push(`/loja/${uidLoja}`);
    history.push(`/loja-recente?${descricao}`);
    
  };

    if (loading && page === 1) {
      return (
        <Container>
          <strong>Carregando</strong>
          <LoadingIcon size={22} color="#FFF" />
        </Container>
      );
    }
    //handleClickLoja(loja.uidLoja)}>

    return (
      <>
       <ProductList length={lojas.length} >
          
          {lojas.map(loja => (

            <ProductItem key={lojas.uidLoja} onClick={() => handleClickLoja(loja.descricaoloja)}> 
              <ProdutoColum descktop='12' mobile='12'>
                <LazyLoadImage
                  alt={`Indisponível`}
                  effect="blur"
                  src={loja.thumbnail}
                />
              </ProdutoColum>
             
            </ProductItem>
          ))}
          
        
        </ProductList>
      {(
        (loading && page > 1 ? 
          <Container>
            <strong>Carregando</strong>
            <LoadingIcon size={22} color="#FFF" />
          </Container>  
          : '' ) 
      )}
      </>
    );
  }


  /* <ProdutoColum descktop='6' mobile='8'>
                <strong>{loja.descricao}</strong>
              </ProdutoColum>

              */