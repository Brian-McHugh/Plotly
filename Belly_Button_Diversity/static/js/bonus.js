// Create the gauge chart
function buildGauge(gaugeData) {

    // Check gaugeData
    console.log(gaugeData);

    // Build a gauge using the sample data
    const gauge_trace = {
        // domain: { x: [0, 1], y: [0, 1] },
        value: gaugeData,
        title: { text: "<b>Frequency of Washing Belly Button</b><br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            bar: { color: "orange"},
            steps: [
            { range: [0, 1], color: "rgb(245, 245, 245" },
            { range: [1, 2], color: "rgb(236, 249, 236)" },
            { range: [2, 3], color: "rgb(197, 237, 197)" },
            { range: [3, 4], color: "rgb(157, 225, 157)" },
            { range: [4, 5], color: "rgb(118, 213, 118)" },
            { range: [5, 6], color: "rgb(79, 201, 79)" },
            { range: [6, 7], color: "rgb(54, 176, 54)" },
            { range: [7, 8], color: "rgb(42, 137, 42)" },
            { range: [8, 9], color: "rgb(30, 98, 30)" }
            ]
        }
    }

    const gauge_data = [gauge_trace];

    const gauge_layout = {
        margin: { t: 0, b: 0 }
        };
    
    Plotly.newPlot("gauge", gauge_data, gauge_layout);
}
