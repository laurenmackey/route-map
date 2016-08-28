// size parameters for SVG creation in main()
var maxWidth = 680,
    maxHeight = 80,
    margin = {top: 32, right: 30, bottom: 17, left: 30},
    width = maxWidth - margin.left - margin.right,
    height = maxHeight - margin.top - margin.bottom,
    startingDate = new Date("2015-08-30"),
    endingDate = new Date("2016-09-02"),
    // we create this here so we can use it in main and brushed

    xScale = d3.time.scale()
        .domain([startingDate, endingDate])
        .range([0, width])
        .clamp(true),

    dateFormatter = d3.time.format("%b'%y"),
    sliderDateFormatter = d3.time.format("%b %d")
    // for method chaining (like below) indent everything
    xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(xScale)
        .ticks(13)
        .tickSize(8, 3)
        .outerTickSize([0]) //7.95 was old value
        .tickFormat(function(d) { return dateFormatter(d); }),

    currentAmericaShown = 'south';

function main (event) {
    var svg = d3.select("#timeline").append("svg")
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

    initializeArrowHandlers();
    initializeSlider(svg);
}

// calls the function main after the browser renders index.html
document.addEventListener("DOMContentLoaded", main);

function initializeSlider (svg) {
    var handle = null,
        handleSize = 24,
        brush = d3.svg.brush()
            .x(xScale)
            .extent([startingDate, startingDate])
            .on("brush", brushed)
            .on("brushstart", brushstart)
            .on("brushend", brushend),

        intervalID = null,

        // for switching between south and central maps
        southAmericaEnd = 54,
        centralAmericaStart = 56,
        lastSouthAmericaDate = new Date(PLACES[southAmericaEnd].startDate),
        firstCentralAmericaDate = new Date(PLACES[centralAmericaStart].startDate);

    console.log("PLACES:", PLACES);
    console.log("southAmericaEndPlace:", PLACES[southAmericaEnd], lastSouthAmericaDate);
    console.log("centralAmericaStartPlace:", PLACES[centralAmericaStart], firstCentralAmericaDate);

    function brushed () {
        var value = brush.extent()[0];

        // registers where your mouse is on the x axis, makes a date out of that, and then passes this back in to the xScale so it knows where on the axis to move
        //console.log('brushed', d3.event);
        if (d3.event.sourceEvent) {
            value = xScale.invert(d3.mouse(this)[0]);

            if (currentAmericaShown === 'south' && value > firstCentralAmericaDate) {
                value = firstCentralAmericaDate;
            }
            else if (currentAmericaShown === 'central' && value < lastSouthAmericaDate) {
                value = lastSouthAmericaDate;
            }

            brush.extent([value, value]);
        }

        // moves the slider triangle
        handle.attr("transform", "translate(" + (xScale(value) - (handleSize / 2)) + ",0)");
        handle.select('text').text(sliderDateFormatter(value));
    }

    function brushstart () {
        intervalID = setInterval(sliderController.update, 100);
    }

    function brushend () {
        clearInterval(intervalID);
        sliderController.update();
    }

    // creates the moveable brush
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

    sliderController.init(brush);
    slider.call(brush.event);
}

function initializeArrowHandlers () {
    d3.selectAll('#southAmericaArrow polygon').on('click', function() {
        // fade out South America map
        d3.select('.southAmericaMap')
            .transition()
            .duration(800)
            .style('opacity', 0)
            .each('end', function (d, i) {
                currentAmericaShown = 'central';

                // remove South America map from DOM
                d3.select(this).style('display', 'none');

                // fade in Central America map
                d3.select('.centralAmericaMap')
                    .style('display', 'inline')
                    .style('opacity', 0)
                    .transition()
                    .duration(800)
                    .style('opacity', 1);
            });

    });

    d3.selectAll('#centralAmericaArrow polygon').on('click', function() {
        // fade out Central America map
        d3.select('.centralAmericaMap')
            .transition()
            .duration(800)
            .style('opacity', 0)
            .each('end', function (d, i) {
                currentAmericaShown = 'south';

                // remove Central America map from DOM
                d3.select(this).style('display', 'none');

                // fade in South America map
                d3.select('.southAmericaMap')
                    .style('display', 'inline')
                    .style('opacity', 0)
                    .transition()
                    .duration(800)
                    .style('opacity', 1);
            });
    });
}
