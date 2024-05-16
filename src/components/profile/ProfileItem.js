import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { getProfileUrl } from '../../utils/urls';


export default function ProfileItem({profile}) {


    return(
        <div className="article__author">
            <div className="article__author__content">
                <img className="article__author__avatar" src={profile.avatar_url} alt="avatar" />
                <div className="article__author__wrapper">
                <div className="article__author__initial">
                    {profile.public_name && <div className="article__author__name">{profile.public_name}</div>}
                        <Link to={getProfileUrl(profile.username)} className="article__author__name">@{profile.username}</Link>
                    </div>
                    {profile.bio && <div className="article__author__bio"><span className='special_text'>Bio: </span>{profile.bio}</div>}
                </div>
            </div>
            <div className="article__author__info">
                <div className="article__author__date"><span className='special_text'>Date Joined: </span><p>{formatDate(profile.date_joined)}</p></div>
                <div className="article__author__rating"><span className='special_text'>Rating: </span><p>{profile.total_articles_rating}</p></div>
                <div className="article__author__subscribers"><span className='special_text'>Subscribers: </span><p>{profile.subscribers_count}</p></div>
            </div>
        </div>
    )
}