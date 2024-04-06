import { useState } from "react";
import Layout from '@/components/Layout/Layout';
import { Input, Button } from "@/utils/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function editaGrupPlats (){

    // TODO: Crear estats escalables
    // Aquests estats han sigut creats per dissenyar una petita interacció, però només són de mostra
    const [name, setName] = useState('Tapes');
    const [platName, setPlatName] = useState('Patates Braves');
    const [platPreu, setPlatPreu] = useState<number>(5.5);

    const handlePlatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatName(e.target.value);
    };
    
    const handlePlatPreuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatPreu(parseFloat(e.target.value));
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

  return (
    <Layout>
        <div>
            <h1 className="text-2xl font-bold m-2 text-center p-2">Edició del grup</h1>
            <form className="justify-items-center w-full" onSubmit={handleSubmit}>
                <section className="bg-bronze-200 rounded-md m-2 p-2">
                    <Input
                        isRequired
                        label="Nom del grup"
                        value={name}
                        onChange={handleNameChange}
                    />
                </section>

                {/* TODO: Properament un select d'una paleta de colors per triar el color de fons */}

                <section>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista de plats</h2>
                    <article className="bg-bronze-200 rounded-md m-2 grid grid-cols-2 justify-items-center gap-2 p-2">
                        <h3 className="col-span-2 font-semibold">{platName}</h3>
                        <Input
                            label="Nom del plat"
                            value={platName}
                            onChange={handlePlatNameChange}
                        />

                        <Input
                            type="number"
                            label="Preu"
                            placeholder="0.00"
                            value={platPreu.toString()}
                            min={0}
                            onChange={handlePlatPreuChange}
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">€</span>
                                </div>
                            }
                        />

                        <button className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                            Elimina'l <FontAwesomeIcon icon={faTrash}/>
                        </button>

                    </article>
                    {/* TODO: Fer la llista de plats escalable i iterable */}
                    {/* TODO: Afegir plat */}
                </section>

                {/* TODO: Centrar botó */}
                <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                    Guarda
                </button>
            </form>
        </div>    
    </Layout>
  );
};