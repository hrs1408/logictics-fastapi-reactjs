import React from 'react'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import 'chart.js/auto'

const LineChart = () => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Invoice',
        data: labels.map(() =>
          faker.datatype.number({ min: 1000000, max: 100000000 })
        ),
        borderColor: 'rgb(248,187,0)',
        backgroundColor: 'rgba(248,187,0, 0.5)',
      },
      {
        label: 'Revenue',
        data: labels.map(() =>
          faker.datatype.number({ min: 1000000, max: 100000000 })
        ),
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0, 0.5)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Statistics overview',
      },
    },
  }

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default LineChart
