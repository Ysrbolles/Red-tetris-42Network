import styled from 'styled-components';

export const StyledNext = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows: repeat(
    ${props => props.height},
    calc(18vh / ${props => props.width})
  );
  // grid-gap: 1px ;
  height: 18vh;
  width: 21vh;
  // background-color: rgba(0, 0, 0, 0.3);
  // border: 3px solid white;
  // border-radius: 3px 0px 0px 3px;
  // position: relative;
  margin-left: 60px;
`;
