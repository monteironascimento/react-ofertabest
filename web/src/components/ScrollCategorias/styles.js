import styled from 'styled-components';

export const Container = styled.div`
   

    background: gray;
    border-radius: 10px;
    margin-bottom: 8px; //funciona!
   
    * {
        box-sizing: border-box;
    }
    
    .menu-item {
      padding: 8px 20px;
      margin: 2px 2px;
      user-select: none;
      cursor: pointer;
      background: white;
      border-radius: 10px;
      margin-top: 5px; //funciona!
      margin-bottom: 5px; //funciona!
    }
    
    .scroll-menu-arrow {
      padding: 6px;
      cursor: pointer;
      border-radius: 2px;
      background-color: transparent;
    }
    
    .scroll-menu-arrow--disabled {
      visibility: hidden;
      background-color: transparent;
      border-radius: 2px;
    }


    .arrow-prev {
      color: black;
      font-size: 18px;
    }

    .arrow-next {
      color: black;
      font-size: 18px;
    }
  `