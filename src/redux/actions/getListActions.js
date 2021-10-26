import axios from "axios";

//===================== lấy dữ liệu chi tiết quốc gia cho modal


export const getDetailCountry = (nameCountry) => {
    return async (dispatch) => {
        try
        {
            let index = nameCountry.split('').findIndex(charc => charc === '-')
            if (index !== -1)
            {
                let slugCountry = nameCountry.split('').splice(0, index).join('')
                const result = await axios.get(`https://restcountries.com/v3.1/name/${slugCountry}`)
                dispatch({ type: "SET_DETAIL_COUNTRY", payload: result.data[0] })
            } else
            {
                const result = await axios.get(`https://restcountries.com/v3.1/name/${nameCountry}`)
                dispatch({ type: "SET_DETAIL_COUNTRY", payload: result.data[0] })
            }

        } catch (err)
        {
            console.log(err.response);
        }
    }
}