import './articles.scss';
import Carusel from '../carusel/Carusel';

export default function Articles() {

    return (
        <section className='articles'>
            <div className="container container_main">
                <Carusel />
            </div>
        </section>
    );
}