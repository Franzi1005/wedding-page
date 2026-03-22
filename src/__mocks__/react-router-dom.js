import React from 'react';

export const Link = ({ children, to, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Route = () => null;
export const Routes = ({ children }) => <div>{children}</div>;
