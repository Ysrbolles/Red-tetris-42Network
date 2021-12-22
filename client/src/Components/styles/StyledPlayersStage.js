import styled from 'styled-components';

export const StyledPlayersStage = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows: repeat(
    ${props => props.height},
    calc(15vh / ${props => props.width})
  );
  // grid-gap: 1px ;
  height: 30vh;
  width: 15vh;
  background-color: rgba(0, 0, 0, 0.3);
  border: 3px solid white;
  border-radius: 3px 0px 0px 3px;
  position: relative;
`;
