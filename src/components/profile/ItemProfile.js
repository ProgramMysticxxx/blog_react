import { Link } from 'react-router-dom';
import itemIMG from '../../resources/img/pop-posts/pop-post_3.jpg';
import { getArticleUrl } from '../../utils/urls';

export default function ItemProfile({article}) {

    return(
        <div className="pop-post pop-post_items">
            <Link to="/" className="pop-post__img pop-post__img_items">
                <span style={{background: `url(${article.cover_url}) center center/cover no-repeat`}}></span>
            </Link>
            <div className="pop-post__content">
                <h3 className="title">
                    <Link to={getArticleUrl(article.id)} className="pop-post__link pop-post__link_items">{article.title}</Link>
                </h3>
                <div className="creator creator_pop-post">
                    <Link to="/" className="creator__link creator__link_pop-post"></Link>
                    <ul>
                        <li>
                            <h4 className="title title_items">Stats: </h4>
                            <p className="creator__stats creator__stats_pop-post">total: {article.rating}</p>
                            <p className="creator__stats creator__stats_pop-post">likes: {article.ratings_count.positive}</p>
                            <p className="creator__stats creator__stats_pop-post">dislikes: {article.ratings_count.negative}</p>
                            {/* <p className="creator__stats creator__stats_pop-post">bookmarks: 0</p> */}
                            {/* <p className="creator__stats creator__stats_pop-post">comments: 0</p> */}
                        </li>
                        {/* <li>
                            <h4 className="title title_items">Status: </h4>
                            <p className="creator__status creator__status_pop-post">edited</p>
                        </li> */}
                        <li>
                            <p className="creator__data_items creator__data_pop-post">16.05.2024, 12:02</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}