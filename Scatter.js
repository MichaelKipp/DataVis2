// Part of a brief D3 tutorial.
// Upon completion, will display an interactive scatterplot showing relationship between
//   different values associated with the top 100 words in Shakespeare's First Folio
// CS 314, Spring 2017
// Eric Alexander



// First, we will create some constants to define non-data-related parts of the visualization
w = 200;			// Width of our visualization
h = 200;			// Height of our visualization
xOffset = 40;		// Space for x-axis labels
yOffset = 30;		// Space for y-axis labels
margin = 10;		// Margin around visualization
var row;
var cell

vals = ['Flight Index','O Ring Distress','Launch Temp','Leak Pressure'];


    // Next, we will load in our CSV of data
    d3.csv('challenger.csv', function(csvData) {
    data = csvData;

    for(i = 0; i < 4; i++){
        row = d3.select('#pointsSVG').append("tr:tr");

        for(j = 0; j < 4; j++){
            cell = row.append("td:td")
                .style('horizontal-align', 'middle')
                .style('vertical-align', 'middle');

            if(i == j){
                div = cell.append('div:div')
                    //.style('positon', 'relative')
                    //.style('top', '50%')
                    //.style('transform', 'translateY(-50%)');
                    .style('width', '35%')
                    .style('margin', '0 auto')
//                    .style('vertical-align', 'middle')
                    .style('font-size', '20px');
                
                    
                div.text(vals[i]);

            } else {
                
                xVal = vals[j];		// Value to plot on x-axis
                yVal = vals[i];		// Value to plot on y-axis

                // This will define scales that convert values
                // from our data domain into screen coordinates.
                xScale = d3.scale.linear()
                            .domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
                                     d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
                            .range([yOffset + margin , w - margin - 30]);
                
                yScale = d3.scale.linear()
                            .domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
                                     d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
                            .range([h - xOffset - margin, margin + 15]); // Notice this is backwards!

                // Next, we will create an SVG element to contain our visualization.
                svg = cell.append('svg:svg')
                            .attr('width', w)
                            .attr('height', h);

                // Build axes! (These are kind of annoying, actually...)
                if (i == 0) {
                    xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('top')
                            .innerTickSize(-h)
                            .outerTickSize(1)
                            .ticks(5);
                
                    xAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(0,20)')
                            .call(xAxis);
                } else if (i == 3) {
                    xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom')
                            .innerTickSize(-h)
                            .outerTickSize(1)
                            .ticks(5);
                
                    xAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(0,165)')
                            .call(xAxis);
                } else {
                    xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom')
                            .innerTickSize(-h)
                            .outerTickSize(1)
                            .ticks(5);
                
                    xAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(0,200)')
                            .call(xAxis);
                }
                
                
                
                
                if (j == 0) {
                    yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient('left')
                            .innerTickSize(-w)
                            .outerTickSize(1)
                            .ticks(5);
                    yAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(' + yOffset + ',0)')
                            .call(yAxis);
                } else if (j == 3) {
                    yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient('right')
                            .innerTickSize(-w)
                            .outerTickSize(1)
                            .ticks(5);
                    yAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(170,0)')
                            .call(yAxis);
                } else {
                    yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient('right')
                            .innerTickSize(-w)
                            .outerTickSize(1)
                            .ticks(5);
                    yAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(200,0)')
                            .call(yAxis);
                }
//                yLabel = svg.append('text')
//                            .attr('class','label')
//                            .attr('x', yOffset/2)
//                            .attr('y', h/2-10)
//                            .text(yVal)
//                            // Uncomment the following event handler to change yVal by clicking label (and remove above semi-colon)
//                            .on('click', function() {
//                                setYval(getNextVal(yVal));
//                            });

                // Now, we will start actually building our scatterplot!
                // *****************************************************
                // ************** YOUR CODE WILL GO HERE! **************
                // *****************************************************
                    // Select elements
                var circle = svg.selectAll('circle')
                    .data(data);
                circle.enter()
                    .append('svg:circle')
                    .attr('cx', function(d) {return xScale(d[xVal]);})
                    .attr('cy', function(d) {return yScale(d[yVal]);})
                    .attr('r', 0)
                    .style('fill', '#000000')
                    .on('mouseover', function(d) {
                        d3.select(this).append('svg:title')
                        .style('font-size', '50px')
                        .style('color', '#fff000')
                        .text(function(d){return d['Word'];});
                    })
                    .transition().duration(1000)
                    .attr('r', 2);

                    // Bind data to elements

                    // Create new elements if needed

                    // Update our selection
                        // Give it a class
                        // x-coordinate
                        // y-coordinate
                        // radius
                        // color
                        // tooltip?

                // A function to retrieve the next value in the vals list
                function getNextVal(val) {
                    return vals[(vals.indexOf(val) + 1) % vals.length];
                }

                // A function to change what values we plot on the x-axis
                function setXval(val) {
                    // Update xVal
                    var showingFrequency = true;
                    xVal = val;

                    // Update the axis
                    xScale.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
                                   d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
                    xAxis.scale(xScale);
                    xAxisG.call(xAxis);
                    xLabel.text(xVal);

                    var circle = svg.selectAll('circle')
                        .attr('cy', function(d) {return yScale(d[xVal]);})
                        .attr('r', 0)
                        .style('fill', '#000000')
                        .transition().duration(1000)
                        .attr('r', 4);
                }

                // A function to change what values we plot on the y-axis
                function setYval(val) {
                    // Update yVal
                    yVal = val;

                    // Update the axis
                    yScale.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
                                   d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
                    yAxis.scale(yScale);
                    yAxisG.call(yAxis);
                    yLabel.text(yVal);

                    var circle = svg.selectAll('circle')
                        .attr('cy', function(d) {return yScale(d[yVal]);})
                        .attr('r', 0)
                        .style('fill', '#000000')
                        .transition().duration(1000)
                        .attr('r', 4);
                }
            }
        }
    }
});