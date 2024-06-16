import { Footer } from "@/components/Layout/Footer";
import Image from 'next/image';
import { Input, Modal, ModalContent, ModalHeader, ModalBody } from "@/utils/components"
import { useState } from "react";
import { faEye, faEyeSlash, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import 'tailwindcss/tailwind.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from "next/router";

const SignUp = () => {
    const router = useRouter();

    const [isPwdVisible, setPwdIsVisible] = useState(false);
    const togglePwdVisibility = () => setPwdIsVisible(!isPwdVisible);
    const [isRepeatPwdVisible, setRepeatPwdIsVisible] = useState(false);
    const toggleRepeatNewPwdVisibility = () =>
        setRepeatPwdIsVisible(!isRepeatPwdVisible);

    // guarda les dades del formulari
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setCurrentPwd] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [address, setAddress] = useState("");
    const [nif, setNif] = useState("");

    // per manejar canvis d'entrada del formulari
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPwd(e.target.value);
    };
    const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    };
    const handleRestaurantNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRestaurantName(e.target.value);
    };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };
    const handleNifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNif(e.target.value);
    };

    // per manejar errors del formulari
    const [errors, setErrors] = useState<any[]>([]);

    // per menejar enviaments del formulari
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, password, repeatPassword, restaurantName, address, nif)

        // validació dels camps
        try {
            const schema = z.object({
                name: z.string().min(1, 'El nom és obligatori'),
                email: z.coerce.string().email('El correu electrònic no és valid').min(1, 'El correu electrònic és obligatori'),
                password: z.string().min(1, 'La contrasenya és obligatoria'),
                repeatPassword: z.string().min(1, 'Repetir la contrasenya és obligatori'),
                // restaurantName: z.string().min(1, 'El nom del restaurant és obligatori'),
                // address: z.string().min(1, 'L\'adreça és obligatoria'),
                // nif: z.string().min(1, 'El NIF és obligatori')
            })
            .superRefine(( { password }, checkPwdComplexity) => {
                const containsUpperCase = (ch: string) => /[A-Z]/.test(ch);
                const containsLowerCase = (ch: string) => /[a-z]/.test(ch);
                const containsSpecial = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

                let countOfUpperCase = 0,
                countOfLowerCase = 0,
                countOfNumbers = 0,
                countOfSpecial = 0;
                for (let i = 0; i < password.length; i++) {
                    let ch = password.charAt(i);
                    if (!isNaN(+ch)) countOfNumbers++;
                    else if (containsUpperCase(ch)) countOfUpperCase++;
                    else if (containsLowerCase(ch)) countOfLowerCase++;
                    else if (containsSpecial(ch)) countOfSpecial++;
                }
                if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecial < 1 || countOfNumbers < 1) {
                    checkPwdComplexity.addIssue({
                        path: ['password'],
                        code: 'custom',
                        message: 'La contrasenya ha de contenir almenys una lletra minúscula, una majúscula, un número i un caràcter especial',
                    })
                }
            })
            .superRefine(( {password, repeatPassword}, checkEqualPwd ) => {
                if (password !== repeatPassword) {
                    checkEqualPwd.addIssue({
                        path: ['password'],
                        code: 'custom',
                        message: 'Les contrasenyes no coincideixen',
                    })
                }
            });

            // valida els camps
            const response = schema.safeParse({
                name: name,
                email: email,
                password: password,
                repeatPassword: repeatPassword,
                // restaurantName: restaurantName,
                // address: address,
                // nif: nif
            })

            if (!response.success) {
                let errArr: any[] = [];
                const { errors: err } = response.error;
                for (var i = 0; i < err.length; i++) {
                    errArr.push({for: err[i].path[0], message: err[i].message});
                }
                setErrors(errArr);
                throw err;
            }

            setErrors([]);

            // realitzem la petició per afegir el restaurant
            const apiResponseRestaurant = await fetch("/api/restaurants/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom: restaurantName,
                    adreca: address,
                    nif: nif
                }),
            });

            if (!apiResponseRestaurant.ok) {
                const data = await apiResponseRestaurant.json();
                setErrorMessage(data.error);
                onOpen();
                return;
            }
            
            // si s'ha inserit el restaurant, obtenim el seu identificador
            const data = await apiResponseRestaurant.json();
            const idRestaurant = data.id;
            
            // realitzem la petició per afegir l'usuari
            const apiResponse = await fetch("/api/usuaris/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    nom: name,
                    contrasenya: password,
                    nomRol: 'Administrador',
                    nifRestaurant: nif
                }),
            })

            if (apiResponse.ok) {
                router.push("/signIn");
            } else {
                const data = await apiResponse.json();
                setErrorMessage(data.error);
                console.log(errorMessage);
                onOpen();
            }

        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error);
            } else {
                console.error(error);
            }
        }
    }

    const [errorMessage, setErrorMessage] = useState(null);

    // per a manejar l'obertura del modal
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="App flex flex-col h-screen w-full">
            <main className="flex-grow flex items-center justify-center">
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md p-8 space-y-6 bg-bronze-200 rounded-md m-2">
                        <div className="flex justify-center"> 
                            <Image src="/images/transparent-logo.png" alt="GastroManager Logo" width={100} height={100} />
                        </div>
                        <h2 className="text-2xl font-bold text-center">Registre</h2>
                        <p className="text-center">
                            El registre està pensat per propietaris de restaurants. Si ets un treballador,
                            el propietari us ha de facilitar les vostres claus d'accés.
                        </p>
                        <form  
                            className="space-y-4"
                            onSubmit={handleSubmit}>
                            <h3 className="text-xl text-center">Dades personals</h3>
                            <Input
                                type="text"
                                label="Nom i Cognoms"
                                isRequired
                                value={name}
                                onChange={handleNameChange}
                            />
                            <div className="mt-1 text-xs text-red-500">
                                {errors.find((error) => error.for === "name")?.message}
                            </div>
                            <Input
                                type="email"
                                label="Correu Electrònic"
                                isRequired
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <div className="mt-1 text-xs text-red-500">
                                {errors.find((error) => error.for === "email")?.message}
                            </div>
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
                            <Input
                                label="Repeteix Contrasenya"
                                id="repeatPassword"
                                isRequired
                                value={repeatPassword}
                                onChange={handleRepeatPasswordChange}
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleRepeatNewPwdVisibility}
                                    >
                                        {isRepeatPwdVisible ? (
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
                                type={isRepeatPwdVisible ? "text" : "password"}
                                className="col-span-2 md:col-span-1"
                            /> 
                            <div className="mt-1 text-xs text-red-500">
                                {errors.find((error) => error.for === "password")?.message}
                            </div>

                            <h3 className="text-xl text-center">Dades del Restaurant</h3>   
                            <Input
                                type="text"
                                label="Nom"
                                isRequired
                                value={restaurantName}
                                onChange={handleRestaurantNameChange}
                            />
                            <Input
                                type="text"
                                label="Adreça"
                                isRequired
                                value={address}
                                onChange={handleAddressChange}
                            />
                            <Input
                                type="text"
                                label="NIF"
                                isRequired
                                value={nif}
                                onChange={handleNifChange}
                            />

                            <button 
                                className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded w-full"
                                type="submit">
                                Registrar-me
                            </button>
                        </form>
                        
                        <p className="text-center mt-2">
                            Ja tens un compte? <a href="/signIn" className="text-brown-600">Inicia sessió</a>
                        </p>
                    </div>
                </div>
                
            </main>
            <Footer />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}
                className="bg-blood_red-200">
                <ModalContent>
                    <ModalHeader>
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            style={{color: "#f02112",}}
                            className="text-2xl m-1"/>
                        <h2>Oops! S'ha produït un error al afegir l'usuari.</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p>{errorMessage}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default SignUp;