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
      <div className="App flex flex-col h-screen w-full">
        <NavBar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </Providers>
  );
};

export default Layout;
