<template>
  <div class="container">
    <n-space class="meeting-panel" style="justify-content: center">
      <n-card title="Next Meeting Details" size="huge" content-style="justify-content: center; align-items: center;">
        <n-thing>
          <template v-if="isEditing">
            <n-form ref="formRef" :model="model" style="width:300px">
              <n-text>Date and Time</n-text>
              <n-date-picker
                  type="datetime"
                  :default-value="Date.now()"
                  :is-date-disabled="disablePreviousDate"
                  v-model:value="model.DateTime"
              />
              <n-form-item label="Place" style="margin-top: 1em;">
                <n-input v-model:value="model.MeetingPlace" :disabled="!isEditing" @keydown.enter.prevent/>
              </n-form-item>
              <n-form-item label="Location">
                <n-input type="textarea" v-model:value="model.MeetingAddress" :disabled="!isEditing" @keydown.enter.prevent/>
              </n-form-item>
              <n-form-item label="Description">
                <n-input type="textarea" v-model:value="model.MeetingDesc" :disabled="!isEditing" @keydown.enter.prevent/>
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
            <template v-if="!isMeetingExists">
              <n-space vertical justify="center" align="center">
                <n-h1>There are no upcoming meetings.</n-h1>
                <n-button
                    round type="primary"
                    v-show="isGroupOwner && !isMeetingExists"
                    @click="createMeeting"
                    color="#D9D9D9"
                    style="margin-top: 15px; color: #342628"
                >
                  Create Meeting
                </n-button>
              </n-space>

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
              <n-space align="center" justify="center">
                <n-text >{{ model.MeetingDesc }}</n-text>
              </n-space>

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





          </template>
        </n-thing>

      </n-card>
    </n-space>
    <div v-show="isGroupOwner">
      <input v-show="isEditing" ref="searchInputElement" id="pac-input" class="controls" type="text" placeholder="Search Food😋🍴">
      <n-button v-show="isEditing" class="controls" id="get-current-location">Get Current Location📍</n-button>
    </div>
    <div id="map-side-panel">
      <div id="map" ref="mapElement"></div>
      <n-drawer
          v-model:show="showSidePanel"
          :width="333"
          :placement="placement"
          :trap-focus="false"
          to="#map"
      >
        <n-drawer-content :title="selectedPlace.name">
          <n-h3>🏠Address:</n-h3>
          <n-p>{{ selectedPlace.formatted_address }}</n-p>

          <n-h3 v-if="selectedPlace.rating">
            ⭐ Rating: {{ selectedPlace.rating }}/5 ⭐
          </n-h3>
          <n-h3 v-if="selectedPlace.phone_number">
            📞 Contact: {{ selectedPlace.phone_number }}
          </n-h3>

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
            <n-button v-show="isEditing" @click="confirmPlaceSelection">Confirm</n-button>
          </n-space>

        </n-drawer-content>
      </n-drawer>
    </div>
  </div>

</template>

