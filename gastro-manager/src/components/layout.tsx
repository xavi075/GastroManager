import React, { ReactNode, useState } from 'react';
import 'tailwindcss/tailwind.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <header className="flex flex-wrap items-center w-full text-brown md:justify-between">
        {/* <a className="flex justify-center text-5xl sm:text-m">GastroManager</a> */}
        <img src="/images/logo.png" alt="logo" className="w-full px-12 py-2 md:w-64 rounded-full h-auto flex-shrink-0 "/>
        <nav className="bg-bronze p-2 m-2 inline-flex">
          
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
          <ul className={`md:flex md:justify-center md:space-x-4 text-white text-xl ${isOpen ? 'block' : 'hidden'}`}>
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
            {/* <li className="nav-item">
              <a className="transition-colors duration-200 ease-in-out hover:bg-bronze" href="/perfil">Perfil</a>
            </li> */}
          </ul>
        </nav>
        <nav>
          <ul className={`md:flex  md:justify-end md:space-x-4 `}>
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
