// you can create variables with var
// you don't need to use var to create variables, but ALWAYS use it

var myName = "Spencer";
var myAge = 24.85;

// you can have lists (arrays) as well
var myList = [1, 2, 3];

console.log("myList is:", myList);

// you can run for loops as normal
for (var i = 0; i < myList.length; i++) {
    console.log("element ", i, " is ", myList[i]);
}

var myTestData = null;

// null is a good value to initialize variables if you don't have the data right away
// you can create objects with the shorthand notation {}
myTestData = {
    "peru": ["Lima", "Iquitos"]
};

// strings can either be '' or ""



// SCRAPPED CODE FOR SLIDER
   
// generating the slider as either a rect (top) or a trianlge (bottom)

var mySlider = svg
    .append('g')
    .append('rect')
        .attr("x", 21.5)
        .attr("y", 1)
        .attr("width", sliderWidth)
        .attr("height", sliderHeight)
        .attr("class", "slider");



mySlider.call();


// variables to be used above

var sliderWidth = width * 0.03,
    sliderHeight = height * 1.5; */


// using other slider plug in

var slider = d3.slider()
    //.min(new Date("2015-09-01"))
    //.max(new Date("2016-09-01"))
    //.ticks(12)
    //.showRange(false)
    //.value(0)
    .axis( xAxis );

d3.select("#slider").call(slider); // make sure to create a slider div in html

