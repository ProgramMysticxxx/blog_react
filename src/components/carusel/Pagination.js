import './pagination.scss';
import arrow from '../../resources/img/icons/icon-arrow.png';

export default function Pagination({ articlesPerPage, totalArticles, paginate }) {

    const changeActiveBtn = () => {
        
    }

    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div className='pagination'>
            <button className='prev'>
                <img className='leftArrow' src={arrow} alt="arrow" />
                prev
            </button>
            <ul className="menu pagination_menu">
                {
                    pageNumber.map(number => (
                        <li className='page__link page__link_active' onClick={() => paginate(number)}>1</li>
                    ))
                }
            </ul>
            <button className='next'>
                next
                <img className='rightArrow' src={arrow} alt="arrow" />
            </button>
        </div>
    )
}