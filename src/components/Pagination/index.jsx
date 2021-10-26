import React from 'react'
import './pagination.css'

function Pagination({ countryPerPage, totalCountry, paginate }) {
    const pageNumber = []

    let totalPagination = Math.ceil(totalCountry / countryPerPage)

    for (let i = 1; i <= totalPagination; i++)
    {
        pageNumber.push(i)
    }

    const handlePagination = (number, e) => {
        return () => {

            const activeClass = document.querySelectorAll(".active")
            if (activeClass.length > 0) activeClass[0].classList.remove('active')

            //============ DOM tới các thẻ A
            const aActive = document.querySelectorAll('.page__link')
            for (let i = 0; i < aActive.length; i++)
            {
                if (i === number)
                {
                    aActive[i - 1].classList.add("active")
                }
            }
            paginate(number)
        }
    }

    return (
        <nav>
            <ul>
                {pageNumber?.map(number => (
                    <li key={number} className='page__item'>
                        <a onClick={handlePagination(number)} href='#!' className={number === 1 ? "page__link active" : "page__link"}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
