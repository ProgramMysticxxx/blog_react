import './profile.scss';

const Profile = () => {

    function clickOnBtn() {
        const profileBtns = document.querySelectorAll('.button_profile');
        
        profileBtns.forEach(button => {
            button.addEventListener('click', () => {
                profileBtns.forEach(btn => {
                    if(btn.classList.contains('button_profile_active')) {
                        btn.classList.remove('button_profile_active')
                    }
                })
            button.classList.add('button_profile_active');
            })
        });
    }


    return(
        <section className="profile">
            <div className="container container_main">
                <div className="profile__wrapper">
                    <div className="profile__main">
                        <div className="profile__char">
                            <img src="img/icons/icon-incognito.svg" alt="inkognito" className="profile__img" />
                            <div className="profile__about">
                                <div className="profile__initial">
                                    <div className="profile__pablicname">Nazar Talaievych</div>
                                    <a href="/" className="profile__username">@xsolutionxxx</a>
                                </div>
                                <p className="profile__text">User. Frontend developer</p>
                            </div>
                            <button className="button button_follow">Follow</button>
                        </div>
                        <ul className="menu profile_menu">
                            <li>
                                <button className="button button_profile button_profile_active">PROFILE</button>
                            </li>
                            <li>
                                <button className="button button_profile">PUBLICATIONS</button>
                            </li>
                            <li>
                                <button className="button button_profile">BOOKMARKS</button>
                            </li>
                            <li>
                                <button className="button button_profile">FOLLOWERS</button>
                            </li>
                            <li>
                                <button className="button button_profile">FOLLOWING</button>
                            </li>
                        </ul>
                        <hr className="divider divider_profile" />
                    </div>
                    <aside className="aside profile__aside">
                        <div className="title title_aside">INFORMATION</div>
                        <hr className="divider" />
                        <div className="aside__info">
                            <h5 className="title title_aside title_plus">Rating:</h5>
                            <p className="aside__descr">Does not participate</p>
                            <h5 className="title title_aside title_plus">Registered:</h5>
                            <p className="aside__descr">March 31</p>
                            <h5 className="title title_aside title_plus">Activity:</h5>
                            <p className="aside__descr">today at 23:26</p>
                        </div>
                    </aside>
                    <div className="profile__activity">
                        <img src="img/icons/illuminati.svg" alt="elumenat" />
                        <p className="profile__activity__info">Unfortunately there are no publications here yet</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;