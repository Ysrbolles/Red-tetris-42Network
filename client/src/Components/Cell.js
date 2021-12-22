import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from './tetriminos';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
  </StyledCell>
);

export default React.memo(Cell);
