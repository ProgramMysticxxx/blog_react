import { useEffect, useState } from "react";
import blogClient from "../../utils/blog_client";

export default function ProfileFollowingList({ username }) {
    const [articles, setArticles] = useState([]);

    async function fetchUserArticles() {

    }

    useEffect(() => {
        fetchUserArticles();
    }, []);

    return (
        <></>
    );
}