import React, {useState, useEffect} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { MdLocalOffer, MdAddShoppingCart, MdShare } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import { isEmpty } from '../../tools/Empty'
import { ContainerGrid, ProductList, LoadingIcon, Container, ProductItem , ProdutoColum} from './styles';
import { getOfertas } from '../../services/controller/OfertaControllerApi'
import { useHistory } from 'react-router-dom';
import { retornaTempoPostagem } from '../../tools/Time';
import { dataExtenso } from '../../tools/Date';

export default function Oferta () {

  const history = useHistory();

  let variavel = history.location.pathname.replace('/promo/','').replace('/lk/','').replace('/oferta/','');;
  if(isEmpty(variavel)){
    history.push(`/`);  
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const updating = useSelector(state => state.updating);

  useEffect (() => {
    async function loadProducts(){

      setLoading(true);
      try {

        const response = await getOfertas(variavel); 

        const data = response.map(product => ({
            ...product,
            priceFormFormatted: formatPrice(product.precoForm),
            priceFormatted: formatPrice(product.preco),
          }));

          // eslint-disable-next-line
          setProducts(data); 
        
      } catch (error) {
          //setProducts([...products]);
      }
      setLoading(false);
    }
    if(isEmpty(products)){
      loadProducts();
    }
    
    
  });

  function handleCompartilhar(short, name){
    window.open(`whatsapp://send?text=Acabei de encontrar ${name} na ofertabest, e lembrei de você. https://ofertabest.com/lk/${short}`, '_blank');
  }


  function handleClick(link) {
    window.open(link, '_blank');
  };

    if (loading ) {
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

           <ProductItem key={product.uidOferta}>

             <ProdutoColum descktop='11' mobile='10'>
               Publicado há {retornaTempoPostagem(product.created_at)}
             </ProdutoColum>
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

             <ProdutoColum descktop='3' mobile='12'>
               <LazyLoadImage
                 alt={`Indisponível`}
                 effect="blur"
                 src={product.thumbnail}
               />
             </ProdutoColum>
             <ProdutoColum descktop='9' mobile='12'>


                <ContainerGrid>
                <ProdutoColum descktop='12' mobile='12'>
                     <strong>{product.nome}</strong>
                    
                 </ProdutoColum>
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
                 <ProdutoColum descktop='11' mobile='10'>
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

               <ContainerGrid>
                 <ProdutoColum descktop='12' mobile='10'>
                    {product.descricao.replaceAll('<br>', ' ' ) }
                 </ProdutoColum>
                 
               </ContainerGrid>

               
               
             </ProdutoColum>
            
           </ProductItem>
         ))}
        
       
       </ProductList>
    
    );
  }
