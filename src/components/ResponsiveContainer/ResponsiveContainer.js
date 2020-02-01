import React from 'react';
import DesktopContainer from '../DesktopView/DesktopContainer';
import MobileContainer from '../MobileView/MobileContainer';

const ResponsiveContainer = ({ children }) => {
  return (
    <>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </>
  );
};

export default ResponsiveContainer;
