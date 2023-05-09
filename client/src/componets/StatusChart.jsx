import React from 'react';
import { Doughnut } from 'react-chartjs-2';
const StatusChart = ({ data2 }) => {
    const statusName = data2.map((item) => item.status);
    const statusCount = data2.map((item) => item.count);
    const chartData = {
        labels: statusName,
        datasets: [
            {
                label: 'Statistics',
                data: statusCount,
                backgroundColor: [
                    'rgb(255, 205, 86)',

                    'rgb(54, 162, 235)',
                    'rgb(242, 48, 48)',
                    'rgb(147, 255, 128)',
                    'rgb(252, 174, 119)',
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


export default StatusChart;