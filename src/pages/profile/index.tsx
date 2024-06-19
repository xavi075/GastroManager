import Layout from '@/components/Layout/Layout';
import { IUsuari } from "@/utils/interfaces";
import { useState, useEffect } from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody } from "@/utils/components";
import { faEye, faEyeSlash, faFloppyDisk, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from '@nextui-org/react';
import { error } from 'console';
import { useSession } from "next-auth/react";

export default function Profile() {

    // guarda les dades de l'usuari
    const [usuari, setUsuari] = useState<IUsuari>();
    const { data: session } = useSession(); // Obtenir la sessió de l'usuari
    useEffect(() => {
        if (session) {
            fetch("/api/usuaris/get?email=" + session.user.email)
                .then((res) => res.json())
                .then((data) => setUsuari(data));
        }
    }, [session]);

    //realitza una peticio a la API per obtenir les dades de l'usuari el primer cop que es carrega el component
    // useEffect(() => {
    //     console.log(session);
    //     fetch("/api/usuaris/get?id=4")
    //         .then((res) => res.json())
    //         .then((data) => setUsuari(data));
    // }, []);

    


    // guarda les dades del formulari
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [repeatNewPwd, setRepeatNewPwd] = useState("");
    // per determinar si el formulari es pot enviar
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const validateForm = (currentPwd : string, newPwd : string, repeatNewPwd : string) => {
        console.log(currentPwd, newPwd, repeatNewPwd);
        if (currentPwd && newPwd && repeatNewPwd && newPwd == repeatNewPwd) {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
        console.log(submitEnabled);
    }

    const [isPwdVisible, setPwdIsVisible] = useState(false);
    const togglePwdVisibility = () => setPwdIsVisible(!isPwdVisible);
    const [isNewPwdVisible, setNewPwdIsVisible] = useState(false);
    const toggleNewPwdVisibility = () => setNewPwdIsVisible(!isNewPwdVisible);
    const [isRepeatNewPwdVisible, setRepeatNewPwdIsVisible] = useState(false);
    const toggleRepeatNewPwdVisibility = () =>
        setRepeatNewPwdIsVisible(!isRepeatNewPwdVisible);

    // per manejar cambis d'entrada del formulari
    const handleCurrentPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPwd(e.target.value);
        validateForm(e.target.value, newPwd, repeatNewPwd);
    };
    const handleNewPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPwd(e.target.value);
        validateForm(currentPwd, e.target.value, repeatNewPwd);
    };
    const handleRepeatNewPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatNewPwd(e.target.value);
        validateForm(currentPwd, newPwd, e.target.value);
    };

    // per menejar enviaments del formulari
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(currentPwd, newPwd, repeatNewPwd);
        return fetch("/api/usuaris/updatePassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: usuari?.email,
                currentPwd: currentPwd,
                newPwd: newPwd,
            }),
        }).then((res) => {
            return res.json().then(data => {
                if (!res.ok) {
                    setErrorMessage(data.error);
                    console.log(errorMessage);
                    onOpen();
                } else {
                    setCurrentPwd("");
                    setNewPwd("");
                    setRepeatNewPwd("");
                }
                return data;
            });
        })
    };

    const [errorMessage, setErrorMessage] = useState(null);

    // per a manejar l'obertura del modal
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <Layout>
            {/* START: Dades personals */}
            <div className="bg-bronze-200 rounded-md m-2 grid grid-cols-2 justify-items-center gap-2 p-2">
                <h2 className="text-xl font-bold m-2 col-span-2">Dades personals</h2>
                <Input
                    isReadOnly
                    type="text"
                    label="Nom"
                    value={usuari?.nom}
                    className="col-span-2 md:col-span-1"
                />
                <Input
                    isReadOnly
                    type="text"
                    label="Rol"
                    value={usuari?.rol?.nomRol}
                    className="col-span-2 md:col-span-1"
                />
            </div>
            {/* END : Dades personals */}
            
            {/* START: Dades d'accés */}
            <div className="bg-bronze-200 rounded-md m-2 flex flex-col items-center ">
            <h1 className="text-xl font-bold m-2">Dades d'accés</h1>

            <form
                className="w-full grid grid-cols-2 justify-items-center gap-2 p-2"
                onSubmit={handleSubmit}
            >
                <Input
                    isReadOnly
                    type="email"
                    label="Correu Electrònic"
                    value={usuari?.email}
                    className="col-span-2 md:col-span-1"
                />

                <Input
                    label="Contrasenya Actual"
                    id="currentPwd"
                    value={currentPwd}
                    onChange={handleCurrentPwdChange}
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
                    className="col-span-2 md:col-span-1"
                />

                <Input
                    label="Nova Contrasenya"
                    id="newPwd"
                    value={newPwd}
                    onChange={handleNewPwdChange}
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleNewPwdVisibility}
                        >
                            {isNewPwdVisible ? (
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
                    type={isNewPwdVisible ? "text" : "password"}
                    className="col-span-2 md:col-span-1"
                />

                <Input
                    label="Repeteix Nova Contrasenya"
                    id="repeatNewPwd"
                    value={repeatNewPwd}
                    onChange={handleRepeatNewPwdChange}
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleRepeatNewPwdVisibility}
                        >
                            {isRepeatNewPwdVisible ? (
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
                    type={isRepeatNewPwdVisible ? "text" : "password"}
                    className="col-span-2 md:col-span-1"
                />

                <button 
                    className={`bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded col-span-2 w-1/2
                    ${submitEnabled ? "" : "cursor-not-allowed opacity-50"}
                    `}
                    type="submit"
                    disabled={!submitEnabled}>
                    Guardar <FontAwesomeIcon icon={faFloppyDisk}/>
                </button>
            </form>
        </div>
        {/* END: Dades d'accés */}

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}
            className="bg-blood_red-200">
            <ModalContent>
                <ModalHeader>
                    <FontAwesomeIcon
                        icon={faCircleExclamation}
                        style={{color: "#f02112",}}
                        className="text-2xl m-1"/>
                    <h2>Error al intentar canviar la contrasenya</h2>
                </ModalHeader>
                <ModalBody>
                    <p>{errorMessage}</p>
                </ModalBody>
            </ModalContent>
        </Modal>

        </Layout>
        
    )
}