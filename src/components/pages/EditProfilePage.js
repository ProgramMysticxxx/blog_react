import EditProfile from "../profile/EditProfile";
import NavbarMigration from "../navbar/NavbarMigration";
import Extra from "../extra/Extra";
import Footer from "../footer/Footer";
import { useParams } from "react-router-dom";
import { Preloader } from "../preloader/Preloader";

export default function EditProfilePage() {
    const { username } = useParams();
    return (
        <Preloader>
            <NavbarMigration />
            <main>
                <EditProfile username={username} />
            </main>
            <Extra />
            <Footer />
        </Preloader>
    );
}