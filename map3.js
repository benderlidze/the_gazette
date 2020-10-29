var map;
let markers = [];
let filters = [];
let markerCluster;



function initMap() {

    // get how long the url list is and then device by four to get all the markets
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var campaing_name = url.searchParams.get("campaign");
    var latitude = url.searchParams.get("lat");
    var longitude = url.searchParams.get("lng");
    var zoom = url.searchParams.get("zoom");
    var list_of_params = zoom.split(',')
    const filter = document.getElementById("filter");

    console.log(list_of_params[3]);
    console.log(campaing_name);
    console.log(latitude);
    console.log(longitude);
    console.log(zoom);

    document.getElementById("campaign_name_title").innerHTML = campaing_name;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: Number(zoom),
        center: {
            lat: Number(latitude),
            lng: Number(longitude)
        },
        gestureHandling: 'greedy',
         mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
          }
    });

    var infowindow = new google.maps.InfoWindow();


    full_url = "https://campaign-maps.s3.amazonaws.com/" + campaing_name + "/" + campaing_name + "-inventory.geojson"
    console.log(full_url)
    // NOTE: This uses cross-domain XHR, and may not work on older browsers.
    // map.data.loadGeoJson(full_url);

    // map.data.loadGeoJson(full_url, null, function (features) {
    fetch(full_url)
        .then(i => i.json())
        .then(data => {


            markers = data.features.map(function (feature) {

                if (feature.properties['location_type'] == 'Outdoor') {
                    icon_link = "https://img1.adomni.com/5c4f941611feeHBtFMR42kLhDay9WPq_WRmMG2hAKH5ygXtWKj_original.png";
                } else if (feature.properties['location_type'] == 'Roadside') {
                    icon_link = "https://img1.adomni.com/5c4f941611feeHBtFMR42kLhDay9WPq_WRmMG2hAKH5ygXtWKj_original.png";
                } else if (feature.properties['location_type'] == 'Convenience Store') {
                    icon_link = 'https://img1.adomni.com/5c48e88e79b3arP5-ME-d29FSrbgRKmNzbxN667cQj2h3gRQqz_original.png';
                } else if (feature.properties['location_type'] == 'Spectacular') {
                    icon_link = "https://img1.adomni.com/5c4f941611feeHBtFMR42kLhDay9WPq_WRmMG2hAKH5ygXtWKj_original.png";
                } else if (feature.properties['location_type'] == 'Hotel') {
                    icon_link = "https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/hotel+icon.png";
                } else if (feature.properties['location_type'] == 'Apartment') {
                    icon_link = "https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/hotel+icon.png";
                } else if (feature.properties['location_type'] == 'Gym') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/barbell+smaller.png';
                } else if (feature.properties['location_type'] == 'Gym') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/barbell+smaller.png';
                } else if (feature.properties['location_type'] == '7 Eleven') {
                    icon_link = 'https://img1.adomni.com/5c48e88e79b3arP5-ME-d29FSrbgRKmNzbxN667cQj2h3gRQqz_original.png';

                } else if (feature.properties['location_type'] == 'Gas Station ') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/gas_pump_smaller.png';

                } else if (feature.properties['location_type'] == 'Gas Station') {
                    icon_link = "https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/gas_pump_smaller.png"

                } else if (feature.properties['location_type'] == 'Salon') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/scisors+smaller.png';

                } else if (feature.properties['location_type'] == 'Street Directory ') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/screen+directory+small.png';

                } else if (feature.properties['location_type'] == 'Walmart') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/dr_office_logo.png';

                } else if (feature.properties['location_type'] == 'Outdoor ') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/screen+directory+small.png';

                } else if (feature.properties['location_type'] == '7-Eleven') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/711+logo.png';
                } else if (feature.properties['location_type'] == '7-Elevan') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/711+logo.png';
                } else if (feature.properties['location_type'] == 'Store') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/blue+pin.png';
                } else if (feature.properties['location_type'] == 'Smoke Shop') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/smoke+logo+smaller.png';
                } else if (feature.properties['location_type'] == 'Doctor Office') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/dr_office_logo.png';
                } else if (feature.properties['location_type'] == 'Point Of Care') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/dr_office_logo.png';
                } else if (feature.properties['location_type'] == 'Mall') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/mall+smaller+logo.png';
                } else if (feature.properties['location_type'] == 'Office') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/brief+case+smaller.png';
                } else if (feature.properties['location_type'] == 'Movie Theater') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/movie+icon+smaller.png';
                } else if (feature.properties['location_type'] == 'Restaurant/Bar') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/restraunt+bar+icon.png';
                } else if (feature.properties['location_type'] == 'Dental Office') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/dr_office_logo.png';
                } else if (feature.properties['location_type'] == 'College . Campus') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/graduaction+hat.png';
                } else if (feature.properties['location_type'] == 'Grocery Store') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/grocery+store+smaller.png';
                } else if (feature.properties['location_type'] == 'Bus Stop') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/bus+stop.png';
                } else if (feature.properties['location_type'] == 'University') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/graduaction+hat.png';
                } else if (feature.properties['location_type'] == 'Bar/Restaurant Tv ') {
                    icon_link = 'https://campaign-maps-test.s3.amazonaws.com/map+assets/images+used+on+old+map/restraunt+bar+icon.png';
                } else {
                    icon_link = feature.properties['icon_url']
                }

                const prop = feature.properties['location_type']
                const iconLink = icons.find(i => i.name === prop)
                if (iconLink) {
                    icon_link = 'icons/' + iconLink.url + ".png"
                } else {
                }


                const [lng, lat] = feature.geometry.coordinates
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    clickable: true,
                    icon: {
                        url: icon_link, // url
                        scaledSize: new google.maps.Size(35, 35), // scaled size
                    },
                    strokeWeight: 1,
                    location_type: feature.properties['location_type'],
                });


                marker.addListener('click', function () {
                    clickEvent(feature)
                });

                filters.push({
                    icon: icon_link,
                    type: feature.properties['location_type']
                })

                return marker;
            });

          var mcOptions = {
              styles: [{
                  height: 53,
                  url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m1.png",
                  width: 53
                },
                {
                  height: 56,
                  url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m2.png",
                  width: 56
                },
                {
                  height: 66,
                  url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m3.png",
                  width: 66
                },
                {
                  height: 78,
                  url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m4.png",
                  width: 78
                },
                {
                  height: 90,
                  url: "https://raw.githubusercontent.com/googlearchive/js-marker-clusterer/gh-pages/images/m5.png",
                  width: 90
                }
              ]
            }
            
            //init clusterer with your options
            markerCluster = new MarkerClusterer(map, markers, mcOptions);
        /*
            markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
                maxZoom: 11,
            });
*/
            // filters part 
            const filtersUnique = [...new Map(filters.map(item => [item['type'], item])).values()]
            // console.log('filtersUnique', filtersUnique);

            const divFilters = filtersUnique.sort(function (a, b) {
                if (a.type < b.type) { return -1; }
                if (a.type > b.type) { return 1; }
                return 0;
            })
                .map(i => {
                    return `<div style="display: inline-block; width: 100%;"><label for="${i.type}" ><input type="checkbox" class="filtersSelected" id="${i.type}" checked><img src="${i.icon}" style="width:25px;padding:5px;"> ${i.type}</label></div>`
                }).join(" ")

            filter.innerHTML = `<button class="dropbtn" id="openFilters">Filter Venue Types</button>
                          <div class="dropdown-content">
                            <button id="selectAll">Select all</button>
                            <button id="clearAll">Clear all</button>
                            <button id="close">CLOSE</button>
                            <div class="column">
                            ${divFilters}
                            <div style="clear:both"></div>
                            </div>
                          </div>`;

        });

    document.addEventListener("click", (e) => {

        //filters 
        if (e.target.type === "checkbox" && e.target.classList.contains("filtersSelected")) {
            // console.log(e.target);
            const s = Array.from(document.querySelectorAll("input.filtersSelected:checked"));
            // console.log(s);
            const checked = s.map(i => i.id)
            // console.log(checked);
            markerCluster.clearMarkers()
            markers.map(i => {
                i.setMap(null);
                if (checked.includes(i.location_type)) {
                    // console.log(111);
                    i.setMap(map)
                }
            })
            markerCluster.addMarkers(markers.filter(i => i.map !== null))
            return;
        }

        // select all button
        if (e.target.id === "selectAll") {
            const s = Array.from(document.querySelectorAll("input.filtersSelected")).forEach(i => i.checked = true);
            markerCluster.clearMarkers()
            markers.map(i => {
                i.setMap(map);
            })
            markerCluster.addMarkers(markers.filter(i => i.map !== null))
            return;
        }
        //clear all  button
        if (e.target.id === "clearAll") {
            const s = Array.from(document.querySelectorAll("input.filtersSelected")).forEach(i => i.checked = false);
            markerCluster.clearMarkers()
            markers.map(i => {
                i.setMap(null);
            })
            return;
        }
        //clear all  button
        if (e.target.id === "close") {
            document.querySelector(".dropdown-content").style.display = "none"
            return;
        }
        //clear all  button
        if (e.target.id === "openFilters") {
            document.querySelector(".dropdown-content").style.display = ""

            // const s = document.querySelector(".dropdown-content").style.display
            // if(s === ""){
            //     document.querySelector(".dropdown-content").style.display = "none"
            // }else{
            //     document.querySelector(".dropdown-content").style.display = ""
            // }

            return;
        }
    })

    // global infowindow

    function clickEvent(feature) {
        // var myHTML = event.feature.getProperty("Description");

        console.log(feature);

        var org_name = feature.properties['location_type']

        // console.log(event.feature.l['organization - name']);

        if (org_name == 'Gas Station ') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://www.goldfishads.com/gas' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/gas+station.jpg'></img> </a>"

        } else if (org_name == 'Gyms') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://www.goldfishads.com/gym' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/health+club.png'></img> </a>"

        } else if (org_name == 'Point of Sale') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://www.goldfishads.com/pos' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/Pos.jpg'></img> </a>"

        } else if (org_name == 'Roadside') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com/360view' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Screen+Shot+2019-03-04+at+7.16.28+PM.png'></img> </a>"

        } else if (org_name == 'Salon') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com/salon' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/images/salon.jpg'></img> </a>"

        } else if (org_name == 'Street Directory ') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com/street' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/street+directory.jpg'></img> </a>"

        } else if (org_name == 'Walmart ') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com/walmart' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/health+kiosk.png'></img> </a>"
        } else if (org_name == 'Office Building') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com/' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/captivate.png'></img> </a>"
        } else if (org_name == 'Cinema') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com/' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/cinima.png'></img> </a>"
        } else if (org_name == 'Restaurant/Bar') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/juke+box.jpg'></img> </a>"
        } else if (org_name == '7-Eleven ') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/711+screen.jpg'></img> </a>"
        } else if (org_name == 'Outdoor ') {
            image_path = "<a  target='_blank' rel='noopener noreferrer' href='https://goldfishads.com/street' > <img style='width:60px;height:40px;' src='https://s3.amazonaws.com/geoswap-customer-assets/goldfish/Goldfish+Map+Google/dover/images/street+directory.jpg'></img> </a>"
        }

        image_path = '' //no images line

        const [lon, lat] = feature.geometry.coordinates
        var myHTML = "<strong>" + org_name + "</strong>" //<p>Distance: "+ distance+  "</p> "
        infowindow.setContent("<div style='width:150px; text-align: center;'>" + myHTML + image_path + "</div>");
        infowindow.setPosition(new google.maps.LatLng(lat, lon));
        infowindow.setOptions({
            pixelOffset: new google.maps.Size(0, -30)
        });
        infowindow.open(map);

    }

    google.maps.event.addListener(map, 'tilesloaded', function () {
        var latLng_center = new google.maps.LatLng(latitude, longitude);
        var h = 300;
        var w = 300;

        var centerPixel = map.getProjection().fromLatLngToPoint(latLng_center);
        var pixelSize = Math.pow(2, -zoom);

        var nePoint = new google.maps.Point(centerPixel.x + w * pixelSize, centerPixel.y - h * pixelSize);
        var swPoint = new google.maps.Point(centerPixel.x - w * pixelSize, centerPixel.y + h * pixelSize);

        var ne = map.getProjection().fromPointToLatLng(nePoint);
        var sw = map.getProjection().fromPointToLatLng(swPoint);
    });

    google.maps.event.addListener(map, 'tilesloaded', function () {

        hold_unique_location_types = {
            "NYC": []
        }
        // gnerate rectangle 
        var rectangle = new google.maps.Rectangle({
            map: map,
            // bounds: ([(38.677688146764744, -76.81314921875003),(41.20418352909675, -73.51725078125003)])
            visible: false,
            bounds: {
                north: 41.20418352909675,
                south: 38.677688146764744,
                east: -73.51725078125003,
                west: -76.81314921875003
            }
        })

        // for each of the data points in the Geojson
        map.data.forEach(function (feature) {

            market = "NYC"
            LatLng = feature.getGeometry().get();
            location_type = feature.getProperty("location_type");

            check_within_rectangle(LatLng, location_type, market)
            // console.log(LatLng.toString());

        });


        function check_within_rectangle(LatLng, location_type, market) {

            if (rectangle.getBounds().contains(LatLng)) {
                hold_unique_location_types[market].push(location_type)
            } else {
            }

        }

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        console.log(hold_unique_location_types['NYC'].filter(onlyUnique));
        hold_unique_location_types['NYC'] = hold_unique_location_types['NYC'].filter(onlyUnique)
        console.log(hold_unique_location_types);
    });

}
