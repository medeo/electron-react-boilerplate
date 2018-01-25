import React from 'react';
import styled from 'styled-components';
import { getHsl } from '@medeo/utils';
import { Link, LinkButton } from '@medeo/components';

const AppTile = ({ app, className, onClick }) => (
  <div className={className}>
    <aside>
      {app.name.charAt(0)}
    </aside>
    <main>
      <h2>
        <span>{app.name}</span>
        <i className={`fa ${app.isFav === true ? `fa-star` : `fa-star-o`}`}/>
      </h2>
      <Link to={app.uri}>Ouvrir l'application</Link>
      <LinkButton onClick={() => onClick(app.id)}>
        {app.isFav === true ? 'Retirer des favoris' : 'Rajouter aux favoris'}
      </LinkButton>
    </main>
  </div>
);

const StyledAppTile = styled(AppTile)`
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
/*
  &:hover {
    background: ${getHsl(undefined, 70)};
    cursor: pointer;
  }*/
  aside{
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 0.25rem;
    width: 5rem;
    height: 5rem;
    background: ${getHsl('blue', 30)};
    text-transform: uppercase;
    margin-right: 1rem;
    font-size: x-large;
  }
  main {
    h2 {
      font-size: large; margin-bottom: 0.5rem;
      display: flex;
      font-weight: bold;
      justify-content: space-between;
    }
    i {
      color: ${getHsl(undefined, 50)};
      opacity: 0.6;
    }
    display: flex;
    flex: 1;
    flex-direction: column;
  }
`

export default StyledAppTile;
