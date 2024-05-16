import { useEffect, useState } from "react";
import blogClient from "../../utils/blog_client";
import { getAuthHeaders } from "../../utils/auth_utils";
import { getProfileUrl } from "../../utils/urls";
import ProfileItem from "./ProfileItem";

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
        <div className="following__list">
            {profiles.map(profile => (
                <ProfileItem profile={profile} />
            ))}
        </div>
    );
}