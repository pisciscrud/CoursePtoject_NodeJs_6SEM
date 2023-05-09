import React, { useEffect, useRef } from 'react';
import { Line } from "react-chartjs-2";
function RatingChart({ data4 }) {
    const masterNames = data4.map((m) => m.master);
    const rating = data4.map((m) => m.rating);
    const chartData = {
        labels: masterNames,
        datasets: [
            {
                label: "Master ratings",
                data:  rating,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        max: 5,
                    },
                },
            ],
        },
    };
    return (
        <div>
            <Line data={chartData} options={options} />
        </div>);
}

export default RatingChart;
