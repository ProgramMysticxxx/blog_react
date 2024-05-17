import { useEffect, useState } from "react";
import blogClient from "../../utils/blog_client";
import { getTokenCookie } from "../../utils/cookie_manager";
import { getArticleUrl } from "../../utils/urls";
import ItemProfile from "./ItemProfile";
import articleNotCreated from "../../resources/img/icons/plugs/article-not-created.svg";
import noArticlesSaved from "../../resources/img/icons/plugs/no-articles-saved.svg";

function ProfileArticleItem(article) {

    return (
        <>
            <ItemProfile article={article} />
            {/* <a href={getArticleUrl(article.id)}>{article.title}</a> */}
        </>
    );
}

export default function ProfileArticlesList({ username, favorited }) {
    const [articles, setArticles] = useState([]);

    async function fetchUserArticles() {
        const client = await blogClient.init();
        try {
            const response = await client.getArticles({
                limit: 10,
                ordering: '-created_at',
                author__username: username,
                favorited: favorited ? true : undefined,
            }, null, getTokenCookie() ? {
                headers: {
                    'Authorization': `Token ${getTokenCookie()}`,
                }
            } : null);
            setArticles(response.data.results);
        } catch (error) {
            alert("Coult not fetch articles: " + error);
        }
    }

    useEffect(() => {
        fetchUserArticles();
    }, []);

    return (
        <div>
            { articles.length === 0 &&
                <img src={favorited ? noArticlesSaved : articleNotCreated} alt="no articles saved" />
            }
            <div className="articles__list">
                {articles.map((article, _) => ProfileArticleItem(article))}
            </div>
        </div>
    );
}