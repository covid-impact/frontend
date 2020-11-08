import {shallowMount} from "@vue/test-utils";
import Chart from "@/components/Chart.vue";

describe("Chart.vue", () => {
    it("Check Title", () => {
        const wrapper = shallowMount(Chart, {
            propsData: {
                title: "COVID-Data",
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
                data: {
                    labels: [
                        "Red",
                        "Blue",
                        "Yellow",
                        "Green",
                        "Purple",
                        "Orange",
                    ],
                    datasets: [
                        {
                            label: "# of Votes",
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
            },
        });
        console.log(wrapper.html());
        const title = wrapper.find("h2");
        expect(title.text()).toMatch("COVID-Data");

        // tests for charts are already tested by Chart.js
    });
});
