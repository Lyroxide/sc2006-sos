<template>
  <div class="container">
    <!-- show a red box with text to indicate error message -->
    <div v-show="error" class="error-box">{{ error }}</div>
    <div class="container2">
      <n-select @update:value="getAddressUsingTourism" :options="options" placeholder="Recommend Food 🍔" class="select-component"/>
      <input id="pac-input" class="controls" type="text" placeholder="Search Food😋🍴" v-model="address">
      <n-button class="controls" id="get-current-location" style="margin-top:100px">Get Current Location📍</n-button>
    </div>



    <div id="map-side-panel">
      <div id="map"></div>
      <div id="side-panel"></div>
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
      bounds: new google.maps.LatLngBounds()
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
                fields: ['name', 'formatted_address', 'rating', 'reviews','website','formatted_phone_number','photos']
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

    displayRecommendedPlaceDetails(place){
      const sidePanel = document.getElementById('side-panel');
      sidePanel.style.display = 'block';
      sidePanel.innerHTML = '';

      const nameElement = document.createElement('h2');
      nameElement.textContent = place.name; // Name
      sidePanel.appendChild(nameElement);

      var address;
      if(place.address.floorNumber){
        address = place.address.block + ' ' + place.address.streetName + ' #' + place.address.floorNumber + "-" + place.address.unitNumber + ' ' + place.address.buildingName;
      }
      else{
        address = place.address.block + ' ' + place.address.streetName + ' ' + place.address.buildingName;
      }
      const addressHeader = document.createElement('h3');
      addressHeader.textContent = `🏠 Address: ${address}`;
      sidePanel.appendChild(addressHeader);
      // const addressElement = document.createElement('p');
      // addressElement.textContent = address; //Address
      // sidePanel.appendChild(addressElement);

      if(place.rating){
        const ratingElement = document.createElement('h3');
        ratingElement.textContent = `⭐ Rating: ${place.rating}/5`; //Rating
        sidePanel.appendChild(ratingElement);
      }

      if(place.contact.primaryContactNo){
        const contactHeader = document.createElement('h3');
        contactHeader.textContent = `📞 Contact: ${place.contact.primaryContactNo}`;
        sidePanel.appendChild(contactHeader);
      }

      if(place.cuisine){
        const cuisineHeader = document.createElement('h3');
        cuisineHeader.textContent = `🍴 Cuisine: ${place.cuisine}`;
        sidePanel.appendChild(cuisineHeader);
      }

      const websiteHeader = document.createElement('h3');
      const websiteElement = document.createElement('a');
      if(place.officialWebsite){
        websiteHeader.textContent = `🌐 Website:`; 
        websiteElement.textContent = `${place.officialWebsite}`; //Website
        // open website in new tab and make sure it is not under localhost:8081/ 
        websiteElement.href = place.officialWebsite;
        websiteElement.target = '_new';
      }
      else{
        websiteHeader.textContent = `Google Search 🔎:`;
        websiteElement.textContent = `${place.name}`; //Website
        websiteElement.href = `https://www.google.com/search?q=${place.name}`;
        websiteElement.target = '_blank';
      }
      sidePanel.appendChild(websiteHeader);
      sidePanel.appendChild(websiteElement);


      const description  = place.description;
      const descriptionHeader = document.createElement('h3');
      descriptionHeader.textContent = `📝 Description:`;
      sidePanel.appendChild(descriptionHeader);
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description; //Description
      sidePanel.appendChild(descriptionElement);


      const newLine = document.createElement('h3');
      newLine.textContent = '';
      sidePanel.appendChild(newLine);

      const closeButton = document.createElement('button');
      closeButton.style.outline = 'none';
      closeButton.style.border = '1px solid';
      closeButton.style.borderRadius = '30px';
      // set border color to same color as card
      closeButton.style.borderColor = '#f7f3f0';
      closeButton.textContent = '✖';
      // position the button in the card at the top right corner
      closeButton.style.position = 'absolute';
      closeButton.style.top = '0';
      closeButton.style.right = '0';
      // add event listener to close the card when clicked
      closeButton.addEventListener('click', () => {
        sidePanel.style.display = 'none';
      });
      sidePanel.appendChild(closeButton);
    },

    displayPlaceDetails(place) {
      // console.log(place);
      const sidePanel = document.getElementById('side-panel');
      sidePanel.style.display = 'block';
      sidePanel.innerHTML = '';

      const nameElement = document.createElement('h2');
      nameElement.textContent = place.name; // Name
      sidePanel.appendChild(nameElement);
      const addressHeader = document.createElement('h3');
      addressHeader.textContent = '🏠 Address:';
      sidePanel.appendChild(addressHeader);''
      const addressElement = document.createElement('p');
      addressElement.textContent = place.formatted_address; //Address
      sidePanel.appendChild(addressElement);
      
      // if places rating is not undefined, display rating
      if(place.rating){
        const ratingElement = document.createElement('h3');
        ratingElement.textContent = `⭐ Rating: ${place.rating}/5`; //Rating
        sidePanel.appendChild(ratingElement);
      }

      if(place.formatted_phone_number){
        const contactHeader = document.createElement('h3');
        contactHeader.textContent = `📞 Contact: ${place.formatted_phone_number}`;
        sidePanel.appendChild(contactHeader);
      }

      // open website in new tab
      if(place.website){
        const websiteElement = document.createElement('a');
        websiteElement.target = '_blank';
        websiteElement.href = `${place.website}`;
        websiteElement.textContent = `Website 🌐: ${place.name}`;
        sidePanel.appendChild(websiteElement);
      }
      else{
        const websiteElement = document.createElement('a');
        websiteElement.target = '_blank';
        websiteElement.href = `https://www.google.com/search?q=${place.name}`;
        websiteElement.textContent = `Google 🔎: ${place.name}`;
        sidePanel.appendChild(websiteElement);
      }

      const newLine = document.createElement('h3');
      newLine.textContent = '';
      sidePanel.appendChild(newLine);


      
      const closeButton = document.createElement('button');
      // closeButton.style.margin = '0 auto';
      // remove click animation when clicked
      closeButton.style.outline = 'none';
      closeButton.style.border = '1px solid';
      closeButton.style.borderRadius = '30px';
      // set border color to same color as card
      closeButton.style.borderColor = '#f7f3f0';
      closeButton.textContent = '✖';
      // position the button in the card at the top right corner
      closeButton.style.position = 'absolute';
      closeButton.style.top = '0';
      closeButton.style.right = '0';
      // add event listener to close the card when clicked
      closeButton.addEventListener('click', () => {
        sidePanel.style.display = 'none';
      });
      sidePanel.appendChild(closeButton);

      // const reviewsHeader = document.createElement('h3');
      // reviewsHeader.textContent = 'Reviews:';
      // sidePanel.appendChild(reviewsHeader);
      // place.reviews.forEach(review => {
      //   const reviewElement = document.createElement('p');
      //   reviewElement.textContent = review.text; //Review
      //   sidePanel.appendChild(reviewElement);
      // });
      /*
      const photoElement = document.createElement('img');
      if (place.photos && place.photos.length > 0) {
        const photoReference = place.photos[1].photo_reference; //DISPLAY PHOTO OF PLACE
        photoElement.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyCJEbankCC_fPBj9rycpHn_l1YKRtFnA6E`;
      }
      sidePanel.appendChild(photoElement); */
    }, //close displayplacedetails
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
   z-index: 1000;
   margin-top: 99px;
   margin-left: 310px;
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
  margin-left: 0px;
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


