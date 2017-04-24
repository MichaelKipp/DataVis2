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
                            .innerTickSize(-h - 10)
                            .outerTickSize(1)
                            .ticks(5);
                
                    xAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(0,25)')
                            .call(xAxis);
                } else if (i == 3) {
                    xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom')
                            .innerTickSize(-h - 10)
                            .outerTickSize(1)
                            .ticks(5);
                
                    xAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(0,170)')
                            .call(xAxis);
                } else {
                    xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom')
                            .innerTickSize(-h - 10)
                            .outerTickSize(1)
                            .ticks(5);
                
                    xAxisG = svg.append('g')
                            .attr('class', 'axis')
                            .attr('transform', 'translate(0,205)')
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
                            .attr('transform', 'translate(175,0)')
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
                            .attr('transform', 'translate(205,0)')
                            .call(yAxis);
                }
                
                
                
                var circle = cell.select('svg').selectAll('circle')
                    .data(data);
                circle.enter()
                    .append('svg:circle')
                    .attr('cx', function(d) {return xScale(d[xVal]);})
                    .attr('cy', function(d) {return yScale(d[yVal]);})
                    .attr('r', 0)
                    .attr('class', function(d) { return "a" + d['Flight Index'];})
                    .style('fill', '#000000')
                    .on('mouseover', function(d) {
                        circ = d3.selectAll('.a' + d['Flight Index']);
                        pa = d3.selectAll('path').filter('.a' + d['Flight Index']);
                        circ.style('fill','red');
                        circ.attr('r',4);
                        pa.attr("stroke", 'red');
                        pa.attr('stroke-width',5);
                        
                    })
                    .on('mouseout', function(d) {
                        circ = d3.selectAll('.a' + d['Flight Index']);
                        circ.style('fill','black');
                        circ.attr('r',2.5);
                        if (clicked[d['Flight Index']] == 1) {
                            circ.style('fill','#FFF000');
                            circ.attr('r',4);
                        }
                    })
                    .transition().duration(1000)
                    .attr('r', 2.5);
                    circle.append('svg:title')
                            .text(function(d){return "" + d[xVal] + ", " + d[yVal];})
                    
                    circle.on('click', function(d) {
                        if (clicked[d['Flight Index']] == 1) {
                            clicked[d['Flight Index']] = 0;
                            circ.style('fill','black');
                            circ.attr('r',2.5);
                        } else {
                            clicked[d['Flight Index']] = 1;
                            circ.style('fill','#FFF000');
                            circ.attr('r',4);
                        }
        
                    });
            }
        }
    }
});