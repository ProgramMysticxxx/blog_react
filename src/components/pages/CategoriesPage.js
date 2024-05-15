import NavbarMigration from '../navbar/NavbarMigration';
import Categories from '../categories/Categories';
import Extra from "../extra/Extra";
import Footer from "../footer/Footer";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoriesPage() {
    let { category: initialCategory } = useParams();
    initialCategory ??= "all";
    const [category, setCategory] = useState(initialCategory);
    return (
        <>
            <NavbarMigration />
            <main>
                <Categories category={category} setCategory={setCategory} />
            </main>
            <Extra />
            <Footer />
        </>
    );
}

