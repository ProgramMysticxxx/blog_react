import './extra.scss';

import popPost_1 from '../../resources/img/pop-posts/pop-post_1.jpg';
import popPost_2 from '../../resources/img/pop-posts/pop-post_2.jpg';
import popPost_3 from '../../resources/img/pop-posts/pop-post_3.jpg';
import popPost_4 from '../../resources/img/pop-posts/pop-post_4.jpg';
import popPost_5 from '../../resources/img/pop-posts/pop-post_5.jpg';
import popPost_6 from '../../resources/img/pop-posts/pop-post_6.jpg';

import social_1 from '../../resources/img/icons/social/github.svg';
import social_2 from '../../resources/img/icons/social/telegram.svg';
import social_3 from '../../resources/img/icons/social/facebook.svg';
import social_4 from '../../resources/img/icons/social/instagram.svg';
import social_5 from '../../resources/img/icons/social/x.svg';

function Extra() {
    return(
        <section className="extra">
            <div className="container">
                <div className="extra__wrapper">
                    <div className="popular-posts">
                        <h2 className="title title_extra">Popular Posts</h2>
                        <div className="popular-posts__items">
                            <div className="pop-post">
                                <a href="/" className="pop-post__img">
                                    <img src={popPost_1} alt="man" />
                                </a>
                                <div className="pop-post__content">
                                    <h3 className="title title_pop-post">
                                        <a href="/" className="pop-post__link">
                                            5 Must-Know Tips for Debugging Your Code Like a Pro
                                        </a>
                                    </h3>
                                    <ul className="creator creator_pop-post">
                                        By
                                        <li>
                                            <a href="/" className="creator__link creator__link_pop-post">John Doe</a>
                                        </li>
                                        on
                                        <li>
                                            <p className="creator__data creator__data_pop-post">mar 23, 2024</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pop-post">
                                <a href="/" className="pop-post__img">
                                    <img src={popPost_2} alt="man" />
                                </a>
                                <div className="pop-post__content">
                                    <h3 className="title title_pop-post">
                                        <a href="/" className="pop-post__link">
                                            Exploring the Power of Functional Programming Paradigm
                                        </a>
                                    </h3>
                                    <ul className="creator creator_pop-post">
                                        By
                                        <li>
                                            <a href="/" className="creator__link creator__link_pop-post">Emily Johnson</a>
                                        </li>
                                        on
                                        <li>
                                            <p className="creator__data creator__data_pop-post">mar 4, 2024</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pop-post">
                                <a href="/" className="pop-post__img">
                                    <img src={popPost_3} alt="man" />
                                </a>
                                <div className="pop-post__content">
                                    <h3 className="title title_pop-post">
                                        <a href="/" className="pop-post__link">
                                            Demystifying Machine Learning: A Beginner's Guide
                                        </a>
                                    </h3>
                                    <ul className="creator creator_pop-post">
                                        By
                                        <li>
                                            <a href="/" className="creator__link creator__link_pop-post">Alexander Lee</a>
                                        </li>
                                        on
                                        <li>
                                            <p className="creator__data creator__data_pop-post">feb 29, 2024</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pop-post">
                                <a href="/" className="pop-post__img">
                                    <img src={popPost_4} alt="man" />
                                </a>
                                <div className="pop-post__content">
                                    <h3 className="title title_pop-post">
                                        <a href="/" className="pop-post__link">
                                            The Rise of Low-Code Development: Revolutionizing Software Creation
                                        </a>
                                    </h3>
                                    <ul className="creator creator_pop-post">
                                        By
                                        <li>
                                            <a href="/" className="creator__link creator__link_pop-post">Samantha Carter</a>
                                        </li>
                                        on
                                        <li>
                                            <p className="creator__data creator__data_pop-post">feb 17, 2024</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pop-post">
                                <a href="/" className="pop-post__img">
                                    <img src={popPost_5} alt="man" />
                                </a>
                                <div className="pop-post__content">
                                    <h3 className="title title_pop-post">
                                        <a href="/" className="pop-post__link">
                                            Mastering Data Structures and Algorithms: A Roadmap for Success
                                        </a>
                                    </h3>
                                    <ul className="creator creator_pop-post">
                                        By
                                        <li>
                                            <a href="/" className="creator__link creator__link_pop-post">Daniel Thompson</a>
                                        </li>
                                        on
                                        <li>
                                            <p className="creator__data creator__data_pop-post">feb 8, 2024</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pop-post">
                                <a href="/" className="pop-post__img">
                                    <img src={popPost_6} alt="man" />
                                </a>
                                <div className="pop-post__content">
                                    <h3 className="title title_pop-post">
                                        <a href="/" className="pop-post__link">
                                            The Future of Web Development: Trends to Watch in 2024
                                        </a>
                                    </h3>
                                    <ul className="creator creator_pop-post">
                                        By
                                        <li>
                                            <a href="/" className="creator__link creator__link_pop-post">Olivia Williams</a>
                                        </li>
                                        on
                                        <li>
                                            <p className="creator__data creator__data_pop-post">jan 29, 2024</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-us">
                        <h2 className="title title_extra">about ProgramMystic</h2>
                        <p className="about-us__descr">
                            Welcome to ProgramMystic, your trusted companion in programming. We discuss relevant topics, trends, and tools, from basics to advanced tech. Join our community for learning and interaction. Explore and deepen your programming knowledge with us. Embark on the ProgramMystic journey!
                        </p>
                        <ul className="social about-us__social">
                            <a href="/" className="social__link">
                                <img src={social_1} alt="github" className="social__img" />
                            </a>
                            <a href="/" className="social__link">
                                <img src={social_2} alt="telegram" className="social__img" />
                            </a>
                            <a href="/" className="social__link">
                                <img src={social_3} alt="facebook" className="social__img" />
                            </a>
                            <a href="/" className="social__link">
                                <img src={social_4} alt="instagram" className="social__img" />
                            </a>
                            <a href="/" className="social__link">
                                <img src={social_5} alt="x" className="social__img" />
                            </a>
                        </ul>
                    </div>
                </div>
                <div className="tags extra__tags">
                    <h2 className="title title_extra">tags</h2>
                    <ul className="menu tags__list">
                        <li><a href="/" className="tags__link">#Programming</a></li>
                        <li><a href="/" className="tags__link">#Coding</a></li>
                        <li><a href="/" className="tags__link">#SoftwareDevelopment</a></li>
                        <li><a href="/" className="tags__link">#TechBlogs</a></li>
                        <li><a href="/" className="tags__link">#WebDevelopment</a></li>
                        <li><a href="/" className="tags__link">#ProgrammingLanguages</a></li>
                        <li><a href="/" className="tags__link">#DeveloperTips</a></li>
                        <li><a href="/" className="tags__link">#CodeSnippets</a></li>
                        <li><a href="/" className="tags__link">#ProgrammingCommunity</a></li>
                        <li><a href="/" className="tags__link">#TechNews</a></li>
                        <li><a href="/" className="tags__link">#ComputerScience</a></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Extra;
