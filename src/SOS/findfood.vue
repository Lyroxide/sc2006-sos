<template>
  <div class="container">
    <input id="pac-input" class="controls" type="text" placeholder="Search Food😋🍴"> 
    <!-- get current location button -->
    <n-button class="controls" id="get-current-location">Get Current Location</n-button>
    <div id="map-side-panel">
      <div id="map"></div>
      <div id="side-panel"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'GoogleMapSearch',
  mounted() {
    this.initMap();
  },
  data() {
    return {
      markers: []
    }
  },
  methods: {
    clearMarkers() {
      for (const marker of this.markers) {
        console.log(marker);
        marker.setMap(null); // Remove the marker from the map
        marker.setVisible(false); // Hide the marker
      }
      // console.log(this.markers.length);
      this.markers = []; // Clear the markers array
      // console.log(this.markers.length);
    },

    initMap() {
      const input = document.getElementById('pac-input');
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.3483, lng: 103.6831 },
        zoom: 16,
      });
      const searchBox = new google.maps.places.SearchBox(input);

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', () => {
        this.clearMarkers();
        const places = searchBox.getPlaces();

        if (places.length == 0) { //sanity check
          return;
        }

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
          // console.log(place.geometry.location);
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            placeId: place.place_id  // Store the placeId in the marker
          });
          this.markers.push(marker); // Push the marker to the array
          
          marker.addListener('click', () => {    //only display details when pin is clicked :D
            const service = new google.maps.places.PlacesService(map);
            service.getDetails({
              placeId: marker.placeId,  // Use the placeId from the marker
              fields: ['name', 'formatted_address', 'rating', 'reviews','website','formatted_phone_number','photos']
            }, (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.displayPlaceDetails(place);
              }
            });
          });

        });
        map.fitBounds(bounds);
      });
    }, //close initMap

    displayPlaceDetails(place) {
      console.log(place);
      const sidePanel = document.getElementById('side-panel');
      sidePanel.style.display = 'block';
      sidePanel.innerHTML = '';

      const nameElement = document.createElement('h2');
      nameElement.textContent = place.name; // Name
      sidePanel.appendChild(nameElement);
      const addressHeader = document.createElement('h3');
      addressHeader.textContent = '🏠Address:';
      sidePanel.appendChild(addressHeader);''
      const addressElement = document.createElement('p');
      addressElement.textContent = place.formatted_address; //Address
      sidePanel.appendChild(addressElement);
      
      // if places rating is not undefined, display rating
      if(place.rating){
        const ratingElement = document.createElement('h3');
        ratingElement.textContent = `⭐ Rating: ${place.rating}/5 ⭐`; //Rating
        sidePanel.appendChild(ratingElement);
      }

      if(place.formatted_phone_number){
        const contactHeader = document.createElement('h3');
        contactHeader.textContent = `📞 Contact: ${place.formatted_phone_number}`;
        sidePanel.appendChild(contactHeader);
      }
      // const contactHeader = document.createElement('h3');
      // contactHeader.textContent = `📞 Contact: ${place.formatted_phone_number}`;
      // sidePanel.appendChild(contactHeader);
      // if(place.website) {
      //   const websiteElement = document.createElement('a');
      //   websiteElement.href = `${place.website}`;
      //   websiteElement.textContent = `${place.website}`; //website
      //   sidePanel.appendChild(websiteElement);
      // }
      // open website in new tab
      const websiteElement = document.createElement('a');
      websiteElement.target = '_blank';
      websiteElement.href = `https://www.google.com/search?q=${place.name}`;
      websiteElement.textContent = `Google 🔎: ${place.name}`;
      sidePanel.appendChild(websiteElement);


      const newLine = document.createElement('h3');
      newLine.textContent = '';
      sidePanel.appendChild(newLine);

      // add button for closing this element
      // center the button in the card
      const closeButton = document.createElement('button');
      closeButton.style.margin = '0 auto';
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
        sidePanel.style.display = 'none';
      });
      sidePanel.appendChild(closeButton);

      // if (place.formatted_phone_number) {
      //   const phoneNumberElement = document.createElement('a');
      //   phoneNumberElement.href = `${place.formatted_phone_number}`;
      //   phoneNumberElement.textContent = `\n ${place.formatted_phone_number}`; //phone no.
      //   sidePanel.appendChild(phoneNumberElement);
      // }
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

/*.container{
display: flex;
flex-direction: column;
height: 80vh;
}

#map-side-panel {
 display: flex;
flex-direction: row;
}  */


#map {
  width: 80%;
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
  border-radius: 10px ;
}

#pac-input {

  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
  margin-left: 680px;
  margin-top: 90px;

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
</style>

