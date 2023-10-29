<template>
  <div>
    <input id="pac-input" class="controls" type="text" placeholder="Search for food">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMapSearch',
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const input = document.getElementById('pac-input');
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
      });
      const searchBox = new google.maps.places.SearchBox(input);

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
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
        });
        map.fitBounds(bounds);
      });
    }
  }
}
</script>

<style scoped>
#map {
  width: 80%;
  height: 550px;
  margin: 30px auto auto;

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
}

#pac-input {
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
  margin-left: 550px;
  margin-top: 60px;
}
</style>
