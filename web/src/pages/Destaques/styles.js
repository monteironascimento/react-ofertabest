import styled, { keyframes, css } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { darken } from 'polished';

//.color1 {color: #120907;}
//.color2 {color: #12243e;}
//.color3 {color: #155e90;}
//.color4 {color: #209fd8;}
//.color5 {color: #20dad8;}

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

export const ProductList = styled.ul`
  
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  list-style: none;
  ${props => {
    let styles = '';
    for (let i = 0; i < props.length; i += 1) {
      styles += `
        li:nth-child(${i + 1}) {
          animation: product-card-appear 300ms;
          animation-fill-mode: backwards;
          animation-delay: ${i * 50}ms;
        }
      `;
    }
    return css`
      ${styles}
    `;
  }}


 
`;


export const ProductItem = styled.li`
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 10px;
    padding: 2px;
    float:left;
    box-sizing: border-box;
    cursor: pointer;
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }

    @media only screen and (max-width: 768px){
      max-height: 180;
      min-height: 180px;
    }
    //width: ${props => (props.grid ? props.grid / 12 * 100 : '8:33')}%;
  


    
`;

export const ContainerGrid = styled.div`
    width: 100%;
    height: auto;
    border-radius: 4px;
    padding: 2px;
    float:left;
    box-sizing: border-box;
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
`;

function getWidthGrid(value){
  if(!value) return;

  let width = value / 12 *100;
  return `width: ${width}%;`;
}


export const ProdutoColum = styled.div`
  float: left;
  padding: .25rem;
  min-height: 1px;
  box-sizing: border-box;
  width: 100%;

  @media only screen and (max-width: 768px){
    ${({mobile}) => mobile && getWidthGrid(mobile)}
    //width: ${props => (props.grid ? props.grid / 12 * 100 : '8:33')}%;
  }

  @media only screen and (min-width: 768px){
    ${({tablet}) => tablet && getWidthGrid(tablet)}
    //width: ${props => (props.grid ? props.grid / 12 * 100 : '8:33')}%;
  }

  @media only screen and (min-width: 960px){
    ${({descktop}) => descktop && getWidthGrid(descktop)}
    //width: ${props => (props.grid ? props.grid / 12 * 100 : '8:33')}%;
  }
  img {
      max-width: 100%;
      align-self: right;
      transition: background 0.5s;
      //@media only screen and (max-width: 768px){
      //  max-height: 130px;
      //  min-height: 140px;
      //}
    }

    > strong {
      font-size: 14px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }
    > span {
      font-size: 18px;
      font-weight: bold;
      margin: 5px 0 20px;
      align-items: center;
      
    }
    .priceForm {
      font-size: 17px;
      margin: 5px 0 20px;
      font-weight:bold;
      text-decoration:line-through;
      margin-right: 5px;
      color: #7c7672;
      border: 0px;
    }
    button {
      background: #3d5afe;
      color: #fff;
      border: 0;
      border-radius: 4px;
    
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.5s;
      max-width: 100%;
      
      &:hover {
        background: ${darken(0.05, '#3d5afe')};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
        margin-right: 5px;
        margin-left: 5px;
      }
    }
`

export const ContainerImagem = styled.div`
  //padding-top: 0.25rem;
  padding-bottom: 0.30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;