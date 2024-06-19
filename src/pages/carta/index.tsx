import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { GrupsPlats } from '@/components/Carta/GrupsPlats';
import { Menu } from '@/components/Carta/Menu';
import { useSession } from 'next-auth/react';
import { getRestaurant, getRestaurantEmail } from '@/utils/api';
import { IRestaurant } from '@/utils/interfaces';

export default function carta (){
  const { data: session } = useSession(); // Obtenir la sessió de l'usuari
  console.log(session);

  const [restaurant, setRestaurant] = useState<IRestaurant>();

  useEffect(() => {
    if (session && session.user.email) {
      getRestaurantEmail(session.user.email)
      .then((response) => {
        console.log(response);
        setRestaurant(response);

      })
      .catch((error) => {
        console.error('Error fetching restaurant:', error);
      });
    }
  }, [session]);

  return (
    <Layout>
      <div className="m-2 grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-2 p-2">
        <GrupsPlats restaurant={restaurant}/>
        <Menu restaurant={restaurant}/>
      </div>    
    </Layout>
  );
};

