import React, { ReactNode, useState } from 'react';
import { NavBar } from './NavBar/Navbar';
import 'tailwindcss/tailwind.css'
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="App">
      {/* <header className="flex flex-wrap items-center w-full text-brown md:justify-between"> */}
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer className="inset-x-0 bottom-0 p-4 text-center">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
