import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Chart} from "primereact/chart";

function ListChart(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { t} = useTranslation();


    useEffect(() => {
        let counter = [];
        let labels = [];
        props.lists.forEach((l,idx) => {
            labels[idx] = l.title;
            counter[idx] = 0;
            counter[props.lists.length + idx] = 0
            if (l.items && l.items.length > 0) {
                l.items.forEach((i) => {
                    switch(i.status) {
                        case "done":
                            counter[props.lists.length + idx] += 1;
                            break;
                        case "new":
                            counter[idx] += 1;
                            break;
                        default:
                            console.log("wrong item status");
                    }})
            }
        })
        const mid = Math.ceil(counter.length / 2);

        const firstHalf = counter.slice(0, mid);
        const secondHalf = counter.slice(mid);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: labels,
            datasets: [
                {
                    label: t('statusNew'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: firstHalf
                },
                {
                    label: t('statusDone'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: secondHalf
                }
            ]
        };
        const options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} className="w-full"/>
        </div>

    );
}

export default ListChart;
