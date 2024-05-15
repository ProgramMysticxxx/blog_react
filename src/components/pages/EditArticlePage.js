import { useParams } from "react-router-dom";
import NavbarMigration from "../navbar/NavbarMigration";
import Bloging from "../bloging/Bloging";
import React from "react";
import Extra from "../extra/Extra";
import Footer from "../footer/Footer";


export default function EditArticlePage() {
    const { id } = useParams();
    return (
        <>
            <NavbarMigration />
            <main>
                <Bloging id={id} />
            </main>
            <Extra />
            <Footer />
        </>
    );
}