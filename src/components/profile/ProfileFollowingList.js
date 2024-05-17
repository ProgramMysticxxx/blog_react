import { useEffect, useState } from "react";
import blogClient from "../../utils/blog_client";
import { getAuthHeaders } from "../../utils/auth_utils";
import { getProfileUrl } from "../../utils/urls";
import ProfileItem from "./ProfileItem";
import noFollowing from "../../resources/img/icons/plugs/no-following.svg";

export default function ProfileFollowingList() {
    const [profiles, setProfiles] = useState([]);

    async function fetchUserFollowings() {
        const client = await blogClient.init();
        try {
            const response = await client.getProfiles({
                ordering: '-total_articles_rating',
                subscribed: true,
            }, {}, getAuthHeaders());
            setProfiles(response.data.results);
        } catch (error) {
            alert("Coult not fetch following profiles: " + error);
        }
    }

    useEffect(() => {
        fetchUserFollowings();
    }, []);

    return (
        <div>
            { profiles.length === 0 &&
                <img src={noFollowing} alt="no following" />
            }
            <div style={{ display: "flex", flexDirection: "column" }}>
                {profiles.map(profile => (
                    <div className="following__list following__list_profile">
                        <ProfileItem profile={profile} context="profile" />
                    </div>
                ))}
            </div>
        </div>
    );
}