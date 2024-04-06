import React, { useState } from "react";
import { Input, Button } from "@/utils/components";
import RoleSelector from "./RoleSelector";

export const Formulari = () => {
  const [formData, setFormData] = useState({
    nom: "",
    cognom: "",
    correu: "",
    rol: "", // Afegim el camp 'rol' a l'estat del formulari
  });

  const [submitted, setSubmitted] = useState(false);

  // per manejar cambis d'entrada del formulari
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      <h1 className="text-xl font-bold m-2">Registre d'Usuari</h1>

      <form
        className="w-full grid grid-cols-2 justify-items-center gap-2 p-2"
        onSubmit={handleSubmit}
      >
        <Input
          label="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleInputChange}
          className="col-span-2 md:col-span-1"
        />

        <Input
          label="Cognom"
          name="cognom"
          value={formData.cognom}
          onChange={handleInputChange}
          className="col-span-2 md:col-span-1"
        />

        <Input
          label="Correu Electrònic"
          name="correu"
          value={formData.correu}
          onChange={handleInputChange}
          className="col-span-2 md:col-span-1"
        />

        {/* Afegim el selector de rol aquí */}
        <RoleSelector
          label="Rol"
          name="rol"
          value={formData.rol}
          onChange={handleInputChange}
          className="col-span-2 md:col-span-1"
        />

        <Button type="submit" className="text-white bg-bronze-500 col-span-2 w-1/2">
          Afegir
        </Button>
      </form>
    </div>
  );
};
