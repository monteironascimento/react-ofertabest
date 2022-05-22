import styled from 'styled-components';

export const Container = styled.div`
   
    //background: gray;
    //border-radius: 10px;
    margin-bottom: 8px; //funciona!
    padding: 4px;
   
    * {
        box-sizing: border-box;
    }
    
    .menu-item {
      //padding-right: 12px;
      //margin: 2px 2px;
      border-radius: 100px;
      background: white;
      user-select: none;
      cursor: pointer;
      //background: transparent;w
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      //margin-bottom: 5px; //funciona!

    }
    
    .imgItem{
      width: 80px;
      height: 60px;
      align-items: center;
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
      color: white;
      font-size: 26px;
    }

    .arrow-next {
      color: white;
      font-size: 26px;
    }

  `