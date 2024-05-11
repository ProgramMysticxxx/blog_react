import Articles from "./Articles";
import './search_articles.scss';

export default function SearchArticles() {
    return (
        <div>
            <div className="search-articles">
                <input type="text" placeholder="Search articles" />
                <button>Search</button>
            </div>
            <div className="articles-order">
                <select>
                    <option>Relevance</option>
                    <option>Date</option>
                    <option>Rating</option>
                </select>
                <select>
                    <option>Ascending</option>
                    <option>Descending</option>
                </select>
            </div>
            <Articles />
        </div>
    );
}