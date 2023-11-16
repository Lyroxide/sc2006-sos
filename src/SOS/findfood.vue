<template>
  <div class="container">
    <!-- show a red box with text to indicate error message -->
    <div v-show="error" class="error-box">{{ error }}</div>
    <n-space class="container2" justify="center">
      <n-select @update:value="getAddressUsingTourism" :options="options" placeholder="Recommend Food 🍔" class="select-component"/>
      <input id="pac-input" class="controls" type="text" placeholder="Search Food😋🍴" v-model="address">
      <n-button class="controls" id="get-current-location" style="margin-top:100px">Get Current Location📍</n-button>
    </n-space>



    <div id="map-side-panel">
      <div id="map"></div>
      <div id="side-panel"></div>
      <n-drawer
          v-model:show="showSidePanel"
          :width="333"
          :placement="placement"
          :trap-focus="false"
          to="#map"
      >
        <n-drawer-content :title="selectedPlace.name">
          <n-h3>🏠Address:</n-h3>
          <n-p>{{ selectedPlace.address }}</n-p>

          <n-h3 v-if="selectedPlace.rating">
            ⭐ Rating: {{ selectedPlace.rating }}/5 ⭐
          </n-h3>
          <n-h3 v-if="selectedPlace.contact">
            📞 Contact: {{ selectedPlace.contact }}
          </n-h3>
          <n-h4 v-if="selectedPlace.description">
            {{ selectedPlace.description }}
          </n-h4>

          <n-space style="flex-direction: row; align-items: center;">
            <n-a
                v-if="selectedPlace.google_url"
                :href="selectedPlace.google_url"
                target="_blank"
            >
              Google 🔎: {{ selectedPlace.name }}
            </n-a>

            <n-a
                v-if="selectedPlace.website"
                :href="selectedPlace.website"
                target="_blank"
            >
              Website 🌐: {{ selectedPlace.name }}
            </n-a>
          </n-space>

        </n-drawer-content>
      </n-drawer>
    </div>


  </div>

</template>

<script>
import {defineComponent, ref, computed, onMounted} from "vue";
import axios from 'axios';
import {SearchOutlined} from "@vicons/material";
import store from "../store/index.js";
const apikey = 'AIzaSyCJEbankCC_fPBj9rycpHn_l1YKRtFnA6E';
const tourism_api_key = 'pjPGEAntFihj9DBpu3HwP3iK4ANq1xX7';

