import Header from "../header/Header";
import Articles from "../articles/Articles";
import Extra from "../extra/Extra";
import Footer from "../footer/Footer";
import { Preloader } from "../preloader/Preloader";

const HomePage = () => {
    return (
        <Preloader>
            <Header />
            <main>
                <Articles />
            </main>
            <Extra />
            <Footer />
        </Preloader>
    )
}

export default HomePage;