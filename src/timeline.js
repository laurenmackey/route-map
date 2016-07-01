/* Source file for Interactive map */
// also a valid comment

// this file gets run when it's included into the html file
// you can output to the console of a browser with the command console.log();
// all statements in javascript need to end with ;
// the file executes from top to bottom

console.log("I am running");

// Instantiate your d3 objects here

// size parameters for SVG creation in main()
var maxWidth = 680,
    maxHeight = 80,
    margin = {top: 32, right: 30, bottom: 17, left: 30},
    width = maxWidth - margin.left - margin.right,
    height = maxHeight - margin.top - margin.bottom,
    startingDate = new Date("2015-08-30"),
    endingDate = new Date("2016-09-02"),
    // we create this here so we can use it in main and brushed
    handle = null,
    handleSize = 24,

    // create a d3 scale
    xScale = d3.time.scale()
        .domain([startingDate, endingDate])
        .range([0, width])
        .clamp(true),

    dateFormatter = d3.time.format("%b'%y"),
    sliderDateFormatter = d3.time.format("%b %d")
    // d3 axis using that scale
    // for method chaining (like below) indent everything
    xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(xScale)
        .ticks(13)
        .tickSize(8, 3)
        .outerTickSize([0]) //7.95 was old value
        .tickFormat(function(d) { return dateFormatter(d); }),

    brush = d3.svg.brush()
        .x(xScale)
        .extent([startingDate, startingDate])
        .on("brush", brushed)
        .on("brushstart", brushstart)
        .on("brushend", brushend),

    intervalID = null;

function brushstart () {
    intervalID = setInterval(sliderController.update, 50);
}

function brushend () {
    clearInterval(intervalID);
    sliderController.update();
}

function brushed () {
    var value = brush.extent()[0];

    // registers where your mouse is on the x axis, makes a date out of that, and then passes this back in to the xScale so it knows where on the axis to move
    console.log('brushed', d3.event);
    if (d3.event.sourceEvent) {
        value = xScale.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
    }

    handle.attr("transform", "translate(" + (xScale(value) - (handleSize / 2)) + ",0)");
    handle.select('text').text(sliderDateFormatter(value));
}


// calls the function main when "DOMContentLoaded" is triggered
document.addEventListener("DOMContentLoaded", main);

// put user interaction code here
function main (event) {
    // this where you want to write execution code
    console.log("I am loaded completely", event);
    console.log("Let's see if d3 loaded", d3);

    var svg = d3.select("#Timeline").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var timeline = svg
        .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "axis")
        .call(xAxis)
        .selectAll('text')
            .style("text-anchor", 'end')
            .attr('dx', '-.6em')
            .attr('dy', '.45em')
            .attr('transform', 'rotate(-40)');

    var slider = svg
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + 0 + ")")
        .attr("class", "full_slider")
        .call(brush);

    // this removes unnecessary parts of the brush
    slider.selectAll(".extent,.resize")
        .remove();

    // gives the selection rect a height (defaults to 0 height) and hence an area
    slider.select(".background")
        .attr("height", height + margin.top + margin.bottom)
        .style("cursor", "pointer");

    // this doesn't use var because we are assigning the already declared variable to the newly created 'g'
    // if we used var here, main would have removed this variable and brushed couldn't use it
    handle = slider
        .append('g')
        .attr("class", "handle");

    var mySlider = handle
        .append('path')
        .attr("d", "M 0 16 L 24 16 L 12 31 L 0 16")
        .attr("class", "slider");

    var myText = handle
        .append('text')
        .attr("transform", "translate(" + (-9) + " ," + (11) + ")")
        .attr("class", "text");

    sliderController.init();
    slider.call(brush.event);
}
