import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    function getMenuClasses() { 
        let menuClasses = [];

        if (isOpen) {
            menuClasses = [
                "flex", 
                "absolute",
                "top-16",
                "w-full",
                "bg-blood_red-400",
                "p-2",
                "left-0",
                "gap-2",
                "flex-col"
            ];
        }
        else {
            menuClasses =  ["hidden", "md:flex"];
        }
        
        return menuClasses.join(" ");
    }

    const router = useRouter();

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setIsOpen(false); // Oculta el menú si la pantalla és suficientment gran
            }
        }

        window.addEventListener("resize", handleResize); // Agrega l'event de canvi de tamany de la finestra

        return () => {
            window.removeEventListener("resize", handleResize); // Neteja l'event al desmontar el component
        };
    }, []); // Només s'executa al montar el component



    return (
        <nav className="bg-blood_red text-white p-4 sm:p-4 md:flex md:justify-between md:items-center">
            <div className="container mx-auto flex justify-between items-center">
                <a href="" className="text-2xl font-bold">
                    GastroManager
                </a>

                <div className={`${getMenuClasses()} text-lg`}>
                    <Link rel="stylesheet" href="/" className="px-4 hover:text-gray-300">Carta</Link>
                    <Link rel="stylesheet" href="about" className="px-4 hover:text-gray-300">Taules</Link>
                    <Link rel="stylesheet" href="contact" className="px-4 hover:text-gray-300">Personal</Link>
                    <Link rel="stylesheet" href="contact" className="px-4 hover:text-gray-300">Estadístiques</Link>
                    <Link rel="stylesheet" href="contact" className={`px-4 hover:text-gray-300 ${isOpen ? 'border-t pt-2' : 'border-l'}`}>Perfil</Link>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
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
                </div>
            </div>
        </nav>
    );
}