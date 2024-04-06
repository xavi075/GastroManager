import { useState } from "react";
import { Input } from "@/utils/components";

export const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
  });

  return (
    <div className="bg-bronze-200 rounded-md m-2 grid grid-cols-2 justify-items-center gap-2 p-2">
      <h1 className="text-xl font-bold m-2 col-span-2">Dades personals</h1>
      <Input
        isReadOnly
        type="text"
        label="Nom"
        value="Ferran Casanovas"
        className="col-span-2 md:col-span-1"
      />
      <Input
        isReadOnly
        type="text"
        label="Rol"
        value="Administrador"
        className="col-span-2 md:col-span-1"
      />
    </div>
  );
};
