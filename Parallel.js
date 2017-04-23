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
            .attr('r', .5)
            .attr('class', function(d) { return "a" + d['Flight Index'];})
            .style('fill', '#000000');
                
        
        
    }
});
//    for(i = 0; i < 23; i++){
//        row = d3.select('#pointsSVG').append("tr:tr");
//
//        for(j = 0; j < 4; j++){
//            cell = row.append("td:td")
//                .style('horizontal-align', 'middle')
//                .style('vertical-align', 'middle');
//
//            if(i == j){
//                div = cell.append('div:div')
//                    //.style('positon', 'relative')
//                    //.style('top', '50%')
//                    //.style('transform', 'translateY(-50%)');
//                    .style('width', '35%')
//                    .style('margin', '0 auto')
////                    .style('vertical-align', 'middle')
//                    .style('font-size', '20px');
//                
//                    
//                div.text(vals[i]);
//
//            } else {
//                
//                xVal = vals[j];		// Value to plot on x-axis
//                yVal = vals[i];		// Value to plot on y-axis
//
//                // This will define scales that convert values
//                // from our data domain into screen coordinates.
//                xScale = d3.scale.linear()
//                            .domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
//                                     d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
//                            .range([yOffset + margin , w - margin - 30]);
//                
//                yScale = d3.scale.linear()
//                            .domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
//                                     d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
//                            .range([h - xOffset - margin, margin + 15]); // Notice this is backwards!
//
//                // Next, we will create an SVG element to contain our visualization.
//                svg = cell.append('svg:svg')
//                            .attr('width', w)
//                            .attr('height', h);
//
//                // Build axes! (These are kind of annoying, actually...)
//                if (i == 0) {
//                    xAxis = d3.svg.axis()
//                            .scale(xScale)
//                            .orient('top')
//                            .innerTickSize(-h - 10)
//                            .outerTickSize(1)
//                            .ticks(5);
//                
//                    xAxisG = svg.append('g')
//                            .attr('class', 'axis')
//                            .attr('transform', 'translate(0,25)')
//                            .call(xAxis);
//                } else if (i == 3) {
//                    xAxis = d3.svg.axis()
//                            .scale(xScale)
//                            .orient('bottom')
//                            .innerTickSize(-h - 10)
//                            .outerTickSize(1)
//                            .ticks(5);
//                
//                    xAxisG = svg.append('g')
//                            .attr('class', 'axis')
//                            .attr('transform', 'translate(0,170)')
//                            .call(xAxis);
//                } else {
//                    xAxis = d3.svg.axis()
//                            .scale(xScale)
//                            .orient('bottom')
//                            .innerTickSize(-h - 10)
//                            .outerTickSize(1)
//                            .ticks(5);
//                
//                    xAxisG = svg.append('g')
//                            .attr('class', 'axis')
//                            .attr('transform', 'translate(0,205)')
//                            .call(xAxis);
//                }