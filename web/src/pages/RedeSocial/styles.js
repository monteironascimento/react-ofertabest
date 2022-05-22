import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

export const ContainerImagem = styled.div`
  //padding-top: 0.25rem;
  //padding-bottom: 0.30rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  padding: 0.25rem;

  button {
    border-radius: 0px;
    background-color:white;
    border-radius: 10px;

    @media only screen and (min-width: 768px){
      width: 80%;
      height: auto;
    }
    
  }

  h1{
    color: white;
  }

  .imagemLoad {
    width: 100%;
    height: auto;
    border-radius: 10px;
    padding: 0.25rem;
  }
`;

export const Container = styled.div`
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  strong {
    font-size: 22px;
    color: white;
    margin-bottom: 10px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(FaSpinner)`
  animation: ${rotate} 2000ms infinite linear;
`;


