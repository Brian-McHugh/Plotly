function buildMetadata(sample) {

    // Use `d3.json` to fetch the metadata for a sample
    url = `/metadata/${sample}`;

    // Show the url in the console
    console.log(url);

    d3.json(url).then(sampleData => {

        // View the sample in the console
        console.log(sampleData);

        // Use d3 to select the panel with id of `#sample-metadata`
        metaData = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        metaData.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(sampleData).forEach(([key, value]) => {
            metaData.append("p").text(`${key}: ${value}`);
            console.log(`${key}: ${value}`);
        });

        // BONUS: Build the Gauge Chart
        // buildGauge(sampleData.WFREQ)
    });
}

function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    url = `/samples/${sample}`;

    // Show the url in the console
    console.log(url);

    d3.json(url).then(sampleData => {

        // View the sample in the console
        console.log(sampleData);

        // Build a Bubble Chart using the sample data
        const bubble_trace = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            mode: "markers",
            marker: {
                color: sampleData.otu_ids,
                size: sampleData.sample_values,
            },
            text: sampleData.otu_labels
        };

        const bubble_data = [bubble_trace];

        const bubble_layout = {
            xaxis: {
              title: "Microbial Species ID"},
            yaxis: {
            title: "Abundance"},
            showlegend: false
          };
        
        Plotly.newPlot("bubble", bubble_data, bubble_layout);
    
        
        // Build a Pie Chart
        // Use slice() to grab the top 10 sample_values,
        // otu_ids, and labels (10 each).

        const pie_trace = [{
            values: sampleData.sample_values.slice(0, 10),
            labels: sampleData.otu_ids.slice(0, 10),
            hovertext: sampleData.otu_labels.slice(0, 10),
            type: "pie"
        }];

        const pie_layout = {
            legend: {
              traceorder: 'grouped'
            }
        };

        Plotly.plot("pie", pie_trace, pie_layout);
    });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
