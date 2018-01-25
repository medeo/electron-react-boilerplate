import React from 'react';
import styled from 'styled-components';


const ScoreQuestion = ({className, children})=> (
  <div className={className}>
    {children}
  </div>
);

const StyledScoreQuestion = styled(ScoreQuestion)`
  font-weight: bold;
`;

export default StyledScoreQuestion;