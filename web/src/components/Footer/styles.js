import styled from 'styled-components';
import { darken } from 'polished';

export const ContainerTop = styled.div`

  border-top: 200px solid transparent;

`;

export const Container = styled.div`
  //background-color: #37474f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  
  h1{
    color: white;
  }

`;

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

  span {
        flex: 1;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        margin-right: 5px;
        margin-left: 5px;
        color:white;
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

