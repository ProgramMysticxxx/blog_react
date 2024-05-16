import { useState, useEffect, useRef } from 'react';
import './carusel.scss';
import blogClient from '../../utils/blog_client';
import { formatDate } from '../../utils/date';
import { getArticleUrl, getCategoryUrl } from '../../utils/urls';
import DOMPurify from 'dompurify';
import { extractTextContent } from '../../utils/dom_utils';
import Pagination from '../carusel/Pagination';
import { defaultPreloaderTimeout, usePreloader } from '../preloader/Preloader';

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

function Articles({
    category,
    limit = 12,
    search,
    ordering,
    tags,
}) {
    const preloader = usePreloader();

    const topRef = useRef(null);

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const [totalArticles, setTotalArticles] = useState(0);

    async function fetchArticles({
        limit,
        offset,
        category,
        search,
        ordering,
        tags,
    }) {
        const client = await blogClient.init();
        const category__name = category === "all" || !category ? undefined : category
        try {
            const response = await client.getArticles({
                limit: limit,
                offset: offset,
                category__name: category__name,
                search: search,
                ordering: ordering ?? '-updated_at',
                tags__name : tags?.join(',') ?? undefined,
            });
            const articles = response.data.results;
            setTotalArticles(response.data.count);
            setArticles(articles);
        } catch (error) {
            alert("Coult not fetch articles: " + error);
        }
    }

    useEffect(
        () => {
            fetchArticles({
                limit,
                offset,
                category,
                search,
                ordering,
                tags,
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            limit,
            offset,
            category,
            search,
            ordering,
            tags,
        ],
    );

    useEffect(() => {
        if (preloader) {
            setTimeout(() => {
                preloader.setLoading(!articles);
            }, defaultPreloaderTimeout);
        }
    }, [articles, preloader]);

    function changePage(page) {
        const newOffset = (page - 1) * limit;
        setOffset(newOffset);
        setCurrentPage(page);
        if (topRef.current) {
            topRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }



    return (
        <section class="articlesCarusel" ref={topRef}>
            <div class="articlesCarusel__items">
                {articles.map(article => Article(article))}
            </div>
            <div className="aticlesPagination">
                <Pagination
                    articlesPerPage={limit}
                    totalArticles={totalArticles}
                    currentPage={currentPage}
                    paginate={changePage}
                />
            </div>
        </section>
    );
}

export default Articles;
