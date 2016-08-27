// this sytax is very very strange but is a good way to create a complex object in Javascript
var sliderController = (function(d3) {
    var my = {},
        places = null,
        lines = null,
        placeIndex = 0,
        highlightedPlace = null,
        brush = null;

    my.init = function (sliderBrush) {
        console.log("brush", sliderBrush);
        brush = sliderBrush;
        // hides all city dots and names
        cities = d3.selectAll('svg .cities')
            .selectAll('g')
            .style('visibility', 'hidden');

        // hides all route lines
        lines = d3.selectAll('svg g#Lines').selectAll('path, line, polyline')
            .style('visibility', 'hidden');

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
    function toggleHighlight (place, bool) {
        // argument checking
        if (place === null || place.city === null || place.city.size(0) === 0 ||
            typeof bool !== 'boolean') {
            return null;
        }
        var city = place.city,
            cityCircle = city.select('circle, path'),
            cityText = city.select('text');

        cityCircle.classed('highlighted', bool);

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
        //console.log("sliderController:: update: the date is", date)
        console.log("Place Index: ", placeIndex);

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

                //console.log('sliderController:: update: moving backward', places[placeIndex]);

                // unhighlight last place
                toggleHighlight(highlightedPlace, false);

                // hide last city and lines
                hidePlace(highlightedPlace);

                // highlight new place
                highlightedPlace = places[placeIndex];
                toggleHighlight(highlightedPlace, true);

                if (placeIndex === 0) {
                   hidePlace(places[0]);
                   toggleHighlight(places[0], false);
                }
            }
        }

        // select country outlines
        var bolivia = d3.select('svg g#Country_Outlines #Bolivia')
                .selectAll('path'),
            chile = d3.select('svg g#Country_Outlines #Chile')
                .selectAll('path'),
            argentina = d3.select('svg g#Country_Outlines #Argentina')
                .selectAll('path'),
            uruguay = d3.selectAll('svg g#Country_Outlines #Uruguay')
                .selectAll('path'),
            colombia = d3.selectAll('svg g#Country_Outlines #Colombia')
                .selectAll('path'),
            costaRica = d3.selectAll('svg g#Country_Outlines #Costa_Rica')
                .selectAll('path'),
            nicaragua = d3.selectAll('svg g#Country_Outlines #Nicaragua')
                .selectAll('path'),
            honduras = d3.selectAll('svg g#Country_Outlines #Honduras')
                .selectAll('path'),
            centralGreen = d3.selectAll('svg #Central_America_green'),
            centralGray = d3.selectAll('svg #Central_America_gray'),
            southArrow = d3.selectAll('svg #southAmericaArrow'),
            centralArrow = d3.selectAll('svg #centralAmericaArrow');

        function highlightCountryForward () {
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

            if (placeIndex >= 54) {
                centralGreen.style('display', 'inline');
                centralGray.style('display', 'none');
                southArrow.style('display', 'inline').classed('bounce', true);
            }

            if (placeIndex >= 59) {
                costaRica.style('fill', '#CEF275');
            }

            if (placeIndex >= 65) {
                nicaragua.style('fill', '#CEF275');
            }

            if (placeIndex >= 70) {
                honduras.style('fill', '#CEF275');
            }
        }

        function highlightCountryBackward () {
            bolivia
                .style('fill', '#E0E0E0');

            chile
                .style('fill', '#E0E0E0');

            argentina
                .style('fill', '#E0E0E0');

            uruguay
                .style('fill', '#E0E0E0');

            colombia
                .style('fill', '#E0E0E0');

            costaRica
                .style('fill', '#E0E0E0');

            nicaragua
                .style('fill', '#E0E0E0');

            honduras
                .style('fill', '#E0E0E0');

            centralGreen
                .style('display', 'none');

            centralGray
                .style('display', 'inline');

            southArrow
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
            }

            if (placeIndex === 54) {
                centralArrow.style('display', 'inline').classed('bounce', true);
            }

            if (placeIndex >= 57) {
                costaRica.style('fill', '#CEF275');
            }

            if (placeIndex >= 63) {
                nicaragua.style('fill', '#CEF275');
            }

            if (placeIndex >= 68) {
                honduras.style('fill', '#CEF275');
            }
        }

        //console.log('sliderController:: update:', date, 'placeIndex', placeIndex, places[placeIndex]);

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

