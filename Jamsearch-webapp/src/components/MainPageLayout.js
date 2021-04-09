import React from 'react';
import Nav from './Nav';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="JamSearch"
        subtitle="Find your jam in our kitchen, isn't it aMAISing"
      />
      <Nav />
      {children}
    </div>
  );
};

export default MainPageLayout;
