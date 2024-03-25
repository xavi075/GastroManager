import React, { ReactNode, useState } from 'react';
import { NavBar } from './Navbar';
import 'tailwindcss/tailwind.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      {/* <header className="flex flex-wrap items-center w-full text-brown md:justify-between"> */}
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
