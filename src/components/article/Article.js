import './article.scss';

const Article = () => {
    return(
        <section className="article">
            <div className="container container_main">
                <div className="title title_blocks title_mb-10">
                    This Is A Standard Format Post
                </div>
                <div className="article__info">
                    <div className="article__date">December 16, 2017</div>
                    <div className="category category_article category_development">CODE</div>
                </div>
                <div className="article__content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quae suscipit mollitia. Nam quam recusandae cum nemo corrupti! Molestiae, at rerum? Possimus quos placeat distinctio reiciendis cupiditate exercitationem error a.
                    Quo architecto, iure dolorum numquam saepe at ratione quae quisquam libero unde incidunt cupiditate perferendis velit exercitationem sapiente officiis facilis, magni mollitia nihil? Dolorum quia provident vero ratione? Vel, officia.
                    Maxime consequuntur rem repellat excepturi odit. Maiores dignissimos beatae cumque fugit. Optio, aliquam sapiente eaque neque porro et consequatur itaque veritatis ullam, deserunt alias ipsa eius saepe cum. Laboriosam, inventore?
                    Sint fuga eaque totam error a cupiditate facilis blanditiis praesentium, dolorem quisquam molestiae laboriosam ab fugit et atque recusandae illum architecto fugiat! Perferendis consectetur doloremque accusamus. Assumenda sunt mollitia tempora.
                    Corporis distinctio neque beatae, vitae porro voluptates omnis molestiae in dolor, suscipit possimus maiores. Quisquam eaque neque nemo beatae? Qui amet exercitationem consectetur officia, maxime doloremque sit repellat quasi accusamus!
                    Provident, officia alias. Nobis explicabo placeat earum vitae. Architecto, consectetur necessitatibus. Ad accusamus natus aut culpa sapiente doloremque mollitia. Quas, exercitationem. Labore voluptate quod fugiat id vero magni dolorum culpa?
                    Enim, velit, necessitatibus ducimus dicta tenetur dolore hic sapiente obcaecati, voluptatum sit iure molestias laudantium aperiam! Iure obcaecati nemo omnis, recusandae deserunt ut fugit nam sequi incidunt harum quas molestias?
                    Quo eaque ipsam architecto labore. Enim iusto, voluptas molestias maiores nam, soluta quod eos porro optio quas nihil quidem necessitatibus iure voluptates, reprehenderit esse asperiores. Ratione veniam molestiae iure eaque.
                    Eos nostrum perferendis hic dolorem dolores fuga magni sed culpa, asperiores labore ipsum praesentium delectus ex itaque libero quisquam iste laboriosam animi quae cumque quos vitae accusantium! Ipsum, sequi nemo.
                    Tempora similique magni vitae facilis dolores ea obcaecati tenetur, cupiditate, vero voluptate ratione illo iusto delectus et perferendis fugiat eum maxime animi laboriosam unde accusamus corporis aut. Magni, cupiditate temporibus!
                    Obcaecati dignissimos accusamus fugiat? Unde repudiandae asperiores animi iure, tenetur fuga error dicta cumque? Tempore reprehenderit iusto quo aperiam fuga asperiores non. Fuga accusamus eum, error cupiditate animi fugiat! Molestiae.
                    Vel doloribus non, delectus quisquam ipsam cupiditate aut quibusdam nisi quia, explicabo rem qui sequi id maiores? Facere repellat dignissimos eum, nam iure dolore earum totam? Dolor quia commodi dicta.
                    Quos, aperiam, sunt exercitationem earum, dolor amet inventore modi incidunt consequatur quaerat laborum temporibus aut natus praesentium nisi. Corrupti iure amet voluptates commodi nulla maiores, unde placeat? Laborum, iste rerum.
                    Id rerum molestiae asperiores dolor recusandae magni officia repudiandae harum molestias temporibus ipsum expedita, nihil cupiditate non labore saepe ipsa sint provident blanditiis assumenda autem hic fugit beatae. Ipsam, iure!
                    Labore deserunt, ipsum officia nam nesciunt expedita officiis quidem, atque quasi libero maxime. Officia neque placeat minus, consectetur repudiandae cupiditate repellat fugit architecto magni dolores corrupti quisquam laborum soluta aliquid?
                    Maiores est cum in consequatur beatae dolor nihil ex libero possimus, quos voluptates quasi suscipit obcaecati velit. Nam ratione soluta obcaecati, voluptatibus enim, esse in quis est, totam fugiat praesentium.
                    Iste magnam incidunt possimus molestias nemo deleniti laudantium nihil consectetur tenetur asperiores nostrum non sit unde dolore tempore neque, debitis suscipit culpa voluptates labore itaque adipisci beatae. Facilis, nobis esse?
                    Ducimus laudantium ipsum ipsam maiores velit ab, dolores ipsa vero, quisquam esse ullam. Reiciendis cumque nihil dolores ipsum! Labore cumque similique autem nobis dolores laudantium quos assumenda enim expedita in!
                    Facilis quae natus dolorem debitis delectus quam possimus quod nostrum cumque tenetur vel ea, illo adipisci aliquid reprehenderit expedita nihil! Ex porro est sunt eaque quos voluptatum odio alias aut!
                    Inventore soluta laborum expedita commodi facilis iusto, suscipit voluptates beatae ipsam maiores. Magnam autem iure rem, distinctio ratione aspernatur numquam nemo neque assumenda asperiores harum quo amet facere illo dolorum.
                </div>
                <div className="rate">
                    <img src="img/icons/icon-like.svg" alt="like" className="rate__rating" />
                    <img src="img/icons/icon-like.svg" alt="dislike" className="rate__rating" />
                    <img src="img/icons/icon-bookmark.svg" alt="bookmark" className="rate__rating" />
                    <div className="rate__rating">21</div>
                </div>
                <div className="article__tags">
                    <h3 className="title">Post Tags</h3>
                    <hr className="divider divider_tegs" />
                    <a className="article__tags__link">codeOfPain</a>
                </div>
            </div>
            <div className="container">
                <div className="comments article__comments">
                    <h3 className="title title_mb-50">Comments</h3>
                    <div className="comments__comment">
                        <img src="img/icons/icon-incognito.svg" alt="inkognito" className="comments__img" />
                        <div className="comments__content">
                            <a href="/" className="comments__username">xsolutionxxx</a>
                            <div className="comments__content__wrapper">
                                <div className="comments__date">Dec 16, 2017 @ 23:05</div>
                                <div className="comments__reply">Reply</div>
                            </div>
                            <div className="comments__message">Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent. Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.</div>
                        </div>
                    </div>
                </div>
                <form action="#" className="form_comments">
                    <input type="text" name="Name" placeholder="Your Name" />
                    <input type="text" name="Email" placeholder="Your Email" />
                    <textarea type="text" name="Message" placeholder="Your Message"></textarea>
                    <button type="submit" className="button button_contact">submit</button>
                </form>
            </div>
        </section>
    )
}

export default Article;