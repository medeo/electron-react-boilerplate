import React from 'react';
import styled from 'styled-components';

const ScoreReferences = ({ className, references}) => (
  <div className={className}>
    <h3>Références</h3>
    <div dangerouslySetInnerHTML={{__html: references}}/>
  </div>
);


export default ScoreReferences;