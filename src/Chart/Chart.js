import userEvent from '@testing-library/user-event';
import React, { Component, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css';

class Chart extends Component {

    render() {
        let { mainDate, labels, temps, icons } = this.props.day;
        console.log('this.props.day', this.props.day);

        let data = {
            labels: labels,
            datasets: [{
                label: mainDate,
                backgroundColor: 'rgba(255, 99, 132, 0.12)',
                borderColor: 'rgb(255, 99, 132)',
                data: temps,
                pointStyle: icons,
                radius: 3
            }]
        }

        return (
            <div className="chart">
                <Line
                    data={data}
                    // width={100}
                    // height={30}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        tooltips: {
                            // callbacks: {
                            //     title: (tooltipItems, data) => {
                            //         return
                            //     },
                            //     label: (tooltipItems, data) => {
                            //         return
                            //     }
                            // }
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        // minTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: false
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'probability'
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
                            //             // callback: (value, index, values) => {
                            //             //     return <p>{`$${value}`}</p>;
                            //             //     // return (
                            //             //     //     <img src="https://openweathermap.org/img/w/01d.png" alt="logo" />
                            //             //     // );
                            //             // }
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