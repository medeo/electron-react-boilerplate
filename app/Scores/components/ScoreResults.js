import React from 'react';
import styled from 'styled-components';
import { getHsl } from '@medeo/utils';

const ScoreResults = ({className, score, instructions}) => (
  <div className={className}>
    <h3>Résultats</h3>
    <div>Score actuel: {score}</div>
    <div dangerouslySetInnerHTML={{ __html: instructions }}/>
  </div>
)

export default styled(ScoreResults)`
  & > div:first-of-type {
    background: ${getHsl('blue', 80)};
    margin: 1rem -0.5rem;
    padding: 0.5rem; 
    border-radius: 0.25rem;
    color: ${getHsl('blue', 20)};
  }

`;