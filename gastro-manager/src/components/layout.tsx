import React, { ReactNode } from 'react';
import 'tailwindcss/tailwind.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App">
      <header className="items-center w-full text-brown">
        <nav>
          <a className="flex justify-center text-4xl">Gestió Restaurants</a>
          <ul className="flex justify-center [&>li>a]:inline-block [&>li>a]:text-xl [&>li>a]:p-3 bg-brown [&>li>a]:text-vanilla rounded-md">
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
