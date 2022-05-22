import React, {useState, useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { MdLocalOffer, MdAddShoppingCart, MdShare } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import { isEmpty } from '../../tools/Empty'
import { ContainerGrid, ProductList, LoadingIcon, Container, ProductItem , ProdutoColum} from './styles';
import { getOfertasRecentes } from '../../services/controller/OfertaControllerApi'
import { useHistory } from 'react-router-dom';
import { retornaTempoPostagem } from '../../tools/Time';
import { dataExtenso } from '../../tools/Date';

export default function Recentes (props) {

  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loading, setLoading] = useState(false);
  
  const updating = useSelector(state => state.updating);


  useEffect (() => {
    async function loadProducts(){
      setLoading(true);

      if(page === 1){
        setTotalPage(1)
        setProducts([])
      }

      try {

        const response = await getOfertasRecentes(page, null, null); 

        if(isEmpty(response)){
          setTotalPage(page -1)
          setLoading(false);
          return;

        }else{
          
          const data = response.map(product => ({
            ...product,
            priceFormFormatted: formatPrice(product.precoForm),
            priceFormatted: formatPrice(product.preco),
          }));

          // eslint-disable-next-line
          const obj = [...products, ...data]
          setProducts(obj);
          setTotalPage(page +1)
        }

      } catch (error) {
          //setProducts([...products]);
      }
      setLoading(false);
    }
    loadProducts();
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

  function handleClick(link) {
    window.open(link, '_blank');
  };

  function handleClickOferta(short) {
    history.push(`/oferta/${short}`);
  };

  function handleCompartilhar(short, name){
    window.open(`whatsapp://send?text=Acabei de encontrar ${name} na ofertabest, e lembrei de você. https://ofertabest.com/lk/${short}`, '_blank');
  }

    if (loading && page === 1) {
      return (
        <Container>
          <strong>Carregando</strong>
          <LoadingIcon size={22} color="#FFF" />
        </Container>
      );
    }

    return (
      
       <ProductList length={products.length} >
          
          {products.map(product => (

            <ProductItem key={product.uidOferta} onClick={() => handleClickOferta(product.linkshort)}>

              <ProdutoColum descktop='12' mobile='12'>
                Publicado há {retornaTempoPostagem(product.created_at)}
              </ProdutoColum>
              <ProdutoColum descktop='2' mobile='3'>
                <LazyLoadImage
                  alt={`Indisponível`}
                  effect="blur"
                  src={product.thumbnail}
                />
              </ProdutoColum>
              <ProdutoColum descktop='10' mobile='9'>
                <ContainerGrid>
                  <ProdutoColum descktop='11' mobile='10'>
                      <strong>{product.nome}</strong>
                     
                  </ProdutoColum>
                  {
                        (window.innerWidth >= 960) ? (<ProdutoColum descktop='11' mobile='10'><p>{product.descricao.replaceAll('<br>', ' ' ) }</p></ProdutoColum>) : ''
                  }
                  {
                       isEmpty(product.dsCupon) ?
                          <ProdutoColum descktop='1' mobile='2'>
                            <LazyLoadImage
                              alt={product.descricaoloja}
                              effect="blur"
                              src={product.thumbnailloja}
                            />
                          </ProdutoColum>
                       : ''
                  }
                </ContainerGrid>
                <ContainerGrid>
                <ProdutoColum descktop='9' mobile='12'>
                <strong>{(!isEmpty(product.dtFim) ? `Validade até ${dataExtenso(new Date(product.dtFim))}` : '')}</strong>
                  </ProdutoColum>
                  <ProdutoColum descktop='9' mobile='12'>
                    {
                       !isEmpty(product.dsCupon) ?
                       <strong>Código: {product.dsCupon}</strong>
                       : ''
                    }
                   
                    {
                       isEmpty(product.dsCupon) ?
                       ( product.priceFormatted !== product.priceFormFormatted ? <span className="priceForm">De {product.priceFormatted}  </span> : '')
                       
                       : ''
                    }
                    {
                       isEmpty(product.dsCupon) ?
                       ( product.priceFormatted !== product.priceFormFormatted ? <span>Por {product.priceFormFormatted}  </span> : <span>Por {product.priceFormatted}  </span> )
                       
                       : ''
                    }
                  </ProdutoColum>
                  <ProdutoColum descktop='2' mobile='10'>
                    <button
                        type="button"
                        onClick={() => handleClick(product.link)}
                      >
                        <div>
                          {updating.uidOferta === product.uidOferta && updating.status ? (
                            <LoadingIcon size={16} color="#FFF" />
                          ) : 
                              !isEmpty(product.dsCupon) ? 
                                <MdLocalOffer size={16} color="#FFF" />
                              : 
                                <MdAddShoppingCart size={16} color="#FFF" />
                          }
                        </div>
                        <span>
                          { isEmpty(product.dsCupon) ? 'Resgatar Oferta': 'Resgatar Cupon'}
                        </span>
                      </button>
                  </ProdutoColum>
                  <ProdutoColum descktop='1' mobile='2'>
                     <button
                        type="button"
                        onClick={() => handleCompartilhar(product.linkshort, product.nome)}
                      >
                        <div>
                          <MdShare size={16} color="#FFF" />
                        </div>
                      
                      </button>
                  </ProdutoColum>
                </ContainerGrid>
              </ProdutoColum>
             
            </ProductItem>
          ))}
          {(
          (loading && page > 1 ? 
            <Container>
              <strong>Carregando</strong>
              <LoadingIcon size={22} color="#FFF" />
            </Container>  
            : '' ) 
        )}
        
        </ProductList>
      
    );
  }
