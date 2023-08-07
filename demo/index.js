let widgetContainer = document.getElementById("widgetContainer");

widgetContainer.variables = {
  sampleResponse1: {
    data: {
      users: {
        total: 2.08,
        historicalData: [
          {
            time: {
              month: 6,
              year: 2022,
            },
            value: 0.28,
          },
          {
            time: {
              month: 7,
              year: 2022,
            },
            value: 0.82,
          },
          {
            time: {
              month: 8,
              year: 2022,
            },
            value: 0.92,
          },
          {
            time: {
              month: 9,
              year: 2022,
            },
            value: 0.88,
          },
          {
            time: {
              month: 10,
              year: 2022,
            },
            value: 0.91,
          },
          {
            time: {
              month: 11,
              year: 2022,
            },
            value: 1.24,
          },
          {
            time: {
              month: 2,
              year: 2023,
            },
            value: 1.03,
          },
          {
            time: {
              month: 3,
              year: 2023,
            },
            value: 1.72,
          },
          {
            time: {
              month: 12,
              year: 2022,
            },
            value: 0.97,
          },
          {
            time: {
              month: 1,
              year: 2023,
            },
            value: 1.0,
          },

          {
            time: {
              month: 4,
              year: 2023,
            },
            value: 2.08,
          },
        ],
      },
    },
  },
};

widgetContainer.jsonInput = {
  request: [
    {
      url: "https://run.mocky.io/v3/db830bac-3ac3-4d97-ba85-aa13aacf5be5",
      method: "GET",
    },
  ],
  rows: [
    {
      classes: ["justify-content-center"],
      widgets: [
        {
          widget: "stat-graph-card",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count (Stat only)",
          subtitle: "in last year",
          info: "<strong>Active User Count</strong>  in last year",
          stat: {
            value: "3.04 Million",
            showSeparateUnit: true,
          },
          dataPresent: false,
          dataAbsentText: "Historical data unavailable right now",
        },
        {
          widget: "stat-graph-card",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count (Stat + Graph)",
          subtitle: "in last year",
          info: "<strong>Active User Count</strong>  in last year",
          stat: {
            value: "3.04 Million",
            showSeparateUnit: true,
          },
          datasets: [
            {
              data: [
                0.2, 0.4, 0.5, 0.8, 0.9, 1.2, 1.5, 1.9, 2.3, 2.7, 2.5, 3.04,
              ],
              label: "User Count (in M)",
            },
          ],
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        {
          widget: "stat-graph-card",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count (Stat + Graph)",
          subtitle: "in last year",
          info: "<strong>Active User Count</strong>  in last year",
          stat: {
            value: "3.4 Million",
            showSeparateUnit: true,
          },
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
                {
                  month: "May",
                  value: 2.75,
                },
                {
                  month: "Jun",
                  value: 3.4,
                },
              ],
              label: "User Count (in M)",
              parsing: {
                xAxisKey: "month",
                yAxisKey: "value",
              },
            },
          ],
          chartStyle: {
            "height.px": 250
          }
        },
        {
          widget: "stat-graph-card",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count (Dynamic Stat & Graph from Variables)",
          subtitle: "in last year",
          info: "<strong>Active User Count</strong>  in last year",
          stat: {
            value: "#{{sampleResponse1.data.users.total}} + 'Million'",
            showSeparateUnit: true,
          },
          dataPresent: "#{{sampleResponse1.data.users.historicalData}}.length",
          datasets: [
            {
              data: "#{{sampleResponse1.data.users.historicalData}}.sort((a, b) => { return new Date(a.time.year, a.time.month-1) - new Date(b.time.year, b.time.month-1)}).map((d) => d.value)",
              label: "User Count (in M)",
            },
          ],
          labels:
            "#{{sampleResponse1.data.users.historicalData}}.sort((a, b) => { return new Date(a.time.year, a.time.month-1) - new Date(b.time.year, b.time.month-1)}).map((d) => new Date(d.time.year, d.time.month-1))",
          chartOptions: {
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "month",
                  tooltipFormat: "MMMM y",
                },
                ticks: {
                  callback: {
                    arguments: "value",
                    body: "return value.charAt(0);",
                  },
                },
              },
            },
          },
        },
        {
          widget: "stat-graph-card",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count (Dynamic Stat & Graph from HTTP request)",
          subtitle: "in last year",
          url: "www.google.com",
          info: "<strong>Active User Count</strong>  in last year",
          stat: {
            value: "${{0.sampleResponse1.data.users.total}} + 'Million'",
            showSeparateUnit: true,
          },
          dataPresent:
            "${{0.sampleResponse1.data.users.historicalData}}.length",
          datasets: [
            {
              data: "${{0.sampleResponse1.data.users.historicalData}}.sort((a, b) => { return new Date(a.time.year, a.time.month-1) - new Date(b.time.year, b.time.month-1)}).map((d) => d.value)",
              label: "User Count (in M)",
            },
          ],
          labels:
            "${{0.sampleResponse1.data.users.historicalData}}.sort((a, b) => { return new Date(a.time.year, a.time.month-1) - new Date(b.time.year, b.time.month-1)}).map((d) => new Date(d.time.year, d.time.month-1))",
          chartOptions: {
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "month",
                  tooltipFormat: "MMMM y",
                },
                ticks: {
                  callback: {
                    arguments: "value",
                    body: "return value.charAt(0);",
                  },
                },
              },
            },
          },
        },
      ],
    },
  ],
};

document.getElementById("jsonDisplay").innerText = JSON.stringify(
  widgetContainer.jsonInput,
  null,
  4
);
