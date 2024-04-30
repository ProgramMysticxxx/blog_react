import NavbarMigration from '../navbar/NavbarMigration';
import Categories from '../categories/Categories';
import Articles from '../articles/Articles';
import Extra from "../extra/Extra";
import Footer from "../footer/Footer";

const CategoriesPage = () => {
    return(
        <>
            <NavbarMigration />
            <main>
                <Categories />
                <Articles />
            </main>
            <Extra />
            <Footer />
        </>
    )
}

export default CategoriesPage;