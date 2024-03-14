import React, { ReactNode, useState } from 'react';
import 'tailwindcss/tailwind.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <header className="items-center w-full text-brown">
        <nav>
          <a className="flex justify-center text-4xl sm:text-m">Gestió Restaurants</a>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul className={`md:flex md:justify-center md:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
            <li className="nav-item">
              <a className="transition-colors duration-200 ease-in-out hover:bg-bronze" href="/carta">Carta</a>
            </li>
            <li className="nav-item">
              <a className="transition-colors duration-200 ease-in-out hover:bg-bronze p-3" href="/taules">Taules</a>
            </li>
            <li className="nav-item">
              <a className="transition-colors duration-200 ease-in-out hover:bg-bronze" href="/personal">Personal</a>
            </li>
            <li className="nav-item">
              <a className="transition-colors duration-200 ease-in-out hover:bg-bronze" href="/estadistiques">Estadístiques</a>
            </li>
            <li className="nav-item">
              <a className="transition-colors duration-200 ease-in-out hover:bg-bronze" href="/perfil">Perfil</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
