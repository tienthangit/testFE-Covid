import React from 'react'
import './loading.css'
import { useSelector } from 'react-redux';



function Loading(props) {
    const { isLoading } = useSelector(state => state.loadingReducer);

    return (
        isLoading ?
            <div className="loading">
                <i className='bx bxs-virus bx-spin bx-rotate-180' style={{ fontSize: "7rem" }}></i>
            </div> : ""
    )
}

export default Loading
