import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { Input, Button } from "@/utils/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { IGrupPlats } from "@/utils/interfaces";
import { getGrupPlats, getGrupsPlats } from "@/utils/api";


export default function editaGrupPlats (){
    const router = useRouter();
    const idGrup: string = router.asPath.split('=')[1];

    console.log("Grup", idGrup);

    // TODO: Crear estats escalables
    // Aquests estats han sigut creats per dissenyar una petita interacció, però només són de mostra
    const [name, setName] = useState('Tapes');
    const [platName, setPlatName] = useState('Patates Braves');
    const [platPreu, setPlatPreu] = useState<number>(5.5);

    const [grupsPlats, setGrupsPlats] = useState<IGrupPlats>();
    
        
    useEffect(() => {
        // TODO: agadar el id del grup des de la url
        // Coger idGrup desde la url
        getGrupPlats(1, idGrup)
        .then(response => {
            console.log(response);
            setGrupsPlats(response);
        })
        .catch((error) => {
            console.error('Error when get grupsplats: ', error);
        });
    }, [])

    // TODO: This must work for multiple plates
    const handlePlatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatName(e.target.value);
    };
    
    // TODO: This must work for multiple prices
    const handlePlatPreuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlatPreu(parseFloat(e.target.value));
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    };

    const handleSavePlat = (platId: number, platName:string, platPrice: number) => {
    };

    const handleDeletePlat = (platId: number) => {
    };

  return (
    <Layout>
        <div className=" justify-items-right">
        <h1 className="text-2xl font-bold m-2 text-center p-2">Edició del grup {grupsPlats?.nomGrup}</h1>
            <form className="justify-items-center w-full" onSubmit={handleSubmit}>
                <section className="bg-bronze-200 rounded-md m-2 p-2">
                    <Input
                        isRequired
                        label="Nom del grup"
                        value={grupsPlats?.nomGrup}
                        onChange={handleNameChange}
                    />
                </section>
                <button type="submit" className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                    Desa <FontAwesomeIcon icon={faFloppyDisk}/>
                </button>
            </form>


                {/* TODO: Properament un select d'una paleta de colors per triar el color de fons */}

                <section>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-2">Llista de plats</h2>
                    {grupsPlats?.plat.map((plat, index) => (
                        <article key={`id-${plat.id}`} className="bg-bronze-200 rounded-md m-2 grid grid-cols-2 justify-items-center gap-2 p-2">
                            <h3 className="col-span-2 font-semibold">{plat.nom}</h3>
                            <Input
                                label="Nom del plat"
                                value={plat.nom}
                                onChange={handlePlatNameChange}
                            />

                            <Input
                                type="number"
                                label="Preu"
                                value={plat.preu.toString()}
                                min={0}
                                step={0.01}
                                onChange={handlePlatPreuChange}
                                endContent={
                                    <div className="flex items-center">
                                        <span className="text-default-400 text-small">€</span>
                                    </div>
                                }
                            />

                            <button onClick={() => handleDeletePlat(plat.id)} className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                                Elimina'l <FontAwesomeIcon icon={faTrash}/>
                            </button>

                            <button onClick={() => handleSavePlat(plat.id, plat.nom, plat.preu)} className="col-span-2 bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded m-2 ml-2">
                                Desa'l <FontAwesomeIcon icon={faTrash}/>
                            </button>


                        </article>
                    ))}
                    {/* TODO: Fer la llista de plats escalable i iterable */}
                    {/* TODO: Afegir plat */}
                </section>
                
                {/* TODO: Centrar botó */}
                <Link href={`/carta`}>
                    <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mx-4 mb-4 ml-2">
                        Torna al menú <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                </Link>
        </div>    
    </Layout>
  );
};