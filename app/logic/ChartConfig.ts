const tickInterval = 10/3;
const lineBorderWidth = 1;
const lineBorderColor = '#AAAAAA';
const ringBorderColor = '#666666';

export default function getChartData(data:number[]) {
    return(
        {
            labels: ['Coding Speed', 'Unit Test', 'Regression', 'Implement', 'Object Orientation', 'Refactor'],
            datasets: [
              {
                label: 'Developer',
                data: data,
                backgroundColor: '#ff523280',
                borderColor: '#ff5232',
                borderWidth: 2,
                radius: 4,
                pointBackgroundColor: '#FFFFFF',
              },
              // lines
              {
                  data: [tickInterval*3, 0, 0, 0, 0, 0],
                  borderColor: lineBorderColor,
                  borderWidth: lineBorderWidth,
                  radius: 0,            // just lines
                  pointHitRadius: 0,    // no tooltip
              },
              {
                  data: [0, tickInterval*3, 0, 0, 0, 0],
                  borderColor: lineBorderColor,
                  borderWidth: lineBorderWidth,
                  radius: 0,
                  pointHitRadius: 0,
              },
              {
                  data: [0, 0, tickInterval*3, 0, 0, 0],
                  borderColor: lineBorderColor,
                  borderWidth: lineBorderWidth,
                  radius: 0,
                  pointHitRadius: 0,
              },
              {
                  data: [0, 0, 0, tickInterval*3, 0, 0],
                  borderColor: lineBorderColor,
                  borderWidth: lineBorderWidth,
                  radius: 0,
                  pointHitRadius: 0,
              },
              {
                  data: [0, 0, 0, 0, tickInterval*3, 0],
                  borderColor: lineBorderColor,
                  borderWidth: lineBorderWidth,
                  radius: 0,
                  pointHitRadius: 0,
              },
              {
                  data: [0, 0, 0, 0, 0, tickInterval*3],
                  borderColor: lineBorderColor,
                  borderWidth: lineBorderWidth,
                  radius: 0,
                  pointHitRadius: 0,
              },
              // rings
              {
                  data: [tickInterval, tickInterval, tickInterval, tickInterval, tickInterval, tickInterval],
                  backgroundColor: '#DDD',
                  borderColor: ringBorderColor,
                  borderWidth: 1,
                  radius: 0,
                  pointHitRadius: 0,
              },
              {
                  data: [tickInterval*2, tickInterval*2, tickInterval*2, tickInterval*2, tickInterval*2, tickInterval*2],
                  backgroundColor: '#EEE',
                  borderColor: ringBorderColor,
                  borderWidth: 1,
                  radius: 0,
                  pointHitRadius: 0,
              },
              {
                  data: [tickInterval*3, tickInterval*3, tickInterval*3, tickInterval*3, tickInterval*3, tickInterval*3],
                  backgroundColor: '#FFF',
                  borderColor: ringBorderColor,
                  borderWidth: 2,
                  radius: 0,
                  pointHitRadius: 0,
              },
            ],
          }
    );}

export function getChartOptions() {
    return(
        {
            scales: {
                r: {
                    pointLabels: {
                        font: {
                          size: 12,
                        }
                    },
                    startAngle: 30,
                    min: 0,
                    max: tickInterval*3,
                    angleLines: { // lines from center to outside
                        color: '#AAAAAA',
                    },
                    grid: { // circular lines
                        lineWidth: [2, 1, 1],
                        color: '#666666',
                    },
                    ticks: {
                        display: false, // numeric labels on rings
                        stepSize: tickInterval,
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        }
    );}