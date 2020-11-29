import userEvent from '@testing-library/user-event';
import React, { Component, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css';

class Chart extends Component {

    render() {
        let { mainDate, forecast, labels, temps, icons } = this.props.day;

        let data = {
            labels: labels,
            datasets: [{
                label: mainDate,
                backgroundColor: 'rgba(255, 99, 132, 0.12)',
                borderColor: 'rgb(255, 99, 132)',
                data: temps,
                pointStyle: icons
            }]
        }

        return (
            <div className="chart">
                <Line
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        elements: {
                            line: {
                                fill: false
                            },
                            point: {

                            }
                        },
                        tooltips: {
                            intersect: false,
                            callbacks: {
                                title: tooltipItems => {
                                    return `${forecast[tooltipItems[0].index].description}\ntest`;
                                },
                                // label: (tooltipItems, data) => {
                                //     return
                                // }
                            }
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        beginAtZero: true,
                                        callback: (value, index, values) => {
                                            return `${value} °C`;
                                        }
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ],
                            // xAxes: [
                            //     {
                            //         ticks: {
                            //             // autoSkip: true,
                            //             // maxTicksLimit: 10,
                            //             // maxRotation: 10,
                            //             max: 10,
                            //             beginAtZero: true,
                            //             callback: (value, index, values) => {
                            //                 return `${value}`;
                            //             }
                            //         },
                            //         gridLines: {
                            //             // display: false
                            //         }
                            //     }
                            // ]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;