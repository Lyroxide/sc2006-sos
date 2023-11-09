<template>
  <div class="container">
    <n-space class="meeting-panel" style="justify-content: center">
      <n-card title="Next Meeting Details" size="huge" content-style="justify-content: center; align-items: center;">
        <n-thing>
          <template v-if="!isMeetingExists">
            <n-h1>There are no upcoming meetings.</n-h1>
            <n-button
                round type="primary"
                v-show="isGroupOwner"
                @click="editMeeting"
                color="#D9D9D9"
                style="margin-top: 15px; color: #342628"
            >
              Create Meeting
            </n-button>
          </template>
          <template v-else-if="isEditing">
            <n-form ref="formRef" :model="model" style="width:300px">
              <n-text>Date and Time</n-text>
              <n-date-picker
                  type="datetime"
                  :default-value="Date.now()"
                  :is-date-disabled="disablePreviousDate"
                  v-model:value="model.DateTime"
              />
              <n-form-item label="Place">
                <n-input v-model:value="model.MeetingPlace" :disabled="!isEditing" @keydown.enter.prevent/>
              </n-form-item>
              <n-form-item label="Location">
                <n-input v-model:value="model.MeetingAddress" :disabled="!isEditing" @keydown.enter.prevent/>
              </n-form-item>
              <n-form-item label="Description">
                <n-input v-model:value="model.MeetingDesc" :disabled="!isEditing" @keydown.enter.prevent/>
              </n-form-item>
              <n-space align="center" justify="end">
                <n-button
                    round type="primary"
                    @click="handleMeetingAction"
                    color="#D9D9D9"
                    style="margin-top: 15px;"
                >
                  <n-icon :component="Check" color="#342628"/>
                </n-button>
                <n-button
                    round
                    @click="cancelEditing"
                    color="#D9D9D9"
                    style="margin-top: 15px;"
                >
                  <n-icon :component="Times" color="#342628"/>
                </n-button>
              </n-space>
            </n-form>
          </template>
          <template v-else>
            <n-space item-style="flex-direction: row;" align="center" justify="center">
              <n-text style="font-size: 20px; text-align: center;">Date: {{ model.Date }}</n-text>
              <n-text style="font-size: 20px; text-align: center;">Time: {{ model.Time }}</n-text>
            </n-space>
            <n-space item-style="flex-direction: row;" align="center" justify="center">
              <n-text style="text-align: center;">Place Name: {{ model.MeetingPlace }}</n-text>
            </n-space>
            <n-space item-style="flex-direction: row;" align="center" justify="center">
              <n-text style="text-align: center;">Location: {{ model.MeetingAddress }}</n-text>
            </n-space>
            <n-space item-style="flex-direction: row;" align="center" justify="center">
              <n-text style="text-align: center;">{{ model.MeetingDesc }}</n-text>
            </n-space>

            <n-button round type="primary" @click="openGoogleMapsDirections">
              Directions
            </n-button>

            <n-space align="center" justify="end">
              <n-button
                  round type="primary"
                  v-show="isGroupOwner"
                  @click="editMeeting"
                  color="#D9D9D9"
                  style="margin-top: 15px; color: #342628"
              >
                <n-icon :component="Pen" color="#342628"/>
              </n-button>
            </n-space>
          </template>
        </n-thing>

      </n-card>
    </n-space>
    <div v-show="isGroupOwner">
      <input v-if="isEditing" id="pac-input" class="controls" type="text" placeholder="Search Food😋🍴">
      <n-button v-if="isEditing" class="controls" id="get-current-location">Get Current Location📍</n-button>
    </div>
    <div id="map-side-panel">
      <div id="map"></div>
      <div id="side-panel" v-if="showSidePanel">
        <h2>{{ selectedPlace.name }}</h2>
        <h3>🏠Address:</h3>
        <p>{{ selectedPlace.formatted_address }}</p>

        <h3 v-if="selectedPlace.rating">
          ⭐ Rating: {{ selectedPlace.rating }}/5 ⭐
        </h3>
        <h3 v-if="selectedPlace.phone_number">
          📞 Contact: {{ selectedPlace.phone_number }}
        </h3>

        <a
            v-if="selectedPlace.google_url"
            :href="selectedPlace.google_url"
            target="_blank"
        >
          Google 🔎: {{ selectedPlace.name }}
        </a>

        <n-button @click="showSidePanel = false">Close</n-button>
        <n-button @click="confirmPlaceSelection">Confirm</n-button>
        <!-- Add other details and buttons as needed -->
      </div>
    </div>
  </div>

