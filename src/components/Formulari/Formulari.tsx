import React, { useState,  ChangeEvent, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input, Button } from "@/utils/components";
import RoleSelector from "./RoleSelector";
import { addUsuari, getRestaurant} from '@/utils/api';
import { IRestaurant, IUsuari } from '@/utils/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons';

interface IFormData {
  nom: string;
  correu: string;
  contrasenya: string;
  rol: string; 
}

const Formulari: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    nom: '',
    correu: '',
    contrasenya: '',
    rol: ''
  });
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [usuari, setUsuari] = useState<IUsuari>();
  const { data: session } = useSession(); // Obtenir la sessió de l'usuari

  useEffect(() => {
    if (session) {
      fetch("/api/usuaris/get?email=" + session.user.email)
          .then((res) => res.json())
          .then((data) => setUsuari(data));
  }
  }, [session])

  useEffect(() => {
    if (usuari) {
      console.log("ID RESTAURANT ", usuari.restaurant.id.toString())
      getRestaurant(usuari.restaurant.id.toString())
      .then(response => {
          setRestaurant(response);
      })
      .catch((error) => {
        console.error('Error when get restaurant: ', error);
      });
    }
  }, [usuari])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí pots afegir la lògica per gestionar el formulari de registre
    console.log("RESTAURANT", restaurant)
    if (restaurant?.nif){
      afegirUsuari(formData.nom, formData.correu, formData.contrasenya, formData.rol, Number(restaurant?.nif))
      console.log('Form data submitted:', formData);
    }
  };

  const afegirUsuari = (nom: string, email: string, contrasenya: string, nomRol: string, nifRestaurant: number) => {
    console.log("NIF RESTAURANT", nifRestaurant)
    if (nom && email && contrasenya && nomRol && nifRestaurant){
      addUsuari(nom, email, contrasenya, new Date(), nomRol, nifRestaurant)
      .then(() => {
        setFormData({
          nom: '',
          correu: '',
          contrasenya: '',
          rol: ''
        });
      })
      .catch((error) => console.error('Error al afegir usuari:', error));
    }
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
          isRequired
        />

        <Input
          label="Correu Electrònic"
          name="correu"
          value={formData.correu}
          onChange={handleInputChange}
          className="col-span-2 md:col-span-1"
          isRequired
        />

        <Input
          label="Contrasenya"
          name="contrasenya"
          type="password" // Establecemos el tipo de input como "password"
          value={formData.contrasenya}
          onChange={handleInputChange}
          className="col-span-2 md:col-span-1"
          isRequired
        />

        <RoleSelector
          name="rol"
          value={formData.rol.toString()}
          onChange={handleInputChange}
        />
        
      </form>

      <div className="m-5 flex justify-center">
        <button type="submit" className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2" onClick={handleSubmit}>
            Afegir usuari <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default Formulari;