export default {
  name: 'GoogleMapSearch',
  mounted() {
    this.initMap();
  },

  data() {
    return {
      // create global variable for map
      map: null,
      markers: [],
      recommended_markers: [],
      address: '',
      error: '',
      tourism_data: [],
      tourism_place: '',
      value: ref(null),
      geocoder: new google.maps.Geocoder(),
      bounds: new google.maps.LatLngBounds(),
      showSidePanel: false, // Controls the visibility of n-drawer
      selectedPlace: null, // Data for currently selected place
      placement: "right"
    }
  },

  setup(){
    return{
      value: ref(null),
      options:[
        {
          label: "Select Cuisine",
          value: null
        },
        {
          label: "Western Cuisine",
          value: "western"
        },
        {
          label: "Chinese Cuisine",
          value: "chinese"
        },
        {
          label: "Japanese Cuisine",
          value: "japanese"
        },
        {
          label: "Korean Cuisine",
          value: "korean"
        },
        {
          label: "Indian Cuisine",
          value: "indian"
        },
        {
          label: "Thai Cuisine",
          value: "thai"
        },
        {
          label: "Vietnamese Cuisine",
          value: "vietnamese"
        },
        {
          label: "Malay Cuisine",
          value: "malay"
        },
        {
          label: "Halal Food",
          value: "halal"
        },
        {
          label: "Vegetarian Food",
          value: "vegetarian"
        },
        {
          label: "Vegan ",
          value: "vegan"
        }
      ]
    }
  },

  methods: {
    getAddressFrom(lat, long){
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apikey}`)
          .then(response => {
            if(response.data.error_message) {
              this.error = response.data.error_message;
              // alert(response.data.error_message);
            }
            else {
              if(this.address == ''){
                this.address = response.data.results[0].formatted_address;
              }
            }
          }).catch(error => {
        this.error = error.message;
      });
    },

    getAddressUsingTourism(values){
      axios.get(`https://api.stb.gov.sg/content/food-beverages/v2/search?searchType=keyword&searchValues=${values}&limit=50`, {
        headers: {
          "X-API-KEY": tourism_api_key,
          "Content-Type": "application/json"
        }
      })
          .then(response => {
            if(response.data.error_message) {
              // console.log(response.data.error_message);
              this.error = response.data.error_message;
            }
            else {
              // iterate through the array of data and display the name of the place
              const places = response.data.data;
              var location;
              var hasMorePlaces = true;
              var offset = 0;
              // const geocoder = new google.maps.Geocoder();
              this.clearRecommendedMarkers(); // clear all recommended markers when a new dropdown value is selected
              places.forEach(place => {
                // process each place's information
                const lower_cuisine = place.cuisine.toLowerCase();
                const lower_name = place.name.toLowerCase();
                const lower_tags = place.tags.map(tag => tag.toLowerCase());

                if(lower_cuisine.includes(values) === true || lower_name.includes(values) === true || lower_tags.includes(values) === true){
                  const location_data = place.location; // get the location data
                  location = {lat: location_data.latitude, lng: location_data.longitude}; // create an array to be parsed to marker
                  const marker = new google.maps.Marker({
                    map: this.map,
                    position: location,
                    icon: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
                  });
                  this.recommended_markers.push(marker); // Push the marker to the array
                  // console.log(marker);
                  marker.addListener('click', () => {
                    console.log(place);
                    this.displayRecommendedPlaceDetails(place);
                  });
                } //close if


              }); //close forEach
              this.geocoder.geocode({location: location}).then((response) => {
                if(response.results[0]){
                  // console.log(response.results[0]);
                  if (response.results[0].geometry.viewport) {
                    this.bounds.union(response.results[0].geometry.viewport);
                  } else {
                    this.bounds.extend(response.results[0].geometry.location);
                  }
                  this.map.fitBounds(this.bounds);
                  this.map.setZoom(13);
                }
              })
                  .catch((e) => {
                    console.log(e);
                  });
            }
          }).catch(error => {
        this.error = error.message;
        console.log(error);
      });


    },

    clearMarkers() {
      for (const marker of this.markers) {
        marker.setMap(null); // Remove the marker from the map
        marker.setVisible(false); // Hide the marker
      }
      this.markers = []; // Clear the markers array
    },

    clearRecommendedMarkers(){
      for (const marker of this.recommended_markers){
        marker.setMap(null);
        marker.setVisible(false);
      }
      this.recommended_markers = [];
    },

    initMap() {
      const input = document.getElementById('pac-input');
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.3483, lng: 103.6831 },
        zoom: 16,
      });
      // Create the search box and link it to the UI element.
      const searchBox = new google.maps.places.SearchBox(input);

      this.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.getBounds());
      });

      searchBox.addListener('places_changed', () => {
        this.clearMarkers();
        const places = searchBox.getPlaces();

        if (places.length == 0) { //sanity check
          return;
        }

        // For each place, get the icon, name and location.
        this.bounds = new google.maps.LatLngBounds();
        // console.log(places);
        places.forEach(place => {
          if(place.types.includes("food")){
            console.log(place);
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              this.bounds.union(place.geometry.viewport);
            } else {
              this.bounds.extend(place.geometry.location);
            }
            // console.log(place.geometry.location);
            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              placeId: place.place_id  // Store the placeId in the marker
            });
            this.markers.push(marker); // Push the marker to the array

            marker.addListener('click', () => {    //only display details when pin is clicked :D
              const service = new google.maps.places.PlacesService(this.map);
              service.getDetails({
                placeId: marker.placeId,  // Use the placeId from the marker
                fields: ['name', 'formatted_address', 'rating', 'reviews','website', 'url', 'formatted_phone_number','photos']
              }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  this.address = place.formatted_address;
                  this.displayPlaceDetails(place);
                }
              });
            });
          }
        });
        this.map.fitBounds(this.bounds);
      });

      // get current location button
      const getCurrentLocationButton = document.getElementById('get-current-location');
      getCurrentLocationButton.addEventListener("click", () => {
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                this.getAddressFrom(position.coords.latitude, position.coords.longitude);
                this.map.setCenter(pos);
                this.map.setZoom(16);
                // create marker to indicate current location
                const marker = new google.maps.Marker({
                  map: this.map,
                  position: pos,
                  icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                this.markers.push(marker); // Push the marker to the array
              },
              () => {
                alert("Location permission denied");
              }
          )
        }
        else {
          alert("Geolocation is not supported by this browser.");
        }
      });
    }, //close initMap

    displayRecommendedPlaceDetails(place) {
      let formattedAddress = 'N/A';
      if (place.address) {
        // Assemble the address with a conditional comma, based on the existence of streetName and buildingName
        const parts = [];
        if (place.address.streetName) {
          parts.push(place.address.streetName);
        }
        if (place.address.buildingName) {
          parts.push(place.address.buildingName);
        }
        formattedAddress = parts.join(', '); // Joins the address parts with a comma only if there are multiple parts
      }

      this.selectedPlace = {
        name: place.name,
        address: formattedAddress,
        rating: place.rating,
        contact: place.contact ? place.contact.primaryContactNo : 'N/A',
        cuisine: place.cuisine,
        website: place.officialWebsite,
        description: place.description
      };
      this.showSidePanel = true; // Open the drawer
    },

    /* Function that is triggered when a place marker is clicked.
       It updates the 'selectedPlace' property to display details in the drawer */
    displayPlaceDetails(place) {
      this.selectedPlace = {
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        contact: place.formatted_phone_number,
        google_url: place.url ? place.url : `https://www.google.com/search?q=${encodeURIComponent(place.name)}`,
        website: place.website,
      };
      this.showSidePanel = true; // Open the drawer
    },


  } //close methods
}
</script>

<style scoped>

.container{
  margin: 40px;
  height: 80vh;
}
.container2 {
   display: flex;
   flex-direction: row;
 }

 .select-component {
   margin-top: 100px;
 }




#map {
  width: 70%;
  height: 650px;
  margin: 30px auto auto;
  flex-grow:1;
}

.controls {
  margin-top: 10px;
  border: 1px solid transparent;
  border-radius: 2px 0 0 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  height: 32px;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

#pac-input {

  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
  margin-top: 100px;

}



 #side-panel {
   display: none;
   position: fixed;
   top:23.3%;
   right: 10%;
   width: 300px;
   height: 60%;
   background-color: #f9f9f9;
   overflow-y: auto;
   padding: 20px;
   box-shadow: -1px 0 20px rgba(0, 0, 0, 0.1);
   flex-grow: 1;
   opacity: 0.8;
 }

#side-panel h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

#side-panel p {
  margin: 0 0 10px;
}

.error-box {
  background-color: #f9f9f9;
  color: red;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid red;
  border-radius: 5px;
}
.select-component{
  width:200px;
}
</style>


