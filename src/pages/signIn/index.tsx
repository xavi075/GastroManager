import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/utils/components"
import 'tailwindcss/tailwind.css'
import { Footer } from "@/components/Layout/Footer";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

const SignIn = () => {
    const router = useRouter();
    const [isPwdVisible, setPwdIsVisible] = useState(false);
    const togglePwdVisibility = () => setPwdIsVisible(!isPwdVisible);

    // guarda les dades del formulari
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const signInData = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        });

        if (signInData?.error)  {
            setErrorMessage(true);
        } else {
            setErrorMessage(false);
            router.push('/taules');
        }
    };

    return ( 
        <div className="App flex flex-col h-screen w-full">
            <main className="flex-grow flex items-center justify-center">
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md p-8 space-y-6 bg-bronze-200 rounded-md m-2">
                        <div className="flex justify-center"> 
                            <Image src="/images/transparent-logo.png" alt="GastroManager Logo" width={100} height={100} />
                        </div>
                        <h2 className="text-2xl font-bold text-center">Inici de Sessió</h2>
                        <p>Benvinguts a GastroManager. Siusplau, inicieu sessió o registreu-vos.</p>
                        <form  
                            className="space-y-4"
                            onSubmit={handleSubmit}>
                            <div>
                                <Input
                                    type="email"
                                    label="Correu Electrònic"
                                    isRequired
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Contrasenya"
                                    id="password"
                                    isRequired
                                    value={password}
                                    onChange={handlePasswordChange}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={togglePwdVisibility}
                                        >
                                            {isPwdVisible ? (
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    className="text-2xl text-default-400 pointer-events-none"
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faEyeSlash}
                                                    className="text-2xl text-default-400 pointer-events-none"
                                                />
                                            )}
                                        </button>
                                    }
                                    type={isPwdVisible ? "text" : "password"}
                                />
                            </div>
                            <button 
                                className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded w-full"
                                type="submit">
                                Iniciar Sessió
                            </button>
                            {errorMessage && (
                                <div className="mt-1 text-xs text-red-500">
                                    Oops! Correu electrònic o contrasenya incorrectes.
                                </div>
                            )}
                        </form>

                        
                        <p className="text-center mt-2">
                            No tens un compte? <a href="/signUp" className="text-brown-600">Registra't</a>
                        </p>
                    </div>
                </div>
                
            </main>
            <Footer />

            
        </div>
        
    )
}

export default SignIn;