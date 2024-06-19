import Formulari from "@/components/Formulari/Formulari";
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';


export default function AfegirUsuari() {
    return (
        <Layout>
            <Formulari />
            <div className="m-5 flex justify-center">
                <Link href={`/personal`}>
                    <button className="bg-brown-600 hover:bg-brown-500 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
                        Torna al personal <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
            </div>
        </Layout>
        
    )
}


