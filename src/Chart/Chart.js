import React, { Component } from 'react';
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
                        // responsive: true,
                        elements: {
                            line: {
                                fill: false
                            }
                        },
                        tooltips: {
                            intersect: false,
                            mode: 'index',
                            displayColors: false,
                            axis: 'x',
                            callbacks: {
                                title: tooltipItems => {
                                    let { description, speed, humidity, pressure } = forecast[tooltipItems[0].index];
                                    return `Description: ${description}\nWind: ${speed} m/s\nHumidity: ${humidity} %\nPressure: ${pressure} hpa`;
                                },
                                label: tooltipItems => {
                                    let { value } = tooltipItems;
                                    return `Temperature: ${value} °C`;
                                },
                                afterLabel: tooltipItems => {
                                    let { label } = tooltipItems;
                                    return `Time: ${label}`;
                                }
                            }
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        beginAtZero: true,
                                        callback: value => {
                                            return `${value} °C`;
                                        }
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;