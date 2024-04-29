import Navbar from "../navbar/Navbar";

import './header.scss';
import userProfileImg from'../../resources/img/header/user.jpg';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                <Navbar />
                    <div className="posts header__posts">
                        <div className="posts__item posts__item_main">
                            <div className="posts__content posts__content_main">
                                <a href="/" className="category posts__category category_main category_development">code</a>
                                <h1 className="title title_main">
                                    <a href="/" className="posts__link">Mastering JavaScript: Unraveling the Wonders of Coding</a>
                                </h1>
                                <ul className="creator">
                                    <li>
                                        <a href="/" className="creator__link_img">
                                            <img src={userProfileImg} alt="profile" className="creator__img" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="creator__link creator__link_main">John Doe</a>
                                    </li>
                                    <li>
                                        <p className="creator__data creator__data_main">december 12, 2023</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="posts__item posts__item_top">
                            <div className="posts__content">
                                <a href="/" className="category posts__category category_management">management</a>
                                <h2 className="title title_mini">
                                    <a href="/" className="posts__link">Navigating the Digital Landscape: Effective Management
                                        Strategies in the IT Industry</a>
                                </h2>
                                <ul className="creator">
                                    <li>
                                        <a href="/" className="creator__link">Alex Smith</a>
                                    </li>
                                    <li>
                                        <p className="creator__data">may 17, 2024</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="posts__item posts__item_bottom">
                            <div className="posts__content">
                                <a href="/" className="category posts__category category_design">design</a>
                                <h2 className="title title_mini">
                                    <a href="/" className="posts__link">the Latest Advancements in Watch Technology</a>
                                </h2>
                                <ul className="creator">
                                    <li>
                                        <a href="/" className="creator__link">Varfalamey Altrurgerbovich</a>
                                    </li>
                                    <li>
                                        <p className="creator__data">april 2, 2024</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;