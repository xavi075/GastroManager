import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <header className="items-center w-full text-brown ">
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
                    <li classNaame="nav-item">
                        <a className="transition-colors duration-200 ease-in-out hover:bg-bronze" href="/estadistiques">Estadístiques</a>
                    </li>
                    <li className="nav-item">
                        <a className="transition-colors duration-200 ease-in-out hover:bg-bronze" href="/perfil">Perfil</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <section className="flex flex-col">
                <h2 className="text-xl">Taules</h2>
                <article className="border-1 border-solid border-black border-md
                    p-2.5
                    mb-4
                    flex flex-col
                    bg-vanilla
                    text-center
                    transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
                    <h3>Taula 1</h3>
                </article>
                
                <article className="border-1 border-solid border-black border-md
                    p-2.5
                    mb-4
                    flex flex-col
                    bg-vanilla
                    text-center
                    transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
                    <h3>Taula 2</h3>
                </article>

                <article className="border-1 border-solid border-black border-md
                    p-2.5
                    mb-4
                    flex flex-col
                    bg-vanilla
                    text-center
                    transition-colors duration-200 ease-in-out hover:bg-bronze hover:text-white">
                    <h3>Taula 3</h3>
                </article>

            </section>
        </main>

    </div>
  );
}

export default App;
