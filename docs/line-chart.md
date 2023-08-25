## Line Chart Widget

![](assets/lineChart1.png)


| Option Name    | Description                                                                                                                                                                                            | Structure | Default                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------- |
| title          | General widget title (not chart title)                                                                                                                                                                 | String    | null                        |
| subtitle       | Widget subtitle, added below the title for additional information.                                                                                                                                     | String    | null                        |
| info           | If given, will be shown on hover over Info icon.<br /><br />Supports HTML content.<br />                                                                                                               | String    | null                        |
| url            | If given, an icon will be shown, which when clicked will open the given URL in a new tab                                                                                                               | String    | null                        |
| datasets       | [See ChartJS Docs](https://www.chartjs.org/docs/3.9.1/general/data-structures.html). The `backgroundColor` of each dataset supports Gradient (See [details](#gradient-background-color-support) below) | Object[]  | []                          |
| labels         | [See ChartJS Docs](https://www.chartjs.org/docs/3.9.1/general/data-structures.html).                                                                                                                   | String[]  | []                          |
| chartOptions   | Provide additional[Chart.js Options](https://www.chartjs.org/docs/3.9.1/charts/line.html#dataset-properties) to line-chart                                                                             | Object    | [See Below](#chart-options) |
| hideLegend     | Will hide the legend if True                                                                                                                                                                           | Bool      | false                       |
| dataPresent    | Will hide the chart if False                                                                                                                                                                           | Bool      | true                        |
| dataAbsentText | Text to show when dataPresent is False                                                                                                                                                                 | String    | `Data Unavailable`          |
| chartStyle     | Extra styles that will be passed for the chart styles. (Use[ngStyle](https://angular.io/api/common/NgStyle#description) compatible object)                                                             | Object    | {}                          |

### Included Plugins


| Plugin Name | Configuration                                                            | Key in chartOptions.plugins |
| ------------- | -------------------------------------------------------------------------- | ----------------------------- |
| Data Label  | [See Docs](https://v2_2_0--chartjs-plugin-datalabels.netlify.app/guide/) | datalabels                  |

### Included Adapter


| Plugin Name        | Configuration                                                              |
| -------------------- | ---------------------------------------------------------------------------- |
| Luxon Date Adapter | [See Docs](https://github.com/chartjs/chartjs-adapter-luxon#configuration) |

### Chart Options

```ts
    {
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
      },
      plugins: {
        datalabels: {
          display: false,
          align: 'end',
          anchor: 'end',
          clamp: true,
          formatter: (value, ctx) => {
            let label = value;
            if (isObject(value)) {
              label = get(
                value,
                ctx.dataset?.parsing?.['yAxisKey'],
                get(value, 'label', JSON.stringify(value))
              );
            }
            return `${label}`;
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          position: 'average',
          titleAlign: 'center',
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
          offset: true,
        },
        y: {
          grid: {
            drawOnChartArea: false,
          },
          beginAtZero: true,
          grace: '10%',
        },
      },
      datasets: {
        line: {
          fill: true,
        },
      },
    }
```

Any options given through `chartOptions` will be added in case not configured or will override in case already configured in default options.
Rest of the default options will not be lost.

### Gradient Background Color Support

If `datasets[index].backgroundColor` is a string in format :
`Color1-Color2-Color3...-ColorN` (Color strings separated by hyphen `-`),
Then the color string will be converted to Gradients.

Example: `#8626c366-#8626c305`

### Colors for datasets used

```js
      [
        {
          data: [],
          backgroundColor: '#8626C366-#8626C305',
          borderColor: '#8626C3',
          pointBackgroundColor: '#8626C3',
        },
        {
          data: [],
          backgroundColor: '#FB883266-#FB883205',
          borderColor: '#FB8832',
          pointBackgroundColor: '#FB8832',
        },
      ]
```

### Callbacks Support

As functions can be passed into JSON, the various callback functions can also be passed here as object.

Each callback function in chart options can be passed as an object with the following properties:

```
{
    "arguments" : String,
    "body" : String,
}
```

See examples below.

---

### Examples:

#### Example 1

##### JSON Input:

```js
        {
          widget: "line-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Trend in Sales",
          subtitle: "in current year",
          url: "www.google.com",
          info: "<strong>Sale Trend</strong>  in current year",
          datasets: [
            {
              data: [
                {
                  month: "Jan",
                  value: 1.23,
                },
                {
                  month: "Feb",
                  value: 1.89,
                },
                {
                  month: "Mar",
                  value: 2.45,
                },
                {
                  month: "Apr",
                  value: 2.41,
                },
              ],
              parsing: {
                xAxisKey: "month",
                yAxisKey: "value",
              },
              label: "Actual Sales (in M)",
            },
          ],
          chartOptions: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sales (in M)",
                },
                beginAtZero: false,
              },
            },
            plugins: {
              datalabels: {
                display: true,
              },
              title: {
                display: true,
                text: "Sale Trend",
              },
              tooltip: {
                callbacks: {
                  label: {
                    arguments: "tooltipItem",
                    body: "return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue + ' k';",
                  },
                },
              },
            },
          },
          chartStyle: {
            "height.px": 300,
          },
        }
```

##### Widget Output

![](assets/lineChart2.png)

#### Example 2

##### JSON Input:

```js
        {
          widget: "line-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Trend in Sales",
          subtitle: "in current year",
          url: "www.google.com",
          info: "<strong>Sale Trend</strong>  in current year",
          datasets: [
            {
              data: [30, 44, 60, 37],
              label: "Actual Sales (in M)",
            },
            {
              data: [50, 45, 80, 50],
              label: "Expected Sales (in M)",
            },
          ],
          labels: ["Jan", "Feb", "Mar", "Apr"],
          chartOptions: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sales (in M)",
                },
                beginAtZero: false,
              },
            },
            plugins: {
              datalabels: {
                display: "auto",
              },
            },
          },
          chartStyle: {
            "height.px": 300,
          },
        }
```

##### Widget Output

![](assets/lineChart2.png)

---

[Go Back to Main Page](../README.md)
