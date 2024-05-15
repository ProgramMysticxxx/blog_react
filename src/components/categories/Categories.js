import categoryName from '../../utils/category_name';
import { getCategoryUrl } from '../../utils/urls';
import './categories.scss';
function CategoryItem(category) {
    return (
        <li>
            <a href={getCategoryUrl(category)} className={`category category_article category_articles category_${category}`}>{categoryName[category]}</a>
        </li>
    );
}

function getCategoryText(_) {
    return "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident nulla minima quasi eveniet modi cum maiores ad nihil neque, nesciunt, earum quia veritatis sapiente omnis assumenda. Quibusdam harum hic consectetur?\nProvident quasi autem eius cupiditate corporis.Odio dolor, alias eveniet molestias rem voluptatum labore ad repellendus architecto quas.Recusandae, itaque aliquid.Laborum, quidem perferendis?";
}

export default function Categories({ category }) {

    return (
        <section className="categories">
            <div className="container container_main">
                <div className="title title_blocks title_mb-30">{categoryName[category] ?? "All Categories"}</div>
                <div className="categories__wrapper">
                    <ul className="menu categoties_menu">
                        {
                            Object.keys(categoryName).filter(key => key !== category).map((key, index) => CategoryItem(key))
                        }
                    </ul>
                    <div className="categories__text">
                        {getCategoryText(category)}
                    </div>
                </div>
                <div className="filter-panel">
                    <div className="select_category">
                            <select name="categories" value={category} >
                                <option value="all categories">All Categories</option>
                                <option value="development">Development</option>
                                <option value="administration">Administration</option>
                                <option value="design">Design</option>
                                <option value="management">Management</option>
                                <option value="marketing">Marketing</option>
                                <option value="popular_science">Popular Science</option>
                            </select>
                    </div>
                    <div className="select_rating">
                            <select name="rating">
                                <option value="rating popular">By rating from &gt; to &lt;</option>
                                <option value="rating noname">By rating from &lt; to &gt;</option>
                                <option value="number of saved">By number of saved</option>
                            </select>
                    </div>
                </div>
                <aside className='categories__aside'>
                    <h4 className='title title_aside title_mb-30'>Find an article by tag <span className='tag-count'>(310)</span></h4>
                    <ul className='menu categories__aside__list'>
                        <li>
                            <label className="checkbox">
                                <input type="checkbox" name="tag" className='real-checkbox' />
                                <span className='custom-checkbox'></span>
                                <p className="checkbox__text">Management</p>
                            </label>
                        </li>
                        <li>
                            <label className="checkbox">
                                <input type="checkbox" name="tag" className='real-checkbox' />
                                <span className='custom-checkbox'></span>
                                <p className="checkbox__text">Robot Pilosos Ultra Class Superilkd Pomichnik</p>
                            </label>
                        </li>
                        <li>
                            <label className="checkbox">
                                <input type="checkbox" name="tag" className='real-checkbox' />
                                <span className='custom-checkbox'></span>
                                <p className="checkbox__text">LoverFOnderGrameGolderBetterFunASDSD</p>
                            </label>
                        </li>
                        <li>
                            <label className="checkbox">
                                <input type="checkbox" name="tag" className='real-checkbox' />
                                <span className='custom-checkbox'></span>
                                <p className="checkbox__text">Sidebar</p>
                            </label>
                        </li>
                    </ul>
                </aside>
            </div>
        </section>
    );
}
