import { getTokenCookie, getUsernameCookie } from "../../utils/cookie_manager";
import { getProfileUrl } from "../../utils/urls";

export default function MiniProfile() {

    function goToProfile() {
        const username = getUsernameCookie();
        username ? window.location.href = getProfileUrl(username) : window.location.href = "/signIn";
    }

    return (
        <div className="mini-profil">
            <button onClick={goToProfile} className="button button_mini-profile">Go to profile</button>
        </div>
    );
}