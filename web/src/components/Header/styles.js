import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

import { keyframes, css } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';


export const Container = styled.header`
  //background-color: #37474f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin: 10px 0;
  
  img {
    max-width:130px;
    max-height:60px;
    width: auto;
    height: auto;
    transition: background 0.2s;
  }

  .imgOfertabest{
    max-width:130px;
    max-height:60px;
    width: auto;
    height: auto;
    transition: background 0.2s;
  }

  .btnPainel{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    transition: background 0.2s;
  }

  .btnRoutes{
    background: transparent;
    border-radius: 10px;
    transition: background 0.2s;
  }

`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;
  }
  strong {
    display: block;
    color: #fff;
  }
  span {
    font-size: 12px;
    color: #999;
  }
`;


export const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 // background-color: #37474f;
 background-color: ${props => (props.barOpened ? '#37474f' : 'transparent')};
  /* Change width of the form depending if the bar is opened or not */
  width: ${props => (props.barOpened ? "30rem" : "2rem")};
  
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${props => (props.barOpened ? "auto" : "pointer")};
  padding: 1.6rem;
  height: 2rem;
  border-radius: 10px;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

export const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${props => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: white;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

export const Button = styled.button`
  line-height: 1;
  pointer-events: ${props => (props.barOpened ? "auto" : "none")};
  cursor: ${props => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;


export const ContainerGrid = styled.div`
    width: 100%;
    height: auto;
    border-radius: 4px;
    //padding: 2px;
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
  
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border: 0;

  img {
    max-width:130px;
    max-height:60px;
    width: auto;
    height: auto;
    transition: background 0.5s;
    
  }

  strong{
    width: auto;
    font-size: 18px;

  }

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
  button {
      font-size: 16px;
      background: transparent;
      color: #fff;
      border: 0;
      align-items: center;
      transition: background 0.5s;
      min-width: 40px;
      min-height: 40px;
      
      &:hover {
        background: ${darken(0.05, '#3d5afe')};
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


export const ColumnSocialMidia = styled.div`
  
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border: 0;
  border-bottom: 10px solid transparent;

  button {
        background: transparent;
        border: 0;
        transition: background 0.5s;
  }

`;

export const ColumnSocialMidiaDescktop = styled.div`
  
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  border: 0;
  border-bottom: 10px solid transparent;

  button {
        background: transparent;
        border: 0;
        transition: background 0.5s;
  }

`;


//CATEGORIAS

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


export const ProductList = styled.ul`
  //display: grid;
  //grid-template-columns: repeat(1fr, 1);
  white-space:nowrap;
  
  @media only screen and (min-width: 960px){
    //grid-template-columns: repeat(2, 1fr);
  }
/*
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
  }}*/
 
`;


export const ProductItem = styled.li`
display:inline;
    /*width: 100%;
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
      max-height: 70px;
      min-height: 70px;
    }
    //width: ${props => (props.grid ? props.grid / 12 * 100 : '8:33')}%;
  
*/

    
`;