<script>
import {defineComponent, ref, onMounted, watch, reactive, toRefs, nextTick} from "vue";
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
    const isMeetingExists = ref(false);
    const originalMeetingDetails = reactive({});

    const selectedPlace = ref(null);
    const showSidePanel = ref(false);
    const placement = ref("right");
    const meetingDetails = ref({
      MeetingPlace: '',
      MeetingAddress: '',
      PlaceID: '',
      MeetingDesc: ''
    });
    let map = ref(null); // Google Maps 'Map'
    const markers = ref([]); // Array to keep track of all markers

    const mapElement = ref(null); // Create a ref for the map container
    const searchInputElement = ref(null); // Create a ref for the search input
    const isComponentLoaded = ref(false);


    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        return group.value;
      }
    };

    watch(() => props.groupId, async (newVal) => {
      await getGroupDetails(newVal);
      if(group.value){
        try {
          await initialMount();
          if (meetingDetails.value.PlaceID) {
            initializeMap();
          }
        } catch (error) {
          console.error(error);
        }
      }
    }, {immediate: true});

    const initialMount = async() => {
      await getGroupDetails(props.groupId);
      if (group.value) {
        try {
          userDetails.value = await store.dispatch("user/getUserDetails");

          if (userDetails.value.UserID === group.value.OwnerID) {
            isGroupOwner.value = true;
          }
          let meetings = await store.dispatch("meeting/getMeeting", group.value.GroupID);
          meetingDetails.value = await getLatestMeeting(meetings);
          isMeetingExists.value = Boolean(meetingDetails.value);
        } catch (error) {
          console.error(error);
        }
      }
    }

    onMounted( async() => {
      await initialMount();
      if (meetingDetails.value.PlaceID) {
        initializeMap();
      }
    });

    async function getLatestMeeting(meetings) {
      for (let meeting of meetings) {
        let date = DateTime.fromISO(meeting.MeetingDate).toFormat('dd LLL yyyy');
        let time = DateTime.fromISO(meeting.MeetingDate).toFormat('t');
        let meetingX = DateTime.fromISO(meeting.MeetingDate).toFormat('x');
        let currentX = DateTime.now().toFormat('x');
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
      isEditing.value = false;
    };

    const editMeeting = () => {
      Object.assign(originalMeetingDetails, meetingDetails.value);
      isEditing.value = true;
    };

    const createMeeting = () => {
      let currentTime = DateTime.now().toFormat('x');
      meetingDetails.value = {
        MeetingPlace: '',
        MeetingAddress: '',
        PlaceID: '',
        DateTime: Number(currentTime), // using Luxon DateTime for current time handling
        MeetingDesc: ''
      };
      originalMeetingDetails.value = {}; // Reset original details
      console.log(meetingDetails.value);
      isEditing.value = true;
    };

    const saveMeetingDetails = async () => {
      if(isEditing.value) {
        try {
          console.log(meetingDetails.value);
          meetingDetails.value.MeetingDate = DateTime.fromMillis(meetingDetails.value.DateTime).toISO();
          await store.dispatch("meeting/editMeeting", meetingDetails.value);
          message.info("Successfully Saved");
          await initialMount();
          isEditing.value = false;
        } catch (error) {
          console.error(error);
          message.error("Failed to save");
        }
      }
    }

    const createMeetingDetails = async () => {
      console.log(meetingDetails.value);
      if(isEditing.value) {
        try {
          meetingDetails.value.MeetingDate = DateTime.fromMillis(meetingDetails.value.DateTime).toISO();
          await store.dispatch("meeting/createMeeting", meetingDetails.value);
          message.info("Successfully Created");
          await initialMount();
          isEditing.value = false;
        } catch (error) {
          console.error(error);
          message.error("Failed to create");
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

    const displayPlaceDetails = (place) => {
      // Assuming `selectedPlace` and `showSidePanel` are reactive properties defined in the `setup` function.
      selectedPlace.value = {
        name: place.name,
        formatted_address: place.formatted_address,
        rating: place.rating ? place.rating : null,
        phone_number: place.formatted_phone_number ? place.formatted_phone_number : null,
        google_url: place.url ? place.url : `https://www.google.com/search?q=${encodeURIComponent(place.name)}`,
        website: place.website,
        place_id: place.place_id,
      };
      // Show the side panel by setting the flag to true.
      showSidePanel.value = true;
    }


    const confirmPlaceSelection = () => {
      if (selectedPlace.value) {
        meetingDetails.value.MeetingPlace = selectedPlace.value.name;
        meetingDetails.value.MeetingAddress = selectedPlace.value.formatted_address;
        meetingDetails.value.PlaceID = selectedPlace.value.place_id;
        showSidePanel.value = false;
      } else {
        console.error('No place has been selected.');
      }
    };

    ////TO DISPLAY MARKER FOR GROUP MEMBERS FROM EXISTING MEETING UPON LOADING PAGE////
    const createMarkerFromPlaceId = (placeId) => {
      const service = new google.maps.places.PlacesService(map.value);

      service.getDetails({
        placeId,
        fields: ['name', 'formatted_address', 'rating', 'formatted_phone_number', 'geometry', 'url', 'place_id', 'reviews', 'website', 'photos'] // request all necessary fields
      }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const marker = new google.maps.Marker({
            map: map.value,
            position: place.geometry.location,
            title: place.name
            // placeId is not needed here as a property since we get it in the service.getDetails
          });

          // If you want to clear existing markers before adding a new one
          // clearMarkers();

          google.maps.event.addListener(marker, 'click', () => {
            displayPlaceDetails(place);
          });

          markers.value.push(marker); // Add marker to tracking array
          map.value.setCenter(place.geometry.location);
        }
      });
    };

    const clearMarkers = () => {
      markers.value.forEach(marker => marker.setMap(null));
      markers.value = [];
    };

    // Initializes the map
    const initializeMap = () => {
      if (!mapElement.value  || !searchInputElement.value) {
        // Elements are not ready
        return;
      }
      nextTick(() => {
        const mapOptions = {
          center: new google.maps.LatLng(1.3483, 103.6831),
          zoom: 15,
        };

        map.value = new google.maps.Map(mapElement.value, mapOptions);

        if (meetingDetails.value.PlaceID) {
          // If PlaceID exists, we use it to create a marker
          createMarkerFromPlaceId(meetingDetails.value.PlaceID);
        }

        const searchBox = new google.maps.places.SearchBox(searchInputElement.value);

        // Bias the searchBox results towards current map bounds
        map.value.addListener("bounds_changed", () => {
          searchBox.setBounds(map.value.getBounds());
        });

        searchBox.addListener('places_changed', () => {
          const places = searchBox.getPlaces();

          if (places.length === 0) {
            return;
          }

          // Clear out the old markers.
          clearMarkers();

          // Go through each place and create a marker for it
          places.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            const marker = new google.maps.Marker({
              map: map.value,
              title: place.name,
              position: place.geometry.location,
              placeId: place.place_id
            });

            markers.value.push(marker);

            // For only one place, just set the marker as center
            if (places.length === 1) {
              map.value.setCenter(marker.getPosition());
            }

            // For multiple places, fit the map around the markers.
            if (places.length > 1) {
              const bounds = new google.maps.LatLngBounds();
              places.forEach(place => {
                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.value.fitBounds(bounds);
            }

            marker.addListener('click', () => {    //only display details when pin is clicked :D
              const service = new google.maps.places.PlacesService(marker.map);
              service.getDetails({
                placeId: marker.placeId,  // Use the placeId from the marker
                fields: ['name', 'formatted_address', 'rating', 'reviews', 'url','website','formatted_phone_number','photos', 'place_id']
              }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  displayPlaceDetails(place);
                }
              });
            });
          });
        });
      });
    };

    onMounted(() => {
      if (!window.google) {
        loadGoogleMapsScript().then(() => {
          isComponentLoaded.value = true;
        });
      } else {
        isComponentLoaded.value = true;
      }
    });

    watch(isComponentLoaded, (newValue) => {
      if (newValue) {
        initializeMap();
      }
    });

    function loadGoogleMapsScript() {
      return new Promise((resolve) => {
        window.initMap = () => {
          resolve();
          if (mapElement.value && searchInputElement.value) {
            initializeMap();
          }
        };

        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJEbankCC_fPBj9rycpHn_l1YKRtFnA6E&libraries=places&callback=initMap';
        script.defer = true;
        script.async = true;
        window.initMap = resolve;
        document.head.appendChild(script);
      });
    }

    return {
      Times,
      Pen,
      Check,
      isGroupOwner,
      formRef,
      cancelEditing,
      editMeeting,
      createMeeting,
      saveMeetingDetails,
      createMeetingDetails,
      handleMeetingAction,
      model: meetingDetails,
      isEditing,
      isMeetingExists,
      disablePreviousDate(ts) {
        return ts < Date.now();
      },
      ...toRefs(meetingDetails), // Convert the reactive `meetingDetails` to refs
      selectedPlace,
      showSidePanel,
      placement,
      confirmPlaceSelection,
      initializeMap,
      mapElement,
      searchInputElement
    };
  }
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
  background-color: rgba(254,170,0,.30);
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

