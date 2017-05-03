/*


    1. SET YOUR HOME POSITION
    2. YOUR MAP POPUP HTML CODE (without breaks)
    3. PATH TO YOUR MAP ICON
    4. ZOOM FACTOR
    5. COLOR SETTINGS


*/

(function ( $ ) {
    $.fn.CustomMap = function( options ) {
        var settings = $.extend({

            // 1. SET YOUR HOME POSITION
            home: { latitude: 40.712555, longitude: -74.003850 },

            // 2. YOUR MAP POPUP HTML CODE (without breaks)
            text: '<div class="map-popup"><h2 class="underline">Put your own text here</h2><p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p></div>',

            // 3. PATH TO YOUR MAP ICON
            icon_url: 'images/google-map/map-marker-logo.png',

            // 4. ZOOM FACTOR
            zoom: 16

        }, options );

        var coords = new google.maps.LatLng(settings.home.latitude, settings.home.longitude);

        return this.each(function() {
            var element = $(this);

            var options = {
                zoom: settings.zoom,
                scrollwheel: false,
                center: coords,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: true,
                scaleControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT
                },
                overviewMapControl: true
            };

            var map = new google.maps.Map(element[0], options);

            var icon = {
                url: settings.icon_url,
                origin: new google.maps.Point(0, 0)
            };

            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                icon: icon,
                draggable: false
            });

            var info = new google.maps.InfoWindow({
                content: settings.text
            });

            google.maps.event.addListener(marker, 'click', function() {
                info.open(map, marker);
            });


            // 5. COLOR SETTINGS

            var styles = [{
                featureType: "all",
                stylers: [
                    { saturation: -80 }
                ]
            },{
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    { hue: "#48a65b" },
                    { saturation: 10 }
                ]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { hue: "#48a65b" },
                    { saturation: 50 }
                ]
            }, {
                featureType: 'poi.school',
                elementType: 'geometry',
                stylers: [
                    { hue: '#48a65b' },
                    { lightness: -5 },
                    { saturation: 99 }
                ]
            }, {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                    { hue: '#48a65b' },
                    { lightness: -5 },
                    { saturation: 99 }
                ]
            }, {
                featureType: 'poi.park',
                elementType: 'labels.icon',
                stylers: [
                    { hue: '#48a65b' },
                    { lightness: -15 },
                    { saturation: 99 }
                ]
            }
            ];

            map.setOptions({styles: styles});
        });

    };
}( jQuery ));