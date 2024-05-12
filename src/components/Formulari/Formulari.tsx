import React, { useState } from "react";
import { Input, Button } from "@/utils/components";
import RoleSelector from "./RoleSelector";
import { getUsuaris, getUsuari, deleteUsuari, addUsuari} from '@/utils/api';
import { IUsuari } from '@/utils/interfaces';

export const Formulari = () => {
  const [formData, setFormData] = useState({
    nom: "",
    cognom: "",
    correu: "",
    rol: "",
    contrasenya: "" // Inicializado con una cadena vacía
    
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

  const afegirUsuari = (nom: string, email: string, contrasenya: string, dataCreacioUsuari:Date, idRol: number) => {
    addUsuari(nom, email, contrasenya, dataCreacioUsuari, idRol)
      .then(() => {
        getUsuaris()
          .then((data) => {
            setUsuaris(data);
          })
          .catch((error) => console.error('Error al cargar usuarios:', error));
      })
      .catch((error) => console.error('Error al afegir usuari:', error));
  }

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

        <Input
          label="Contrasenya"
          name="contrasenya"
          type="password" // Establecemos el tipo de input como "password"
          value={formData.contrasenya}
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

        <Button onClick={() => afegirUsuari(formData.nom, formData.correu, formData.contrasenya, new Date(), formData.rol)} type="submit" className="text-white bg-bronze-500 col-span-2 w-1/2">
          Afegir
        </Button>

      </form>
    </div>
  );
};
