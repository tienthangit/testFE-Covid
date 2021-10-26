const initialState = {
    detailCountry: {
        region: "",
        subregion: "",
        capital: "",
        flags: "",
        population: 0
    },
    isOpenModal: false,
    slugCountry: '',
    nameCountry: '',
}

const modalReducer = (state = initialState, { type, payload }) => {
    switch (type)
    {

        case "OPEN_MODAL":
            state.isOpenModal = true
            state.slugCountry = payload.slug
            state.nameCountry = payload.nameCountry
            return { ...state }
        case "CLOSE_MODAL":
            state.isOpenModal = false
            return { ...state }
        case "SET_DETAIL_COUNTRY":
            state.detailCountry = payload
            return { ...state }
        default:
            return state
    }
}
export default modalReducer