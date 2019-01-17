import styled from 'styled-components';


const Main = styled.div `
  text-align:  ${props => props.type==="main" ? "center;" : "auto;"}
  height: 100vh;
  background: ${props => {
    switch(props.type){
      case "main":
        return "linear-gradient(to bottom, #f09819, #edde5d);"
        break
      case "create":
        return "linear-gradient(to bottom, #ff8a00, #da1b60);"
        break
      case "market":
        return  "linear-gradient(to bottom, #ff8a00, #da1b60);"
        break
      }
    }
  };

  top:0;
  position: fixed;
  width: 100%;
`;


const Header = styled.h1 `
    font-family: LLCircular,sans-serif;
    font-size: 60px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 76px;
    padding: 100px 0 20px;
    color: white;
`;

export {
  Main,
  Header
}
