const options = {
    light: {
        chart: {
            zoomType: "x",
            backgroundColor: "transparent",
        },
        title: {
            text: "",
        },
        subtitle: {
            text:
                document.ontouchstart === undefined
                    ? "Click and drag in the plot area to zoom in"
                    : "Pinch the chart to zoom in",
            style: {
                color: "#000",
            },
        },
        xAxis: {
            type: "datetime",
        },
        yAxis: {
            title: "",
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: "#000",
            },
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                threshold: null,
            },
        },
    },
    dark: {
        chart: {
            zoomType: "x",

            backgroundColor: "transparent",
        },
        title: {
            text: "",
        },
        subtitle: {
            text:
                document.ontouchstart === undefined
                    ? "Click and drag in the plot area to zoom in"
                    : "Pinch the chart to zoom in",
            style: {
                color: "#dadada",
            },
        },
        xAxis: {
            type: "datetime",
            labels: {
                style: {
                    color: "#dadada",
                },
            },
        },
        yAxis: {
            title: "",
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: "#dadada",
            },
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                threshold: null,
            },
        },
    },
};

export default options;
