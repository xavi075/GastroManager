import { useState } from "react";
import { Input, Button } from "@/utils/components";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AccessInfo = () => {
    const [formData, setFormData] = useState({
        currentPwd: "",
        newPwd: "",
        repeatNewPwd: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const [isPwdVisible, setPwdIsVisible] = useState(false);
    const togglePwdVisibility = () => setPwdIsVisible(!isPwdVisible);
    const [isNewPwdVisible, setNewPwdIsVisible] = useState(false);
    const toggleNewPwdVisibility = () => setNewPwdIsVisible(!isNewPwdVisible);
    const [isRepeatNewPwdVisible, setRepeatNewPwdIsVisible] = useState(false);
    const toggleRepeatNewPwdVisibility = () =>
        setRepeatNewPwdIsVisible(!isRepeatNewPwdVisible);

    // per manejar cambis d'entrada del formulari
    const handleCurrentPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            currentPwd: e.target.value,
        });
    };
    const handleNewPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            newPwd: e.target.value,
        });
    };
    const handleRepeatNewPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            repeatNewPwd: e.target.value,
        });
    };

    // per menejar enviaments del formulari
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        console.log(formData);
    };

    return (
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
                    value="ferrran@gmail.com"
                    className="col-span-2 md:col-span-1"
                />

                <Input
                    label="Contrasenya Actual"
                    id="currentPwd"
                    value={formData.currentPwd}
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
                    value={formData.newPwd}
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
                    value={formData.repeatNewPwd}
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

                <Button type="submit" className="text-white bg-bronze-500 col-span-2 w-1/2">
                    Guardar
                </Button>
            </form>
        </div>
    );
};
