import styled from 'styled-components';



// padding: 1rem;
// margin-top: 2.8rem;
const Card = styled.div `
  border: 2px solid #fff;
  box-shadow: 0px 12px 30px 3px rgba(169, 168, 168, 0.21);
  transition: box-shadow .25s;
  margin: 1rem
  padding-top: 1.5rem;
  padding-left: ${props => props.offer ? "0rem;" : "1.5rem"};
  border-radius: 1rem;
  background-color: #fff;
  word-wrap: break-word;
`;

const CardAction = styled.div`
  border-top: 1px solid rgba(160,160,160,0.2);
  position: relative;
  padding: 16px 24px;
`;


export {
   Card, CardAction
}
