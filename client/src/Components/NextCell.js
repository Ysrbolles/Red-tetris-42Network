import React from 'react';
import { StyledNextCell } from './styles/StyledNextCell';
import { TETROMINOS } from './tetriminos';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledNextCell type={type} color={TETROMINOS[type].color}>
  </StyledNextCell>
);

export default React.memo(Cell);
