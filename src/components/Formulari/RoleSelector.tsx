import React,  { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';

import { getRols } from "@/utils/api";
import { IRol } from '@/utils/interfaces';

interface RoleSelectorProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ name, value, onChange }) => {
  const [rols, setRols] = useState<IRol[]>([]);

  useEffect(() => {
    getRols()
    .then(response => {
        setRols(response);
    })
    .catch((error) => {
      console.error('Error when get rols: ', error);
    });
  }, [])

  return (
    <Select label="Rol" isRequired name="rol" value={value} onChange={onChange}  className="col-span-2 md:col-span-1">
      {rols && rols.map((rol) => {
              return (
                <SelectItem key={rol.nomRol} value={rol.nomRol}>
                  {rol.nomRol}
                </SelectItem>
              );
            })}
    </Select>
  );
};

export default RoleSelector;
