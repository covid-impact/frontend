const options = {
    light: {
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 1.5,
            },
        },
        legend: {
            labels: {
                fontColor: "black",
            },
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: "black",
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: "black",
                    },
                },
            ],
        },
    },
    dark: {
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 1.5,
            },
        },
        legend: {
            labels: {
                fontColor: "white",
            },
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: "white",
                    },
                },
            ],
        },
    },
};

export default options;
