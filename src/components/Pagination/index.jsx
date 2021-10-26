import React from 'react'
import './pagination.css'

function Pagination({ countryPerPage, totalCountry, paginate }) {
    const pageNumber = []
    let totalPagination = Math.ceil(totalCountry / countryPerPage)

    for (let i = 1; i <= totalPagination; i++)
    {
        pageNumber.push(i)
    }
    console.log(pageNumber);

    return (
        <nav>
            <ul>
                {pageNumber?.map(number => (
                    <li key={number} className='page__item'>
                        <a onClick={() => paginate(number)} href='#!' className="page__link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
