import { useEffect, useState } from 'react';
import './article.scss';
import blogClient from '../../utils/blog_client';
import { getAuthHeaders, isAuthorized } from '../../utils/auth_utils';
import { formatDate } from '../../utils/date';
import categoryName from '../../utils/category_name';
import iconLike from '../../resources/img/icons/like-dislike/icon-illuminate-like.png';
import iconLikeActive from '../../resources/img/icons/like-dislike/icon-illuminate-like-active.png';
import iconDisLike from '../../resources/img/icons/like-dislike/icon-illuminate-dislike.png';
import iconDisLikeActive from '../../resources/img/icons/like-dislike/icon-illuminate-dislike-active.png';
import iconBookmark from '../../resources/img/icons/icon-bookmark.svg';
import ArticleCommentList from './ArticleCommentList';
import DOMPurify from 'dompurify';
import { getArticleUrl, getCategoryUrl, getProfileUrl, getTagUrl } from '../../utils/urls';
import { timeoutPreloader, usePreloader } from '../preloader/Preloader';

export default function Article({ id }) {
    const preloader = usePreloader();
    const [article, setArticle] = useState({});

    async function fetchArticle() {
        const client = await blogClient.init();
        try {
            const response = await client.getArticle({
                id: id,
            }, {}, getAuthHeaders());
            const article = response.data;
            // Prevent XSS
            article.content = DOMPurify.sanitize(article.content);
            setArticle(article);
        } catch (error) {
            alert("Could not fetch article: " + error);
        } finally {
            timeoutPreloader(preloader, false);
        }
    }

    async function changeRate(rate) {
        if (!isAuthorized()) {
            alert("You have to login into your account to proceed this action");
            return;
        }

        const client = await blogClient.init();
        try {
            let response = null;
            if (rate === true || rate === false) {
                response = await client.rateArticle(
                    { id: id, },
                    {
                        is_positive: rate,
                    },
                    getAuthHeaders(),
                );
            } else {
                response = await client.unrateArticle(
                    {
                        id: id,
                    },
                    {},
                    getAuthHeaders(),
                );
            }
            let newRating = article.rating;
            // ⚠️ GOVNO CODE ⚠️
            if (rate === true) {
                if (article.your_rate === false) {
                    newRating += 1;
                }
                newRating += 1;
            } else if (rate === false) {
                if (article.your_rate === true) {
                    newRating -= 1;
                }
                newRating -= 1;
            } else {
                if (article.your_rate === true) {
                    newRating -= 1;
                } else if (article.your_rate === false) {
                    newRating += 1;
                }
            }
            //////////////////////////////////////////
            const newArticle = { ...article, your_rate: rate, rating: newRating };
            setArticle(newArticle);
        } catch (error) {
            alert("Could not change rating: " + error);
        }
    }

    async function like() {
        if (article.your_rate === true) {
            await changeRate(null);
        } else {
            await changeRate(true);
        }
    }

    async function dislike() {
        if (article.your_rate === false) {
            await changeRate(null);
        } else {
            await changeRate(false);
        }
    }

    async function toggleBookmark() {
        if (!isAuthorized()) {
            alert("You have to login into your account to proceed this action");
            return;
        }

        const client = await blogClient.init();
        try {
            if (article.is_your_bookmark) {
                await client.unfavoriteArticle({
                    id: id,
                }, {}, getAuthHeaders());
            } else {
                await client.favoriteArticle({
                    id: id,
                }, {}, getAuthHeaders());
            }
            const newArticle = { ...article, is_your_bookmark: !article.is_your_bookmark };
            setArticle(newArticle);
        } catch (error) {
            alert("Could not change bookmark: " + error);
        }
    }

    async function deleteArticle() {
        const client = await blogClient.init();
        try {
            await client.deleteArticle({ id: article.id }, {}, getAuthHeaders());
            window.location = '/';
        } catch (error) {
            alert("Could not delete article: " + error);
        }
    }

    useEffect(
        () => {
            fetchArticle();
        },
        [],
    );

    function editArticle() {
        window.location = getArticleUrl(article.id) + '/edit';
    }

    return (
        <section className="article">
            <div className="container container_main">
                <div className="title title_blocks title_mb-10">
                    {article.title}
                </div>
                <div className="article__info">
                    <div className="article__date">{formatDate(article.updated_at)}</div>
                    <div className={`category category_article category_${article.category}`} onClick={() => window.location = getCategoryUrl(article.category)}>{categoryName[article.category]}</div>
                </div>
                {article.cover_url &&
                    <div class="article__cover__wrapper">
                        <img className="article__cover" src={article.cover_url} alt="cover" />
                    </div>
                }
                <div className="article__content">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
                <div className="article__panel">
                    <div className="rate">
                        <img onClick={like} src={article.your_rate === true ? iconLikeActive : iconLike} alt="like" className="rate__like" />
                        <img onClick={dislike} src={article.your_rate === false ? iconDisLikeActive : iconDisLike} alt="dislike" className="rate__dislike" />
                        <div className="rate__rating">{article.rating}</div>
                        <img onClick={toggleBookmark} src={iconBookmark} alt="bookmark" className="rate__bookmark" style={{ background: article.is_your_bookmark && "yellow" }} />
                    </div>
                    <div className="change-article">
                        {article.you_author && <button onClick={editArticle} className="button button_change button_edit">Edit Article</button>}
                        {article.you_author && <button onClick={deleteArticle} className="button button_change button_delete">Delete Article</button>}
                    </div>
                </div>
                <div>
                    <h3 className="title">Post Author</h3>
                    <hr className="divider divider_author" />
                    <div className="article__author">
                        <div>
                            <img className="article__author__avatar" src={article.author_details?.avatar_url} alt="avatar" />
                        </div>
                        <div className="article__author__info">
                            {article.author_details?.public_name && <div className="article__author__name">{article.author_details?.public_name}</div>}
                            <a href={getProfileUrl(article.author_details?.username)} className="article__author__name">@{article.author_details?.username}</a>
                            {article.author_details?.bio && <div className="article__author__bio"><b>Bio: </b>{article.author_details?.bio}</div>}
                            <div className="article__author__date"><b>Date Joined: </b>{formatDate(article.author_details?.date_joined)}</div>
                            <div className="article__author__rating"><b>Rating: </b>{article.author_details?.total_articles_rating}</div>
                            <div className="article__author__subscribers"><b>Subscribers: </b>{article.author_details?.subscribers_count}</div>
                        </div>
                    </div>
                </div>
                <div className="article__tags">
                    <h3 className="title">Post Tags</h3>
                    <hr className="divider divider_tegs" />
                    <div className='article__tagsbox'>
                        {article.tags && article.tags.map(tag => <a className="article__tags__link" href={getTagUrl(tag)}>#{tag}</a>)}
                    </div>
                </div>
                <ArticleCommentList article_id={id} />
            </div>
        </section>
    );
}
