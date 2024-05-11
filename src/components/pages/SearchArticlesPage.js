import SearchArticles from "../articles/SearchArticles";
import Extra from "../extra/Extra";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import NavbarMigration from "../navbar/NavbarMigration";

export default function SearchArticlesPage() {
    return (
        <>
            <NavbarMigration />
            <main>
                <SearchArticles />
            </main>
            <Extra />
            <Footer />
        </>
    );
}