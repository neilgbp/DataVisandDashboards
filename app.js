function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  
    var default_url = `/metadata/${sample}`;
    d3.json(default_url).then(function (sample) {
    var sample_metadata = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    
    sample_metadata.html("");
    
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
     
      Object.entries(sample).forEach(function ([key, value]) {
        var row = sample_metadata.append("tr");
        row.text(`${key}: ${value}`);
      });
    });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
      
      var data2 = `/samples/${sample}`;
      d3.json(data2).then(function (data) {

    // @TODO: Build a Bubble Chart using the sample data

      var x = data2.otu_ids;
      var y = data2.sample_values;
      var bubble_mark_size = data2.sample_values;
      var bubble_mark = data2.otu_ids;
      var text = data2.otu_labels;

      var bub_data = {
       type: "bubble",
        mode: "markers",
        x: x,
        y: y,
        text: text,
        marker: {
          color: bubble_mark,
          size: bubble_mark_size,
        }
      };

      var bub_chart = [bub_data];

      var bub_layout = {
        xaxis: { title: "Bubble Chart" },
      };

      Plotly.newPlot("bubble", chart_1, bubble_layout);

    });

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

  d3.json(data2).then(function (data) {

    var pie_value = data.sample_values.slice(0, 10);
    var pie_label = data.otu_ids.slice(0, 10);
    var pie_hover = data.otu_labels.slice(0, 10);

    var pie_data = [{
      value: pie_value,
      labels: pie_label,
      text: pie_hover,
      type: "pie",
    }];

    var pie_layout = {
      height: 600,
      width: 600,
    };

    Plotly.newPlot("pie", pie_data, pie_layout);

  });
}
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
