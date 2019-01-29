import styled from 'styled-components';


const Main = styled.div `
  position:  ${props => props.type==="market"  || props.type ==="home" ? "auto;" : "fixed;"}
  height:  ${props => props.type==="market" ? "auto;" : "100vh;"}
  text-align:  ${props => props.type==="home" ? "center;" : "auto;"}
  background: ${props => {
    switch(props.type){
      case "home":
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
  width: 100%;
`;
// font-family: LLCircular,sans-serif;
// font-size: 60px;
// font-weight: 600;
// font-style: normal;
// font-stretch: normal;
// padding: 100px 0 20px;
// color: white;


const Header = styled.h1 `
  font-family: LLCircular,sans-serif;
  font-size: 80px;
  font-weight: 600;
  line-height: 76px;
  margin-top: 0px;
  padding-top:3rem;

`;

export {
  Main,
  Header
}
