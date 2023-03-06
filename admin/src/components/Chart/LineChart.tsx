import React from "react";
import {Line} from "react-chartjs-2";
import {faker} from '@faker-js/faker';
import 'chart.js/auto';

const LineChart = () => {
    const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Vận đơn',
                data: labels.map(() => faker.datatype.number({min: 1000000, max: 100000000})),
                borderColor: 'rgb(248,187,0)',
                backgroundColor: 'rgba(248,187,0, 0.5)',
            },
            {
                label: 'Doanh số',
                data: labels.map(() => faker.datatype.number({min: 1000000, max: 100000000})),
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgba(0,0,0, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Tổng quan',
            },
        },
    };

    return (
        <div>
            <Line options={options} data={data}/>
        </div>
    )
}

export default LineChart