</template>

<script>
import {defineComponent, ref, onMounted, watch, reactive, toRefs} from "vue";
import {Check, Pen, Times, UserRegular} from "@vicons/fa";
import { useMessage } from "naive-ui";
import { DateTime } from 'luxon';
import store from "../store/index.js";

export default defineComponent({
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const formRef = ref(null);
    const message = useMessage();
    const isEditing = ref(false);
    const group = ref({});
    const userDetails = ref({});
    const isGroupOwner = ref(false);
    //const meetingDetails = ref({});
    const isMeetingExists = ref(false);
    const originalMeetingDetails = reactive({});
    const selectedPlace = ref(null);
    const showSidePanel = ref(false);
    const meetingDetails = ref({
      // Initialize your object structure here
      MeetingPlace: '',
      MeetingAddress: '',
      PlaceID: '',
      DateTime: '',
      MeetingDesc: ''
    });


    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        return group.value;
      }
    };

    watch(() => props.groupId, async (newVal) => {
      await getGroupDetails(newVal);
      console.log(group.value);
    }, {immediate: true});

    onMounted(async() => {
      await getGroupDetails(props.groupId);
      console.log(group.value);
      if (group.value) {
        try {
          userDetails.value = await store.dispatch("user/getUserDetails");

          if (userDetails.value.UserID === group.value.OwnerID) {
            isGroupOwner.value = true;
          }
          let meetings = await store.dispatch("meeting/getMeeting", group.value.GroupID);
          meetingDetails.value = await getLatestMeeting(meetings);
          console.log(meetings);
          //console.log(meetingDetails);
          isMeetingExists.value = Boolean(meetingDetails.value);
        } catch (error) {
          console.error(error);
        }
      }

    })

    async function getLatestMeeting(meetings) {
      for (let meeting of meetings) {
        let date = DateTime.fromISO(meeting.MeetingDate).toFormat('dd LLL yyyy');
        let time = DateTime.fromISO(meeting.MeetingDate).toFormat('t');
        let meetingX = DateTime.fromISO(meeting.MeetingDate).toFormat('x');
        let currentX = DateTime.now().toFormat('x');
        console.log(date, time, meetingX, currentX);
        if (meetingX > currentX) {
          meeting.Date = date;
          meeting.Time = time;
          meeting.DateTime =  Number(meetingX);
          return meeting;
        }
      }
      return null;
    }

    const cancelEditing = () => {
      Object.assign(meetingDetails.value, originalMeetingDetails);
      isEditing.value = false; // Exit editing mode.
    };

    const editMeeting = () => {
      Object.assign(originalMeetingDetails, meetingDetails.value);
      isEditing.value = true;
    };

    const saveMeetingDetails = async () => {
      if(isEditing.value) {
        try {
          meetingDetails.value.MeetingDate = DateTime.fromMillis(meetingDetails.value.DateTime).toISO();
          await store.dispatch("meeting/editMeeting", meetingDetails.value);
          message.info("Successfully Saved");
          isEditing.value = false;
        } catch (error) {
          console.error(error);
          message.error("Failed to save");
        }
      }
    }

    const createMeetingDetails = async () => {
      if(isEditing.value) {
        try {
          await store.dispatch("user/editMeeting", meetingDetails.value);
          message.info("Successfully Saved");
          isEditing.value = false;
        } catch (error) {
          console.error(error);
          message.error("Failed to save");
        }
      }
    }

    const handleMeetingAction = () => {
      if(isMeetingExists.value) {
        saveMeetingDetails();
      } else {
        createMeetingDetails();
      }
    };

    const confirmPlaceSelection = () => {
      if (selectedPlace.value) {
        meetingDetails.value.MeetingPlace = selectedPlace.value.name;
        meetingDetails.value.MeetingAddress = selectedPlace.value.formatted_address;
        meetingDetails.value.PlaceID = selectedPlace.value.place_id;
        console.log(meetingDetails.value.PlaceID);
        // No need to log meetingDetails as it is now a reactive reference
        showSidePanel.value = false; // Hides the side panel after confirmation
      } else {
        console.error('No place has been selected.');
      }
    };

    const initializeMap = () => {
      if (window.google && meetingDetails.value.placeID) {
        const mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 15,
        };

        // Initialize the map
        this.map = new google.maps.Map(document.getElementById('map', mapOptions));

        // Use the Place ID to set a marker on the map
        const request = {
          placeId: this.meetingDetails.placeId,
          fields: ['name', 'geometry'],
        };

        // Create a PlacesService instance
        const service = new google.maps.places.PlacesService(this.map);

        service.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.map.setCenter(place.geometry.location);
            new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
            });
          } else {
            console.error("Place details request failed due to", status);
          }
        });
      } else {
        console.error("Google Maps API is not loaded or placeId is missing");
      }

    };
    onMounted(initializeMap);

    return {
      Times,
      Pen,
      Check,
      isGroupOwner,
      formRef,
      cancelEditing,
      editMeeting,
      saveMeetingDetails,
      createMeetingDetails,
      handleMeetingAction,
      model: meetingDetails,
      isEditing,
      isMeetingExists,
      disablePreviousDate(ts) {
        return ts < Date.now()
      },
      ...toRefs(meetingDetails), // Convert the reactive `meetingDetails` to refs
      selectedPlace,
      showSidePanel,
      confirmPlaceSelection,
      initializeMap,
    };
  },


  /////google maps api/////
  name: 'GoogleMapSearch',
  mounted() {
    this.initMap();
  },
  data() {
    return {
      markers: [],
      selectedPlace: null,
      showSidePanel: false,
    }
  },
  methods: {
    // Method to update meetingDetails and hide the side panel
    displayPlaceDetails(place) {
      // Set the selected place details to the reactive property
      this.selectedPlace = {
        name: place.name,
        formatted_address: place.formatted_address,
        rating: place.rating,
        phone_number: place.formatted_phone_number,
        google_url: `https://www.google.com/search?q=${encodeURIComponent(place.name)}`,
        place_id: place.place_id,
      };
      // Show the side panel by setting the flag to true
      this.showSidePanel = true;
    },


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
    // Method to open Google Maps with directions to the address
    openGoogleMapsDirections() {
      // Replace `your-address-goes-here` with the actual address from `meetingDetails`
      const address = encodeURIComponent(this.meetingDetails.MeetingAddress);
      const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
      window.open(googleMapsURL, '_blank');
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

        if (places.length === 0) { //sanity check
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
                place.place_id = marker.placeId;
                this.displayPlaceDetails(place);
                console.log(place);
              }
            });
          });

        });
        map.fitBounds(bounds);
      });
    }, //close initMap
  } //close methods
  //////google maps api///////

});
</script>

<style scoped>

.container{
  position:relative;
  height: 1450px;
}


.n-card {
  border-color: #342628 !important;
  border-width: 3px !important;
  justify-content: center;
  align-items: center;
  background-color: rgba(254,170,0,.60); /* Replace with your desired color for the top half */
  border-radius: 30px;
}


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
  margin-left: 170px;
  margin-top: 50px;

}



#side-panel {

  position: absolute;
  top: 29.9%;
  right: 10%;
  width: 250px;
  height: 42.1%;
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

