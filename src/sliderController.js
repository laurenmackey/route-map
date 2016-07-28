// this sytax is very very strange but is a good way to create a complex object in Javascript
var sliderController = (function(d3) {
    var my = {},
        places = null,
        lines = null,
        placeIndex = 0,
        highlightedPlace = null;

    my.init = function () {
        // hides all city dots and names
        cities = d3.selectAll('svg #Peru_Cities, #Bolivia_Cities, #Chile_Cities, #Argentina_Cities, #Uruguay_Cities, #Colombia_Cities, #Panama_Cities')
            .selectAll('g')
            .style('visibility', 'hidden');

        // hides all route lines
        lines = d3.selectAll('svg #Lines path, line, polyline')
            .style('visibility', 'hidden');

        // adds ticklines back in as they delete from code above
        tickLines = d3.selectAll('svg g .tick line')
            .style('visibility', 'visible');

        // extrapolates all variables from the full places.js file and sets them equal to vars to be
        // used in this js file
        places = PLACES;
        for (var i = 0; i < places.length; i++) {
            places[i].startDate = new Date(places[i].startDate);
            places[i].endDate = new Date(places[i].endDate);
            places[i].city = d3.selectAll(places[i].id);
            if (places[i].incomingLines) {
                for (var j = 0; j < places[i].incomingLines.length; j++) {
                    places[i].incomingLines[j] = d3.selectAll(places[i].incomingLines[j]);
                }
            }
        }

        console.log('sliderController:: init: places', places, 'lines', lines);
    }

    // toggleHighlight either highlights or removes a highlight from a place
    // Inputs: place object, and bool (true | false)
    // ToDo: add additional code to add and delete additional info panel (transport icon and 
    // info about place)

    function toggleHighlight (place, bool) {
        // argument checking
        if (place === null || place.city === null || place.city.size(0) === 0 || typeof bool !== 'boolean') {
            return null;
        }
        var city = place.city,
            cityCircle = city.select('circle, path'),
            cityText = city.select('text');

        cityCircle.classed('highlighted', bool);

        // COND ? first option (COND == true) : second option (COND == false)
        // our actual statement is equivalent to:
        // if (bool) {
        //    cityText.style('visibility': 'visible');
        // } else {
        //    cityText.style('visibility': null);
        // }
        // NOTE: setting a style to null removes it from the DOM
        cityText.style('visibility', bool ? 'visible': null);
    }

    function showPlace (place) {
        for(var i = 0; i < place.incomingLines.length; i++) {
            place.incomingLines[i].style('visibility', 'visible');
        }

        place.city.style('visibility', 'visible');
    }

    function hidePlace (place) {
        for(var i = 0; i < place.incomingLines.length; i++) {
            place.incomingLines[i].style('visibility', 'hidden');
        }

        place.city.style('visibility', 'hidden');
    }
    
    my.update = function () {
        // get the date from the slider
        var date = brush.extent()[0];
        console.log("The date is", date)

        // edge conditions
        if (placeIndex === -1) {
            placeIndex++;

            // unhighlight last place
            toggleHighlight(highlightedPlace, false);

            // reset highlightedPlace
            highlightedPlace = null;
        }
        else if (placeIndex === places.length) {
            placeIndex--;
        }

        function checkForward () {
            for (; placeIndex < places.length && date > places[placeIndex].startDate; placeIndex++) {
 
                //console.log('sliderController:: update: moving forward', places[placeIndex]);
 
                // unhighlight last place
                toggleHighlight(highlightedPlace, false);
 
                // show city and lines
                showPlace(places[placeIndex]);
 
                // highlight new place
                highlightedPlace = places[placeIndex];
                toggleHighlight(highlightedPlace, true);
            }
        } 


        function checkBackward () {
            for (; placeIndex >= 0 && date < places[placeIndex].endDate; placeIndex--) {
 
                console.log('sliderController:: update: moving backward', places[placeIndex]);
 
                // unhighlight last place
                toggleHighlight(highlightedPlace, false);
 
                // hide last city and lines
                hidePlace(highlightedPlace);
 
                // highlight new place
                highlightedPlace = places[placeIndex];
                toggleHighlight(highlightedPlace, true);

                if (placeIndex === 0) {
                   hidePlace (places[0]);
                   toggleHighlight(places[0], false);
                }
            }
        }

        function highlightCountryForward () {
            bolivia = d3.selectAll('svg #Bolivia')
                .selectAll('g')
                .selectAll('path');

            chile = d3.selectAll('svg #Chile')
                .selectAll('g')
                .selectAll('path');

            argentina = d3.selectAll('svg #Argentina')
                .selectAll('g')
                .selectAll('path');

            uruguay = d3.selectAll('svg #Uruguay')
                .selectAll('g')
                .selectAll('path');

            colombia = d3.selectAll('svg #Colombia')
                .selectAll('g')
                .selectAll('path');

            centralGreen = d3.selectAll('svg #Central_America_green');

            centralGray = d3.selectAll('svg #Central_America_gray');

            arrow = d3.selectAll('svg #southAmericaArrow');

            if (placeIndex >= 10) {
                bolivia.style('fill', '#CEF275');
            }

            if (placeIndex >= 16) {
                chile.style('fill', '#CEF275');
            }

            if (placeIndex >= 32) {
                argentina.style('fill', '#CEF275');
            }

            if (placeIndex >= 38) {
                uruguay.style('fill', '#CEF275');
            }

            if (placeIndex >= 48) {
                colombia.style('fill', '#CEF275');
            }

            if (placeIndex >= 55) {
                centralGreen.style('display', 'inline');
                centralGray.style('display', 'none');
                arrow.style('display', 'inline').classed('bounce', true);
            }
        }

        function highlightCountryBackward () {
            bolivia = d3.selectAll('svg #Bolivia')
                .selectAll('g')
                .selectAll('path')
                .style('fill', '#E0E0E0');

            chile = d3.selectAll('svg #Chile')
                .selectAll('g')
                .selectAll('path')
                .style('fill', '#E0E0E0');

            argentina = d3.selectAll('svg #Argentina_Map_path')
                .style('fill', '#E0E0E0');

            uruguay = d3.selectAll('svg #Uruguay')
                .selectAll('g')
                .selectAll('path')
                .style('fill', '#E0E0E0');

            colombia = d3.selectAll('svg #Colombia')
                .selectAll('g')
                .selectAll('path')
                .style('fill', '#E0E0E0');

            centralGreen = d3.selectAll('svg #Central_America_green')
                .style('display', 'none');

            centralGray = d3.selectAll('svg #Central_America_gray')
                .style('display', 'inline');

            arrow = d3.selectAll('svg #southAmericaArrow')
                .style('display', 'none');

            if (placeIndex >= 8) {
                bolivia.style('fill', '#CEF275');
            }

            if (placeIndex >= 14) {
                chile.style('fill', '#CEF275');
            }

            if (placeIndex >= 30) {
                argentina.style('fill', '#CEF275');
            }

            if (placeIndex >= 36) {
                uruguay.style('fill', '#CEF275');
            }

            if (placeIndex >= 46) {
                colombia.style('fill', '#CEF275');
            }

            if (placeIndex >= 53) {
                centralGreen.style('display', 'inline');
                centralGray.style('display', 'none');
                arrow.style('display', 'inline').classed('bounce', true);
            }
        }
    
        console.log('sliderController:: update:', date, 'placeIndex', placeIndex, places[placeIndex]);

        // to start it off
        if (highlightedPlace === null) {
            checkForward();
            highlightCountryForward();
        }

        // if date is before the start date of the current place
        else if (date < highlightedPlace.startDate) {
            checkBackward();
            highlightCountryBackward();
        }

        // else if the date is after the end date of the current place
        else if (date > highlightedPlace.endDate) {
            checkForward();
            highlightCountryForward();
        }

    }

    return my;
}(d3));

