import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getDetailCountry } from "../../redux/actions/getListActions"
import Chart from '../Chart'
import './modal.css'

function ModalCountry() {

    const { isOpenModal, slugCountry, nameCountry, detailCountry } = useSelector(state => state.modalReducer)

    const dispatch = useDispatch();
    useEffect(() => {
        const divOverLay = document.querySelector(".modal__overlay")
        const modal = document.querySelector(".modal__body")
        if (isOpenModal)
        {
            dispatch(getDetailCountry(slugCountry))
            dispatch({ type: "ON_LOADING" })
            setTimeout(() => {
                dispatch({ type: "OFF_LOADING" })
            }, 500)

            modal.style.display = 'block'
            divOverLay.style.display = 'block'
            modal.style.opacity = '1'
            divOverLay.style.opacity = '1'
        } else
        {
            divOverLay.style.display = 'none'
            modal.style.display = 'none'
            modal.style.opacity = '0'
            divOverLay.style.opacity = '0'
        }

    }, [isOpenModal, dispatch, slugCountry])

    const handleModal = (e) => {
        dispatch({ type: "CLOSE_MODAL" })
    }

    return (
        <>
            <div onClick={handleModal} className="modal__overlay"> </div>
            <div className="modal__body cardModal">
                <div className="modal__header">
                    <div className="header__desc">
                        <img src={detailCountry.flags.png} alt='flag' width={150} />
                        <div className="header__nameCountry" >
                            <h2 className="heading">{nameCountry}</h2>
                            <p>Capital:<span> {detailCountry.capital[0]} </span> </p>
                            <p>Region:<span> {detailCountry.region} </span> </p>
                            <p> SubRegion:<span> {detailCountry.subregion} </span> </p>
                            <p> Population:<span> {detailCountry.population?.toLocaleString()} </span> </p>
                        </div>
                    </div>
                    <span onClick={handleModal} className="close">&times;</span>
                </div>
                <Chart />
            </div>
        </>
    )
}

export default ModalCountry
