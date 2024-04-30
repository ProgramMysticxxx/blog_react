import './profile.scss';

import { useState, useEffect, act } from 'react';
import blogClient from '../../utils/blog_client';
import { getProfileUrl } from '../../utils/urls';
import { formatDate } from '../../utils/date';
import { deleteTokenCookie, deleteUsernameCookie, getTokenCookie } from '../../utils/cookie_manager';
import illuminatiIcon from '../../resources/img/icons/icon-illuminati.svg';
import ProfileTabs from './ProfileTabs';
import EmptyPlaceholder from './EmptyPlaceholder';
import ProfileArticlesList from './ProfileArticlesList';
import ProfileFollowingList from './ProfileFollowingList';

export default function Profile({ username }) {
    const [profile, setProfile] = useState([]);

    function logout() {
        deleteTokenCookie();
        deleteUsernameCookie();
        window.location.href = "/";
    }

    async function fetchProfile() {
        const client = await blogClient.init();
        try {
            const response = await client.getProfile({ username: username }, null, getTokenCookie() ? {
                headers: {
                    'Authorization': `Token ${getTokenCookie()}`,
                }
            } : null);
            setProfile(response.data);
        } catch (error) {
            alert("Coult not fetch profile: " + error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);


    function clickOnBtn() {
        const profileBtns = document.querySelectorAll('.button_profile');

        profileBtns.forEach(button => {
            button.addEventListener('click', () => {
                profileBtns.forEach(btn => {
                    if (btn.classList.contains('button_profile_active')) {
                        btn.classList.remove('button_profile_active');
                    }
                });
                button.classList.add('button_profile_active');
            });
        });
    }

    const [activeTab, setActiveTab] = useState(0);
    const whats = [
        "Articles",
        "Bookmarks",
        "Following",
    ];


    return (
        <section className="profile">
            <div className="container container_main">
                <div className="profile__wrapper">
                    <div className="profile__main">
                        <div className="profile__char">
                            <img src={profile.avatar_url} className="profile__img" />
                            <div className="profile__about">
                                <div className="profile__initial">
                                    {profile.public_name && <div className="profile__pablicname">{profile.public_name}</div>}
                                    <a href={getProfileUrl(profile.username)} className="profile__username">@{profile.username}</a>
                                </div>
                                <p className="profile__text">{profile.bio}</p>
                            </div>
                            {!profile.is_you && <button className="button button_follow">Follow</button>}
                            {profile.is_you && <button className="button button_follow" onClick={logout}>Logout</button>}
                        </div>
                        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} isYou={profile.is_you} />
                    </div>
                    <aside className="aside profile__aside">
                        <div className="title title_aside">INFORMATION</div>
                        <hr className="divider" />
                        <div className="aside__info">
                            <h5 className="title title_aside title_plus">Rating:</h5>
                            <p className="aside__descr">{profile.total_articles_rating}</p>
                            <h5 className="title title_aside title_plus">Registered:</h5>
                            <p className="aside__descr">{formatDate(profile.date_joined)}</p>
                            {/* <h5 className="title title_aside title_plus">Activity:</h5>
                            <p className="aside__descr">today at 23:26</p> */}
                        </div>
                    </aside>
                    {activeTab == 0 && <ProfileArticlesList username={username} />}
                    {activeTab == 1 && <ProfileArticlesList username={username} favorited={true} />}
                    {activeTab == 2 && <ProfileFollowingList username={username} />}
                    {/* <EmptyPlaceholder what={whats[activeTab]} /> */}
                </div>
            </div>
        </section>
    );
}