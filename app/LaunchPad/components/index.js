import React from 'react';
import styled from 'styled-components';
import { getHsl } from '@medeo/utils';
import { ButtonLink } from '@medeo/components';
import ActiveAppsList from '../containers/ActiveAppsList';

const LaunchPadView = ({ className }) => (
  <div className={className}>
    <header>
      <ButtonLink to={'/'}>Retour</ButtonLink>
      <h1>Applications activées</h1>
    </header>
    <main>
     <ActiveAppsList/>
    </main>
  </div>
);

const StyledLaunchPadView = styled(LaunchPadView)`
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-row-gap: 5rem;
  grid-template-columns: 1rem 1fr 1rem;
  height:100vh;
  background: ${getHsl(undefined, 90)};
  & > header {
    display: grid;
    grid-template-columns: 7.5rem 1fr 7.5rem;
    justify-content: center;
    align-items: center;
    h1 {
    text-align: center;
    }
  }
  
  & > header, main {
    grid-column: 2;
  }
   
  & > main {
    display: grid;
    padding: 0;
    list-style: none;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem ;
    grid-row-gap: 1rem ;
  }
  
`;

export default StyledLaunchPadView;
