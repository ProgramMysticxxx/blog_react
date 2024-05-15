import { useState, useEffect } from 'react';
import './carusel.scss';
import blogClient from '../../utils/blog_client';
import { formatDate } from '../../utils/date';
import { getArticleUrl, getCategoryUrl } from '../../utils/urls';
import DOMPurify from 'dompurify';
import { extractTextContent } from '../../utils/dom_utils';
import Pagination from '../carusel/Pagination';

function Article(article) {
    // Prevent XSS
    const sanitized = DOMPurify.sanitize(article.content);

    // Leave only text content
    const textContent = extractTextContent(sanitized);
    article.content = textContent;

    const {
        id,
        cover_url,
        category,
        title,
        content,
        created_at,
    } = article;

    return (
        <div class="item">
            {cover_url &&
                <div class="item__img">
                    <a href={getArticleUrl(id)}>
                        <img src={cover_url} alt="lamp" />
                    </a>
                </div>
            }
            <div class="item__wrapper">
                <p class="creator__data creator__data_article">{formatDate(created_at)}</p>
                <h3 class="title title_article"><a href={getArticleUrl(id)}>{title}</a></h3>
                <p class="item__text">{content}</p>
                <a href={getCategoryUrl(category)} class={`category category_article category_${category}`}>{category}</a>
            </div>
        </div>
    );
}

function Articles({ category }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currrentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(12);

    async function fetchArticles() {
        const client = await blogClient.init();
        const category__name = category === "all" || !category ? undefined : category
        try {
            const response = await client.getArticles({
                limit: 12,
                ordering: '-created_at',
                category__name: category__name,
            });
            const articles = response.data.results
            setArticles(articles);
        } catch (error) {
            alert("Coult not fetch articles: " + error);
        }
    }

    useEffect(
        () => {
            fetchArticles();
        },
        [],
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section class="articlesCarusel">
            <div class="articlesCarusel__items">
                {articles.map(article => Article(article))}
            </div>
            <div className="aticlesPagination">
                <Pagination 
                    articlesPerPage={articlesPerPage}
                    totalArticles={articles.length}
                    paginate={paginate}
                />
            </div>
        </section>
    );
}

export default Articles;
