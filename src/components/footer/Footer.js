import './footer.scss';

import email from '../../resources/img/icons/icon-email.svg';
import { getCategoryUrl } from '../../utils/urls';
import { Link } from 'react-router-dom';

function Footer() {
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__nav">
                        <div className="footer__nav__content">
                            <h3 className="title title_footer">quick links</h3>
                            <hr className="divider footer__divider divider_footer" />
                            <ul className="menu footer__nav__menu">
                                <li>
                                    <Link end to="/" className="menu__link">Home</Link>
                                </li>
                                <li>
                                    <Link end to="/categories" className="menu__link">Categories</Link>
                                </li>
                                <li>
                                    <Link end to="/bloging" className="menu__link">Bloging</Link>
                                </li>
                                <li>
                                    <Link end to="/about" className="menu__link">About</Link>
                                </li>
                                <li>
                                    <Link end to="/contacts" className="menu__link">Contacts</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__nav__content">
                            <h3 className="title title_footer">categories</h3>
                            <hr className="divider footer__divider divider_footer" />
                            <ul className="menu footer__nav__menu">
                                <li>
                                    <Link end to={getCategoryUrl('development')} className="menu__link">Development</Link>
                                </li>
                                <li>
                                    <Link end to={getCategoryUrl('administration')} className="menu__link">Administration</Link>
                                </li>
                                <li>
                                    <Link end to={getCategoryUrl('design')} className="menu__link">Design</Link>
                                </li>
                                <li>
                                    <Link end to={getCategoryUrl('management')} className="menu__link">Management</Link>
                                </li>
                                <li>
                                    <Link end to={getCategoryUrl('marketing')} className="menu__link">Marketing</Link>
                                </li>
                                <li>
                                    <Link end to={getCategoryUrl('popular_science')} className="menu__link">Popular Science</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__nav__content">
                            <h3 className="title title_footer">socials</h3>
                            <hr className="divider footer__divider divider_footer" />
                            <ul className="menu footer__nav__menu">
                                <li>
                                    <Link end to="/" className="menu__link">GitHub</Link>
                                </li>
                                <li>
                                    <Link end to="/" className="menu__link">LinkedIn</Link>
                                </li>
                                <li>
                                    <Link end to="/" className="menu__link">Telegram</Link>
                                </li>
                                <li>
                                    <Link end to="/" className="menu__link">Facebook</Link>
                                </li>
                                <li>
                                    <Link end to="/" className="menu__link">Instagram</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__contact">
                        <h3 className="title title_footer">out newsletter</h3>
                        <hr className="divider footer__divider divider_footer" />
                        <p className="footer__contact__descr">Stay updated with our Out Newsletter! Get curated articles, updates, and insights covering the latest trends in our industry. Subscribe now!</p>
                        <form action="#" className="form">
                            <img src={email} alt="email" className="form__img" />
                            <input type="text" name="email" placeholder="Email Address" className="form__input" />
                            <button type="submit" className="button button_form">send</button>
                        </form>
                    </div>
                </div>
                <div className="footer__copy">
                    © Copyright ProgramMystic 2024
                </div>
            </div>
        </footer>
    )
}

export default Footer;