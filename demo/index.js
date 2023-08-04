let widgetContainer = document.getElementById("widgetContainer");
widgetContainer.jsonInput = {
  rows: [
    {
      classes: ["justify-content-center"],
      widgets: [
        {
          widget: "stat-graph-card",
          classes: ["col-md-6"],
          title: "Active User Count",
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
          classes: ["col-md-6"],
          title: "Active User Count",
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
      ],
    },
  ],
};

// TODO: Add a dynamic example
