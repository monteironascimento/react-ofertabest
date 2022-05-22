import React, {useState, useEffect} from 'react';
import { isEmpty } from '../../tools/Empty'
import { ProductList, LoadingIcon, Container, ProductItem , ProdutoColum} from './styles';
import { useHistory } from 'react-router-dom';
import { getCategorias } from '../../services/controller/CategoriaControllerApi';

export default function Categorias () {

  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loading, setLoading] = useState(false);
  
  useEffect (() => {
    async function loadCategorias(){
      setLoading(true);

      if(page === 1){
        setTotalPage(1)
        setCategorias([])
      }

      try {

        const response = await getCategorias(page); 

        if(isEmpty(response)){
          setTotalPage(page -1)
          setLoading(false);
          return;

        }else{
          
          const data = response.map(categoria => ({
            ...categoria,
            
          }));

          const obj = [...categorias, ...data]
          setCategorias(obj);
          setTotalPage(page +1)
        }

      } catch (error) {
          //setProducts([...products]);
      }
      setLoading(false);
    }
    loadCategorias();

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

  function handleClickOferta(uid) {
    history.push(`/categoria/${uid}`);
  };

    if (loading && page === 1) {
      return (
        <Container>
          <strong>Carregando</strong>
          <LoadingIcon size={22} color="#FFF" />
        </Container>
      );
    }

    return (
      <>
       <ProductList length={categorias.length} >
          
          {categorias.map(categoria => (

            <ProductItem key={categoria.uidCategoria} onClick={() => handleClickOferta(categoria.uidCategoria)}>

              <ProdutoColum descktop='12' mobile='12'>
                <strong>{categoria.descricao}</strong>   
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
