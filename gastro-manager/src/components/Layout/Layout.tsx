import React, { ReactNode, useState } from 'react';
import { NavBar } from './NavBar/Navbar';
import 'tailwindcss/tailwind.css'
import { Footer } from './Footer';
import { Providers } from '@/providers';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <Providers>
      <div className="App">
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <footer className="inset-x-0 bottom-0 p-4 text-center">
          <Footer />
        </footer>
      </div>
    </Providers>
  );
};

export default Layout;
