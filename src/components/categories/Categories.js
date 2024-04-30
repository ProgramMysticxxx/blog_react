import './categories.scss';

const Categories = () => {
    return(
        <section className="categories">
            <div className="container container_main">
                <div className="title title_blocks title_mb-30">All Categories</div>
                <div className="categories__wrapper">
                    <ul className="menu categoties_menu">
                        <li>
                            <a href="/" className="category category_article category_development">Development</a>
                        </li>
                        <li>
                            <a href="/" className="category category_article category_administration">Administration</a>
                        </li>
                        <li>
                            <a href="/" className="category category_article category_design">Design</a>
                        </li>
                        <li>
                            <a href="/" className="category category_article category_management">Management</a>
                        </li>
                        <li>
                            <a href="/" className="category category_article category_marketing">Marketing</a>
                        </li>
                        <li>
                            <a href="/" className="category category_article category_popular-science">Popular Science</a>
                        </li>
                    </ul>
                    <div className="categories__text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident nulla minima quasi eveniet modi cum maiores ad nihil neque, nesciunt, earum quia veritatis sapiente omnis assumenda. Quibusdam harum hic consectetur?
                        Provident quasi autem eius cupiditate corporis. Odio dolor, alias eveniet molestias rem voluptatum labore ad repellendus architecto quas. Recusandae, itaque aliquid. Laborum, quidem perferendis?
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Categories;