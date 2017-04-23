w = 1000;			// Width of our visualization
h = 500;			// Height of our visualization
xOffset = 40;		// Space for x-axis labels
spacing = 300;		// Space for y-axis labels
margin = 10;		// Margin around visualization

vals = ['Flight Index','O Ring Distress','Launch Temp','Leak Pressure'];

// Next, we will load in our CSV of data
d3.csv('challenger.csv', function(csvData) {
    data = csvData;
    
    svg = d3.select('#pointsSVG').append('svg:svg')
        .attr('width', w)
        .attr('height', h);
    
    for (i = 0; i < 4; i++) {
        yVal = vals[i];
        
         yScale = d3.scale.linear()
             .domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
             .range([h - xOffset - margin, margin]);
        
        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .innerTickSize(0)
            .outerTickSize(0)
            .ticks(5);

        yAxisG = svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (50 + (spacing * i)) + ',0)')
            .call(yAxis);
        
        yLabel = svg.append('text')
            .attr('class','label')
            .attr('x', 50 + spacing * i)
            .attr('y', h - 10)
            .text(vals[i]);
        }
    
        var circle = svg.selectAll('circle')
            .data(data);
        for (j = 0; j < 4; j++){
            
            yyVal = vals[j];
            
            yScale = d3.scale.linear()
                .domain([d3.min(data, function(d) { return parseFloat(d[yyVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[yyVal]); })+1])
				.range([h - xOffset - margin, margin]);
            
            circle.enter()
            .append('svg:circle')
            .attr('cy', function(d) {return yScale(d[yyVal]);})
            .attr('cx', function(d) {return 50 + spacing * j;})
            .attr('r', 0)
            .attr('class', function(d) { return "a" + d['Flight Index'];})
            .style('fill', '#000000');
        }
        
        var lineFunction = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("linear");
           
        var clicked = new Array(23);
    
        for (j = 1; j < 24; j ++) {
            circ = d3.selectAll('circle').filter('.a' + j);
            console.log(circ);
            carr = circ.pop();
            var points = new Array(4);
            
            for (i = 0; i < 4; i ++){
                points[i] = { "x": carr[i].getAttribute('cx'), "y": carr[i].getAttribute('cy')};
            }
            
            var lineGraph = svg.append("path")
                .attr("d", lineFunction(points))
                .attr("clicked", "false")
                .attr("stroke", 'black')
                .attr('stroke-opacity', .5)
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .on('click', function(d) {
                    console.log("boop");
                    if (d3.select(this).attr("clicked") == "false") {
                        d3.select(this).attr("clicked", "true");
                        d3.select(this).style("stroke", 'blue');
                        d3.select(this).style('stroke-width',3.5);
                        console.log("fuck");
                    } else {
                        d3.select(this).attr("clicked", "false");
                        d3.select(this).style('stroke','black');
                        d3.select(this).style('stroke-width',2);    
                    }
                });
        }
});
