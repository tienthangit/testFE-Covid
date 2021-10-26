import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import Table from '../Table';
import ModalCountry from '../Modal';
import imgCororna from '../../assets/img/corona.png'
import axios from "axios";
import "./home.css"
import Loading from '../Loading';
import Pagination from '../Pagination';

function Home() {
    const dispatch = useDispatch();

    const [dataTable, setDataTable] = useState([])
    const [dataGlobal, setDataGobal] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [countryPerPage, setCountryPerPage] = useState(10)

    // console.log('dataGlobal',dataGlobal);

    useEffect(() => {
        const fecthData = async () => {
            try
            {
                await dispatch({ type: "ON_LOADING" })
                const result = await axios({
                    url: "https://api.covid19api.com/summary",
                    method: "GET"
                })
                await setDataTable(result.data.Countries)
                await setDataGobal(result.data.Global)

                await dispatch({ type: "OFF_LOADING" })

            } catch (err)
            {
                console.log(err);
            }
        }
        fecthData();
    }, [dispatch])


    // Get current country 

    const indexOfLastPost = currentPage * countryPerPage
    const indexOfFirstPost = indexOfLastPost - countryPerPage
    const currentPosts = dataTable.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).sort((a, b) => b.TotalDeaths - a.TotalDeaths).slice(indexOfFirstPost, indexOfLastPost)

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return (
        <div className="header">
            <img src={imgCororna} alt="coronavirus" width={300} />
            <div className="container">
                <div className="header__global">
                    <div className="card Confirmed">
                        <h5>Total Confirmed</h5>
                        <p className="card__number"> {dataGlobal?.TotalConfirmed?.toLocaleString()}</p>
                        <p className="card__date">{new Date(dataGlobal?.Date).toDateString()}</p>
                        <p>The numbers of people with COVID-19</p>
                    </div>
                    <div className="card Recovered">
                        <h5>Total Recovered</h5>
                        <p className="card__number" >{dataGlobal?.TotalRecovered?.toLocaleString()}</p>
                        <p className="card__date">{new Date(dataGlobal?.Date).toDateString()}</p>
                        <p>The numbers of people who recovered from COVID-19</p>
                    </div>
                    <div className="card  Deaths">
                        <h5>Total Deaths</h5>
                        <p className="card__number" >{dataGlobal?.TotalDeaths?.toLocaleString()}</p>
                        <p className="card__date">{new Date(dataGlobal?.Date).toDateString()}</p>
                        <p>The numbers of people who have died from COVID-19</p>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr className="header__table">
                            <th></th>
                            <th>Country</th>
                            <th>NewConfirmed</th>
                            <th>TotalConfirmed</th>
                            <th>NewDeaths</th>
                            <th>TotalDeaths</th>
                            <th>NewRecovered</th>
                            <th>TotalRecovered</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Table dataTable={currentPosts} />
                    </tbody>
                </table>
                <Pagination countryPerPage={countryPerPage} totalCountry={dataTable.length} paginate={paginate} />
                <Loading />
                <ModalCountry />
            </div>
        </div>
    )
}

export default Home
