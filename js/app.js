/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847
 */

"use strict";

// Start with doc ready
$(document).ready(function() {

    // Set up the map
    var mapElem = document.getElementById('map')
    var center = {
        lat: 41.8369,
        lng: -87.6847
    }

    // Show the map
    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    })

    // Build an infoWindow
    var infoWindow = new google.maps.InfoWindow();


    // Get the JSON data and parse it
    $.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
        .done(function(data) {

            data.forEach(function(station) {
                // Put a marker on the map for each station
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map
                });

                // add a listener for the InfoWindow
                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<p>' + station.station_name + '<br>' + station.street_address + '</p>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });
            })
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            // Turn off the spinner
            $('#ajax-loader').fadeOut();
        });






});