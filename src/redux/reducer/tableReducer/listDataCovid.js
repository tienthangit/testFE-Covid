const initialState = {
    ListData: [],
    ListCountrySelected: []
}

const listDataReducer = (state = initialState, { type, payload }) => {
    switch (type)
    {
        case "SET_DATA_TABLE":
            state.ListData = payload
            return {...state}
        case "SET_COUNTRY_SELECTED":
            state.ListCountrySelected = payload
            return { ...state }
        case "DELETE_COUNTRY":
            state.ListData = payload
            return { ...state }

        default:
            return state
    }
}
export default listDataReducer