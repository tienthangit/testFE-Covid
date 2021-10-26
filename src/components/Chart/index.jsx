import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

function Chart() {
    const { isOpenModal, slugCountry } = useSelector(state => state.modalReducer);

    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        const fectchAPI = async () => {
            try
            {
                const result = await axios.get(`https://api.covid19api.com/total/dayone/country/${slugCountry}`);
                if (result.status === 200)
                {
                    var modifiedData = result.data.map((item) => ({
                        confirmed: item.Confirmed,
                        deaths: item.Deaths,
                        recovered: item.Recovered,
                        date: moment(item.Date).format("DD/MM/YYYY")
                    }))
                }
                setDataChart(modifiedData)
            } catch (err)
            {
                console.log(err.response);
            }
        };

        if (isOpenModal)
        {
            fectchAPI();
        }

    }, [isOpenModal]);


    const lineChart = () => {
        return dataChart.length !== 0 ?
            (<Line
                data={{
                    labels: dataChart.map(item => item.date),
                    datasets: [
                        {
                            label: 'Confirmed',
                            data: dataChart.map(item => item.confirmed),
                            borderColor: "#3333ff",
                            fill: true,
                        },
                        {
                            label: 'Deaths',
                            data: dataChart.map(item => item.deaths),
                            borderColor: "red",
                            fill: true,
                        },
                        {
                            label: 'Recovered',
                            data: dataChart.map(item => item.recovered),
                            borderColor: "green",
                            fill: true,
                        },

                    ],
                }}
            />) : ''
    };

    return (
        <div className="chart" >
            {lineChart()}
        </div>
    );
}

export default Chart;
