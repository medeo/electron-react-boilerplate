import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { getHsl } from '@medeo/utils';

const AppNavLink = ({ className, name, icon, ...rest }) => (
  <NavLink className={className} activeClassName={'active'} {...rest} >
    <span>{ icon ? <i className={`fa ${icon}`}/> : name.charAt(0) }</span>
    {name}
  </NavLink>
)
export default styled(AppNavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:not(:last-of-type){
    margin-bottom: 1rem;
  }
  font-size: small;
  font-weight: bold;
  & > span {
    content: '';
    height: 3rem;
    width: 3rem;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${getHsl('blue', 30)};
    text-transform: uppercase;
    font-size: large;
    color: white;
  }  
  
  &.active {
   // color: ${getHsl('blue', 50)};
   & > span {   
    background: ${getHsl('blue', 50)};
      box-shadow: 3px 6px 22px 0 #083e5e22;
   }

  }
`;
