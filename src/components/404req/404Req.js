import './404req.scss';
import ilumEye from '../../resources/img/icons/icon-cartoon-eye.svg';

export default function NotFound() {

    return (
        <div className="notfound">
            <div className="container">
                <div className="notfound__wrapper">
                    <h1 className="notfound__title">404</h1>
                    <p className="notfound__text">Page not found</p>
                    <img className='notfound__img' src={ilumEye} alt="eye" />
                    <img className='notfound__img2' src={ilumEye} alt="eye" />
                    <img className='notfound__img3' src={ilumEye} alt="eye" />
                </div>
            </div>
        </div>
    );
}