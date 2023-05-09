import React from 'react';

import { Bar } from 'react-chartjs-2';
const MasterChart = ({data1}) => {
    const masterNames = data1.map((m) => m.master);
    const procedureCounts = data1.map((m) => m.count);
    const chartData = {
        labels: masterNames,
        datasets: [
            {
                label: 'Number of procedures',
                data: procedureCounts,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
          <Bar data={chartData} options={{
              scales: {
              y: {
              ticks: {
              precision: 0
          },
              grid: {
              display: false
          }
          },
          x:
              {
                  ticks: {
                      precision: 0
                  }
              }
          }, plugins: {
                  datalabels: {
                      align: 'end',
                      anchor: 'end',
                      color: 'white',
                      font: {
                          size: 14,
                          weight: 'bold',
                      },
                  },
              },
              // добавляем стили для фона
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
          }} />
        </div>
    );
};

export default MasterChart;