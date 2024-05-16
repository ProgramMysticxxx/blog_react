import SearchArticles from "../articles/SearchArticles";
import Extra from "../extra/Extra";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import NavbarMigration from "../navbar/NavbarMigration";
import { Preloader } from "../preloader/Preloader";

export default function SearchArticlesPage() {
    return (
        <Preloader>
            <NavbarMigration />
            <main>
                <SearchArticles />
            </main>
            <Extra />
            <Footer />
        </Preloader>
    );
}