import { AccessInfo } from "@/components/Profile/AccessInfo";
import { PersonalInfo } from "@/components/Profile/PersonalInfo";
import Layout from '@/components/Layout/Layout';


export default function Profile() {
    return (
        <Layout>
            <PersonalInfo />
            <AccessInfo />
        </Layout>
        
    )
}