import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const RoleSelector: React.FC = () => {
  return (
    <Select label="Rol" className="col-span-2 md:col-span-1">
      <SelectItem value="Cambrer">Cambrer</SelectItem>
      <SelectItem value="Cuiner">Cuiner</SelectItem>
    </Select>
  );
};

export default RoleSelector;
