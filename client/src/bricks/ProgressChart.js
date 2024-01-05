import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Chart} from "primereact/chart";

function ProgressChart(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const {t} = useTranslation();


    useEffect(() => {
        let counter = [0,0,0];
        props.items.forEach(i => { switch(i.status) {
            case "done":
                counter[1] += 1;
                break;
            case "new":
                counter[0] += 1;
                break;
            default:
                counter[2] += 1;
        }})
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: [t('statusNew'), t('statusDone')],
            datasets: [
                {
                    data: [counter[0], counter[1]],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-300'),
                        documentStyle.getPropertyValue('--green-300')
                    ]
                }
            ]
        };
        const options = {
            cutout: '50%'
        };
        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full sm:w-5rem md:w-15rem"/>
    );
}

export default ProgressChart;
