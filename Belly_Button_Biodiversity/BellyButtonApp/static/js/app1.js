function buildMetadata(sample) {
    console.log(sample);
      // @TODO: Complete the following function that builds the metadata panel
      // Use `d3.json` to fetch the metadata for a sample
      // Use d3 to select the panel with id of `#sample-metadata`
      // Use `.html("") to clear any existing metadata
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      
         
      var selected_metadata= d3.select('#sample-metadata');
        
      d3.json(`/metadata/${sample}`).then(d =>{
        selected_metadata.html("");
        selected_metadata.append("ul");
        console.log(Object.entries(d));
        Object.keys(d).forEach(item => {
        selected_metadata.append("li").text(`${item} : ${d[item]}`);
        });
        
      });
    }
    
    function buildCharts(sample) {
      
      // @TODO: Use `d3.json` to fetch the sample data for the plots
      
      d3.json(`/samples/${sample}`).then(d =>{
          
        // @TODO: Build a Bubble Chart using the sample data
          // function bubble_chart(d) {
            var x_cord = d.otu_ids;
            //console.log(x_cord)
            var y_cord =d.sample_values;
            //console.log(y_cord)
            var bubble_size=d.sample_values;
            var bubble_colors=d.otu_ids;
            var bubble_text=d.otu_labels;
    
            var trace_bubble =[{
              x: x_cord,
              y: y_cord,
              mode: 'markers',
              marker: {
                size: bubble_size,
                color: bubble_colors,
              },
              text: bubble_text
            }];
            var layout ={
              title:"<b> Belly Button Bubble Plot</b>",
              xaxis:{
                title: "OTU_ID",
              },
              yaxis:{
                title: "Sample_Value"
              },
              width: 1000,
              plot_bgcolor: 'rgba(0,0,0,0)',
              paper_bgcolor: 'rgba(0,0,0,0)',
            };
    
            Plotly.newPlot('bubble',trace_bubble,layout,{responsive: true});
    
         // }
        // @TODO: Build a Pie Chart
        
        // HINT: You will need to use slice() to grab the top 10 sample_values,
        // otu_ids, and labels (10 each).
       // function pie_chart(d) {
          console.log(d);
          var pie_labels=d.otu_ids.slice(0,10);
          var pie_values=d.sample_values.slice(0,10);
          var pie_text= d.otu_labels.slice(0,10);
    
          // console.log(pie_labels)
          // console.log(pie_values)
          // console.log(pie_text)
    
          var trace_pie = [{
            values: pie_values,
            labels: pie_labels,
            type: "pie",
            textposition: "inside",
            hovertext: pie_text
          }];
    
          var layout ={
            title:'<b>Belly Button Pie Plot</b>',
          };
    
          Plotly.newPlot('pie',trace_pie,layout,{responsive: true});
        //}
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
    