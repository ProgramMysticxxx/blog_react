import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { getProfileUrl } from '../../utils/urls';
import iconIncognito from '../../resources/img/icons/icon-incognito.svg';

export default function ProfileItem({ profile, context }) {
  const getClass = (baseClass) => `${baseClass} ${baseClass}_${context}`;

  return (
    <div className={getClass("article__author")}>
      <div className={getClass("article__author__content")}>
        <img className={getClass("article__author__avatar")} src={profile.avatar_url ?? iconIncognito} alt="avatar" />
        <div className="article__author__wrapper">
          <div className="article__author__initial">
            {profile.public_name && <div className={getClass("article__author__name")}>{profile.public_name}</div>}
            <a href={getProfileUrl(profile.username)} className={getClass("article__author__name")}>@{profile.username}</a>
          </div>
          {profile.bio && <div className={getClass("article__author__bio")}>{profile.bio}</div>}
        </div>
      </div>
      <div className={getClass("article__author__info")}>
        <div className={getClass("article__author__date")}><span className={getClass("special_text")}>Date Joined: </span><p className='prof'>{formatDate(profile.date_joined)}</p></div>
        <div className={getClass("article__author__rating")}><span className={getClass("special_text")}>Rating: </span><p className='prof'>{profile.total_articles_rating}</p></div>
        <div className={getClass("article__author__subscribers")}><span className={getClass("special_text")}>Subscribers: </span><p className='prof'>{profile.subscribers_count}</p></div>
      </div>
    </div>
  );
}
