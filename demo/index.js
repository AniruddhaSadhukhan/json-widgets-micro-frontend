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
  sampleResponse2: {
    data: [
      {
        month: "Jan",
        expected: "9.2",
        actual: "5.4",
      },
      {
        month: "Feb",
        expected: "7.8",
        actual: "5.7",
      },
      {
        month: "Mar",
        expected: "9.2",
        actual: "6.5",
      },
      {
        month: "Apr",
        expected: "8.8",
        actual: "7.1",
      },
      {
        month: "May",
        expected: "8.3",
        actual: "7.4",
      },
      {
        month: "Jun",
        expected: "8.9",
        actual: "7.5",
      },
    ],
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
        },
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
        },
        {
          widget: "line-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count",
          subtitle: "in last year",
          url: "www.google.com",
          info: "<strong>Active User Count</strong>  in last year",
          hideLegend: true,
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
              },
            },
          },
        },
        {
          widget: "line-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Trend in Sales",
          subtitle: "in current year",
          url: "www.google.com",
          info: "<strong>Sale Trend</strong>  in current year",
          dataPresent: "#{{sampleResponse2.data}}.length",
          datasets: [
            {
              data: "#{{sampleResponse2.data}}.map((d) => d.actual)",
              label: "Actual Sales (in M)",
            },
            {
              data: "#{{sampleResponse2.data}}.map((d) => d.expected)",
              label: "Expected Sales (in M)",
            },
          ],
          labels: "#{{sampleResponse2.data}}.map((d) => d.month)",
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
              legend: {
                position: "bottom",
              },
            },
          },
          chartStyle: {
            "height.px": 300,
          },
        },
      ],
    },
    {
      classes: ["justify-content-center"],
      widgets: [
        {
          widget: "bar-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Trend in Sales",
          subtitle: "in current year",
          hideLegend: true,
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
        },
        {
          widget: "bar-chart",
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
            indexAxis: "y",
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Month",
                },
                stacked: true,
              },
              x: {
                title: {
                  display: true,
                  text: "Sales (in M)",
                },
                grace: "10%",
                offset: false,
                ticks: {
                  callback: {
                    arguments: "value, index, ticks",
                    body: "return value + ' M';",
                  },
                },
              },
            },
            plugins: {
              datalabels: {
                display: "auto",
              },
              tooltip: {
                axis: "y",
              },
            },
          },
          chartStyle: {
            "height.px": 300,
          },
        },
        {
          widget: "bar-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count",
          subtitle: "in last year",
          url: "www.google.com",
          info: "<strong>Active User Count</strong>  in last year",
          hideLegend: true,
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
              },
            },
          },
        },
        {
          widget: "bar-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Trend in Sales",
          subtitle: "in current year",
          url: "www.google.com",
          info: "<strong>Sale Trend</strong>  in current year",
          dataPresent: "#{{sampleResponse2.data}}.length",
          datasets: [
            {
              data: "#{{sampleResponse2.data}}.map((d) => d.actual)",
              label: "Actual Sales (in M)",
            },
            {
              data: "#{{sampleResponse2.data}}.map((d) => d.expected)",
              label: "Expected Sales (in M)",
            },
          ],
          labels: "#{{sampleResponse2.data}}.map((d) => d.month)",
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
                beginAtZero: true,
              },
            },
            plugins: {
              datalabels: {
                display: "auto",
              },
              legend: {
                position: "bottom",
              },
            },
          },
          chartStyle: {
            "height.px": 300,
          },
        },
      ],
    },
    {
      classes: ["justify-content-center"],
      widgets: [
        {
          widget: "doughnut-pie-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Success Rate",
          subtitle: "For year 2023",
          url: "www.google.com",
          info: "<strong>Success Rate</strong>  in current year",
          datasets: [
            {
              data: [60, 30, 10],
            },
          ],
          labels: ["Success", "Failed", "Pending"],
          chartOptions: {
            plugins: {
              title: {
                display: true,
                text: "Test Results",
              },
            },
          },
        },
        {
          widget: "doughnut-pie-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Success Rate",
          subtitle: "For year 2023",
          url: "www.google.com",
          info: "<strong>Success Rate</strong>  in current year",
          datasets: [
            {
              data: [60, 30, 10],
            },
          ],
          labels: ["Success", "Failed", "Pending"],
          chartOptions: {
            cutout: 0,
            plugins: {
              title: {
                display: true,
                text: ["Test Results", "(in %)"],
              },
              datalabels: {
                display: "auto",
              },
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                },
              },
              tooltip: {
                callbacks: {
                  label: {
                    arguments: "tooltipItem",
                    body: "return tooltipItem.label + ': ' + tooltipItem.formattedValue + ' %';",
                  },
                },
              },
            },
          },
        },
        {
          widget: "doughnut-pie-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Success Rate",
          subtitle: "For year 2023",
          url: "www.google.com",
          info: "<strong>Success Rate</strong>  in current year",
          datasets: [
            {
              data: [60, 40],
              backgroundColor: ["green", "red"],
            },
          ],
          labels: ["Success", "Failed"],
          chartOptions: {
            cutout: "80%",
            borderRadius: 50,
            rotation: -135,
            circumference: 270,
            layout: {
              padding: {
                left: 50,
                right: 50,
                top: 25,
                bottom: 25,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Test Results",
              },
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                },
              },
            },
          },
        },
        {
          widget: "doughnut-pie-chart",
          classes: ["col-md-6", "col-lg-3"],
          title: "Success Rate",
          subtitle: "For year 2023",
          url: "www.google.com",
          info: "<strong>Success Rate</strong>  in current year",
          datasets: [
            {
              data: [60, 30, 10, 50, 25],
              datalabels: {
                anchor: "end",
              },
            },
            {
              data: [20, 80, 60, 40, 75],
              datalabels: {
                anchor: "center",
                backgroundColor: null,
                borderWidth: 0,
              },
            },
            {
              data: [60, 30, 10, 50, 25],
              datalabels: {
                anchor: "start",
              },
            },
          ],
          labels: ["A", "B", "C", "D", "E"],
          chartOptions: {
            backgroundColor: [
              "#FF3784",
              "#36A2EB",
              "#4BC0C0",
              "#F77825",
              "#9966FF",
            ],
            layout: {
              padding: 10,
            },
            borderColor: "darkbrown",
            plugins: {
              datalabels: {
                display: true,
                backgroundColor: {
                  arguments: "context",
                  body: "console.log(context.chart.config.options.backgroundColor);return context.chart.config.options.backgroundColor;",
                },
                borderColor: "darkbrown",
                borderRadius: 25,
                borderWidth: 2,
                color: "white",
                font: {
                  weight: "bold",
                },
                padding: 6,
              },
            },
          },
        },
      ],
    },
    {
      classes: ["justify-content-center"],
      widgets: [
        // {
        //   widget: "stat-graph-card",
        //   classes: ["col-md-6", "col-lg-3"],
        //   title: "User Count (Stat only)",
        //   subtitle: "in last year",
        //   info: "<strong>Active User Count</strong>  in last year",
        //   stat: {
        //     value: "3.04 Million",
        //     showSeparateUnit: true,
        //   },
        //   dataPresent: false,
        //   dataAbsentText: "Historical data unavailable right now",
        // },
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
            "height.px": 250,
          },
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
              },
            },
          },
        },
      ],
    },
    {
      classes: ["justify-content-center"],
      widgets: [
        {
          widget: "small-stat",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count",
          value: "3.07",
          unit: "Million",
          showSeparateUnit: true,
          displayAsIndividualCard: false,
          icon: "groups",
        },
        {
          widget: "small-stat",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count",
          subtitle: "(normal view)",
          value: "3.07 Million",
          showSeparateUnit: true,
          trend: "up",
          info: "abc",
          icon: "groups",
        },
        {
          widget: "small-stat",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count",
          subtitle: "(card view)",
          value: "3.07 Million",
          showSeparateUnit: true,
          displayAsIndividualCard: true,
          trend: "up",
          info: "abc",
          icon: "groups",
        },
        {
          widget: "small-stat",
          classes: ["col-md-6", "col-lg-3"],
          title: "User Count",
          subtitle: "(Dynamic from HTTP req)",
          value: "${{0.sampleResponse1.data.users.total}} + ' Million'",
          showSeparateUnit: true,
          displayAsIndividualCard: true,
          trend:
            "() => {\n  let historicalData = ${{0.sampleResponse1.data.users.historicalData}};\n  if (historicalData?.length > 2) {\n    historicalData = historicalData\n      .sort((a, b) => {\n        return (\n          new Date(a.time.year, a.time.month - 1) -\n          new Date(b.time.year, b.time.month - 1)\n        );\n      })\n      .slice(-2);\n    let oldValue = historicalData[0].value;\n    let newValue = historicalData[1].value;\n    return newValue > oldValue ? 'up' : newValue < oldValue ? 'down' : 'flat';\n  } else {\n    return '';\n  }\n};\n",
          info: "abc",
          icon: "groups",
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
