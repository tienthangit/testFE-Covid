import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import "../../App.css"
import Country from '../Country';

function Table({ dataTable }) {

    const { ListCountrySelected } = useSelector(state => state.listDataReducer)

    const renderTabler = () => {
        const tableHTML = dataTable.map((item, index) => {
            let countryChecked = false
            let cssCountrySelected = ""
            let indexCountrySelected = ListCountrySelected.findIndex(country => country === item.CountryCode)
            if (indexCountrySelected !== -1)
            {
                countryChecked = true
                cssCountrySelected = 'countrySelected'
            }
            return (
                <Country key={index} item={item} countryChecked={countryChecked} cssCountrySelected={cssCountrySelected} />
            )
        })
        return tableHTML
    }
    return (
        <Fragment>
            {renderTabler()}
        </Fragment>
    )
}

export default Table
