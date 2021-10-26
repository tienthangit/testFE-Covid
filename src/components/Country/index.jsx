import React, { Fragment } from 'react'
import moment from "moment";
import { useDispatch, useSelector } from "react-redux"
import bin from '../../assets/img/bin.png'
import detail from '../../assets/img/detail.png'
import './country.css'

function Country(props) {
    const { item, countryChecked, cssCountrySelected } = props
    const dispatch = useDispatch();
    const { ListCountrySelected, ListData } = useSelector(state => state.listDataReducer)

    const openModal = () => {
        dispatch({ type: "OPEN_MODAL", payload: { slug: item.Slug, nameCountry: item.Country } })
    }
    const handleCheck = () => {
        let cloneListCountrySelected = [...ListCountrySelected]
        let findIndex = cloneListCountrySelected.findIndex(country => country === item.CountryCode)
        if (findIndex !== -1)
        {
            cloneListCountrySelected.splice(findIndex, 1)
        } else
        {
            cloneListCountrySelected = [...cloneListCountrySelected, item.CountryCode]
        }
        dispatch({ type: "SET_COUNTRY_SELECTED", payload: cloneListCountrySelected })
    }

    const handleDelete = () => {
        let cloneListCountrySelected = [...ListCountrySelected]
        let cloneListData = [...ListData]
        //filter ra các quốc gia được chọn trên danh sách quốc gia
        cloneListData = cloneListData.filter(country => !cloneListCountrySelected.includes(country.CountryCode))

        //update lại mảng quốc gia được chọn 
        cloneListCountrySelected = cloneListCountrySelected.filter(country => !cloneListCountrySelected.includes(country))

        //update lại mảng quốc gia được chọn và mảng danh sách quốc gia
        dispatch({ type: "SET_COUNTRY_SELECTED", payload: cloneListCountrySelected })
        dispatch({ type: "DELETE_COUNTRY", payload: cloneListData })
    }

    return (
        <Fragment>
            <tr className={`${cssCountrySelected}`}>
                <td><input type="checkbox" onChange={handleCheck} checked={countryChecked}></input></td>
                <td data-label='Country'>{item.Country}</td>
                <td data-label='NewConfirmed'>{item.NewConfirmed}</td>
                <td data-label='TotalConfirmed'>{item.TotalConfirmed}</td>
                <td data-label='NewDeaths'>{item.NewDeaths}</td>
                <td data-label='TotalDeaths'>{item.TotalDeaths}</td>
                <td data-label='NewRecovered'>{item.NewRecovered}</td>
                <td data-label='TotalRecovered'>{item.TotalRecovered}</td>
                <td data-label='Date'>{moment(item.Date).format("DD/MM/YYYY")}</td>
                <td>
                    <img src={detail} alt="delete" width={20} onClick={openModal} style={{ cursor: "pointer", marginRight: 10 }} />
                    <img src={bin} alt="delete" width={20} onClick={handleDelete} style={{ cursor: "pointer" }} />
                </td>
            </tr>
        </Fragment>
    )
}

export default Country
