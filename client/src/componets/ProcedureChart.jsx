import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Chart.registerScale('category', {
//     parse: function(value) {
//         return value;
//     },
//     // add any other options you need
// });
const ProcedureChart = ({ data }) => {
    const petNames = data.map((pet) => pet.name);
    const procedureCounts = data.map((pet) => pet.count);
    const chartData = {
        labels: petNames,
        datasets: [
            {
                label: "Procedure Count",
                data: procedureCounts,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            ]
        }
    };

    return (
        <div style={{ width: "500px", height: "500px" }}>

            <Bar
                data={chartData}


                options={{
                    scales: {
                        y: {
                            ticks: {
                                precision: 0
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }}








            />
        </div>








    );
};


export default ProcedureChart;