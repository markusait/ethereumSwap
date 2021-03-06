import styled from 'styled-components';
// top: 0;
//  background-color: ${props => props.left ? "#ff9e2c" : "#b6701e"};
const SplitDiv = styled.div `
  color: #fff;
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  padding-top: 20px;
  background-color: ${props => props.left ? "#00CDAC" : "#187A6A"};
  padding: 1rem;
  left: ${props => props.left ? "0" : "auto"};
  right: ${props => props.left ? "auto" : "0"};
`;

const CenterDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);
  text-align: center;
`;

export {
  SplitDiv, CenterDiv
}
