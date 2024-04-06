import React from 'react';
import Layout from '@/components/Layout/Layout';
import { GrupsPlats } from '@/components/Carta/GrupsPlats';
import { Menu } from '@/components/Carta/Menu';

export default function carta (){
  return (
    <Layout>
      <div className="m-2 grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-2 p-2">
        <GrupsPlats />
        <Menu />
      </div>    
    </Layout>
  );
};

