import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { NavList, LinkStyled } from './Nav.styled';

const LINKs = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Selected' },
  { to: '/predictions', text: 'Predictions' },
];

const Nav = () => {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {LINKs.map(item => (
          <li key={item.to}>
            <LinkStyled
              className={item.to === location.pathname ? 'active' : ''}
              to={item.to}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default memo(Nav);
