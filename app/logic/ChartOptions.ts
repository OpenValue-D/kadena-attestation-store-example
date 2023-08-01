let tickInterval = 10/3

const chartStrengthColor = '#DDD'
const chartNeutralColor = '#EEE'
const chartWeaknessColor = '#FFF'

export default function getChartOptions(graphData: Map<string, number>) {
    return({
        title: {
            text: ''
        },
        chart: {
            polar: true,
            type: 'line'
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: Array.from(graphData.keys()),
            tickmarkPlacement: 'on',
            gridLineColor: '#AAAAAA',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: tickInterval * 3,
            tickInterval: tickInterval * 3,
            gridLineWidth: 2,
            gridLineColor: '#666666',

            minorTicks: true,
            minorTickColor: 'black',
            minorTickInterval: tickInterval,
            minorGridLineColor: '#666666',
            labels: {
                enabled: false
            },
            plotBands: [{
                color: chartWeaknessColor,
                from: 0,
                to: tickInterval
            }, {
                color: chartNeutralColor,
                from: tickInterval,
                to: tickInterval * 2
            }, {
                color: chartStrengthColor,
                from: tickInterval * 2,
                to: tickInterval * 3
            }]
        },
        plotOptions: {
            line: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'Developer',
                type: 'area',
                data: Array.from(graphData.values()),
                color: '#ff5232',
                lineWidth: 2,
                fillColor: '#ff523240',
                marker: {
                    lineWidth: 2,
                    lineColor: '#ff5232',
                    fillColor: '#FFFFFF',
                    radius: 4,
                    symbol: 'circle'
                },
                index: 1,
                zIndex: 100 // placement on top
            }
        ],
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
        }
    })
}
