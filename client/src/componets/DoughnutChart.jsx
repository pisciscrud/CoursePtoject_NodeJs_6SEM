import React from 'react';
import { Doughnut } from 'react-chartjs-2';
const DoughnutChart = ({ data }) => {
    const procedureNames = data.map((item) => item.name_procedure);
    const procedureCounts = data.map((item) => item.count);
    const chartData = {
        labels: procedureNames,
        datasets: [
            {
                label: 'Procedures',
                data: procedureCounts,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
                hoverOffset: 4,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Procedures',
            },
        },
    };
    return (
        <div style={{ width: '300px', height: '300px' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;