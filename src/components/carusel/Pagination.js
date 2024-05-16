import './pagination.scss';
import arrow from '../../resources/img/icons/icon-arrow.png';
import { useMemo } from 'react';

export default function Pagination({ articlesPerPage, totalArticles, currentPage, paginate }) {
    const pagesCount = useMemo(
        () => Math.ceil(totalArticles / articlesPerPage),
        [articlesPerPage, totalArticles],
    );

    function nextPageIfPossible() {
        if (currentPage < pagesCount) {
            paginate(currentPage + 1);
        }
    }

    function prevPageIfPossible() {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    }

    return (
        <div className='pagination'>
            <button className='prev' onClick={prevPageIfPossible}>
                <img className='leftArrow' src={arrow} alt="arrow" />
                prev
            </button>
            <ul className="menu pagination_menu">
                {
                    [...Array(pagesCount)].map((_, i) => {
                        const pageNumber = i + 1;
                        const isCurrentPage = currentPage === pageNumber;
                        return (
                            <li className={isCurrentPage ? 'page__link page__link_active' : 'page__link'} key={pageNumber} onClick={() => paginate(pageNumber)}>{pageNumber}</li>
                        );
                    })
                }
            </ul>
            <button className='next' onClick={nextPageIfPossible}>
                next
                <img className='rightArrow' src={arrow} alt="arrow" />
            </button>
        </div>
    )
}