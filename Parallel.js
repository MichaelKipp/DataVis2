Pw = 1000;			// Width of our visualization
Ph = 500;			// Height of our visualization
PxOffset = 40;		// Space for x-axis labels
Pspacing = 300;		// Space for y-axis labels
Pmargin = 10;		// Margin around visualization
var clicked = new Array(23);

Pvals = ['Flight Index','O Ring Distress','Launch Temp','Leak Pressure'];

// Next, we will load in our CSV of data
d3.csv('challenger.csv', function(csvData) {
    data = csvData;
    
    Psvg = d3.select('#parSVG').append('svg:svg')
        .attr('width', Pw)
        .attr('height', Ph);
    
    for (i = 0; i < 4; i++) {
        PyVal = Pvals[i];
        
         PyScale = d3.scale.linear()
             .domain([d3.min(data, function(d) { return parseFloat(d[PyVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[PyVal]); })+1])
             .range([Ph - PxOffset - Pmargin, Pmargin]);
        
        PyAxis = d3.svg.axis()
            .scale(PyScale)
            .orient('left')
            .innerTickSize(0)
            .outerTickSize(0)
            .ticks(5);

        PyAxisG = Psvg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + (50 + (Pspacing * i)) + ',0)')
            .call(PyAxis);
        
        PyLabel = Psvg.append('text')
            .attr('class','label')
            .attr('x', 50 + Pspacing * i)
            .attr('y', Ph - 10)
            .text(Pvals[i]);
        }
    
        var circle = Psvg.selectAll('circle')
            .data(data);
        for (j = 0; j < 4; j++){
            
            yPyVal = Pvals[j];
            
            PyScale = d3.scale.linear()
                .domain([d3.min(data, function(d) { return parseFloat(d[yPyVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[yPyVal]); })+1])
				.range([Ph - PxOffset - Pmargin, Pmargin]);
            
            circle.enter()
            .append('svg:circle')
            .attr('cy', function(d) {return PyScale(d[yPyVal]);})
            .attr('cx', function(d) {return 50 + Pspacing * j;})
            .attr('r', 2)
            .attr('class', function(d) { return "a" + d['Flight Index'];})
            .style('fill', '#000000')
            .on('mouseover', function(d) {
                        circ = d3.selectAll('circle').filter('.a' + d['Flight Index']);
                        circ.style('fill','red');
                        circ.attr('r',4);
                    })
            .on('mouseout', function(d) {
                        circ = d3.selectAll('circle').filter('.a' + d['Flight Index']);
                        circ.style('fill','black');
                        circ.attr('r',2.5);
                        if (clicked[d['Flight Index']] == 1) {
                            circ.style('fill','#FFF000');
                            circ.attr('r',4);
                        }
                    })
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
        
        var lineFunction = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("linear");
           

    
        for (j = 1; j < 24; j ++) {
            circ = d3.selectAll('circle').filter('.a' + j);
            carr = circ.pop();
            var points = new Array(4);
            
            for (i = 0; i < 4; i ++){
                points[i] = { "x": carr[i].getAttribute('cx'), "y": carr[i].getAttribute('cy')};
            }
            
            var lineGraph = Psvg.append("path")
                .attr("d", lineFunction(points))
                .attr("clicked", "false")
                .attr("stroke", 'black')
                .attr('stroke-opacity', .5)
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr("class", '.a' + j)

            
            .on('mouseover', function() {
                d3.select(this).style("stroke", 'red');
                d3.select(this).style('stroke-width',5);
            })
            
            .on('mouseout', function() {
                d3.select(this).style("stroke", 'black');
                d3.select(this).style("stroke-width", 2);
                if (d3.select(this).attr("clicked") == "true") {
                    d3.select(this).style("stroke", 'blue');
                    d3.select(this).style('stroke-width',3.5);
                }
            })
            .on('click', function() {
                if (d3.select(this).attr("clicked") == "false") {
                    d3.select(this).attr("clicked", "true");
                    d3.select(this).style("stroke", 'blue');
                    d3.select(this).style('stroke-width',3.5);
                } else {
                    d3.select(this).attr("clicked", "false");
                    d3.select(this).style('stroke','black');
                    d3.select(this).style('stroke-width',2);    
                }
            
               });
            
            lineGraph.append('svg:title')
                    .text("FI: " + data[j - 1]['Flight Index'] + ", ORD: " + data[j - 1]['O Ring Distress'] + ", LT: " + data[j - 1]['Launch Temp'] + ", LP: " +  data[j - 1]['Leak Pressure'])
        }
    
        lgraps = d3.selectAll('path');
    
        function getNextVal(val) {
	       return Pvals[(Pvals.indexOf(val) + 1) % Pvals.length];
}
});
