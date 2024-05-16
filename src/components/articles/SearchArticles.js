import categoryName from '../../utils/category_name';
import { getCategoryUrl } from '../../utils/urls';
import serch from '../../resources/img/icons/icon-search.svg';
import Articles from '../carusel/Carusel';
import '../categories/categories.scss';
import '../navbar/navbar.scss';
import { useEffect, useId, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import blogClient from '../../utils/blog_client';

export default function SearchArticles() {
    const searchId = useId();
    const [search, setSearch] = useState("");
    const [ordering, setOrdering] = useState("-updated_at");
    const [category, setCategory] = useState("all");
    const [searchParams, setSearchParams] = useSearchParams();

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    async function fetchTags() {
        const client = await blogClient.init();
        try {
            const response = await client.getTags({
                limit: Infinity,
            });

            setTags(response.data.results);
        } catch (error) {
            alert("Coult not fetch tags: " + error);
        }
    }

    useLayoutEffect(() => {
        fetchTags();
    }, []);

    useLayoutEffect(() => {
        if (searchParams.get('category'))
            setCategory(searchParams.get('category')?.toLowerCase());
        if (searchParams.get('search'))
            setSearch(searchParams.get('search'));
        if (searchParams.get('ordering'))
            setOrdering(searchParams.get('ordering')?.toLowerCase());
        if (searchParams.get('tags'))
            setSelectedTags(searchParams.get('tags')?.split(','));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        setSearchParams({
            category: category ?? undefined,
            search: search ?? undefined,
            ordering: ordering ?? undefined,
            tags: selectedTags?.join(',') ?? undefined,
        });
    }, [category, search, ordering, setSearchParams, selectedTags]);

    function handleTagSelection(e, tag) {
        if (e.target.checked) {
            setSelectedTags([...selectedTags, tag]);
        } else {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        }
    }

    return (
        <section className="categories">
            <div className="container container_main">
                <div className="title title_blocks title_mb-30">Articles</div>
                <div className="articles">
                    <aside className='categories__aside'>
                        <h4 className='title title_aside title_mb-30'>Find an article by tag <span className='tag-count'>(310)</span></h4>
                        <ul className='menu categories__aside__list'>
                            <li>
                                {
                                    tags.map(tag =>
                                        <label className="checkbox">
                                            <input type="checkbox" name="tag" className='real-checkbox' onChange={e => handleTagSelection(e, tag.name)} />
                                            <span className='custom-checkbox'></span>
                                            <p className="checkbox__text">{tag.name}</p>
                                        </label>
                                    )
                                }
                            </li>
                        </ul>
                    </aside>
                    <div className="articles_items">
                        <div className="panel">
                            <div className="search search_active panel__search">
                                <input type="text" name="search" placeholder="Type to search.." className="search__input search__input_active" id={searchId} value={search} onChange={e => setSearch(e.target.value)} />
                                <div className="search_btn search_btn_active">
                                    <img src={serch} alt="search" className="search_btn__img" />
                                </div>
                            </div>
                            <div className="panel__filter">
                                <div className="select_category">
                                    <select name="categories" value={category} onChange={e => setCategory(e.target.value)} >
                                        <option value="all">All Categories</option>
                                        <option value="development">Development</option>
                                        <option value="administration">Administration</option>
                                        <option value="design">Design</option>
                                        <option value="management">Management</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="popular_science">Popular Science</option>
                                    </select>
                                </div>
                                <div className="select_rating">
                                    <select name="rating" value={ordering} onChange={e => setOrdering(e.target.value)}>
                                        <option value="-rating">Most popular</option>
                                        <option value="rating">Less popular</option>
                                        <option value="-updated_at">Newest first</option>
                                        <option value="updated_at">Oldest first</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Articles category={category} search={search} ordering={ordering} tags={selectedTags} />
                    </div>
                </div>
            </div>
        </section>
    );
}