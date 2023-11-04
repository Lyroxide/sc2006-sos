<template>

  <n-space class="dashboard" item-style="display:flex;" align="center" justify="space-evenly" style="flex-wrap: nowrap;">
    <n-space class="carousel-container" justify="center">
      <n-carousel autoplay>
        <img class="carousel-img circle" src="../assets/Carou1.png">
        <img class="carousel-img circle" src="../assets/Carou2.png">
        <img class="carousel-img circle" src="../assets/Carou3.png">
        <img class="carousel-img circle" src="../assets/Carou4.png">
      </n-carousel>
    </n-space>
    <n-space vertical class="text-container">
      <n-space class="time-container">
        <n-text class="time">{{ time }}</n-text>
      </n-space>

      <n-space class="day-date-year-container">
        <n-text class="day-date-year">{{ date }}</n-text>
      </n-space>

      <n-scrollbar style="max-height: 300px">
        <n-space class="vertical-scroll-container" item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: wrap;">
          <n-card hoverable v-for="(meeting, index) in meetings" :key="meeting.ID" :class="[index % 3 === 0 ? 'custom-card-first' : index % 3 === 1 ? 'custom-card-second' : 'custom-card-third']">
            <n-space vertical align="center" justify="center" item-style="display: flex;">
              <n-space class="card-top" justify="start">
                <n-h1 class ="group-name"> {{ meeting.group.GroupName }} </n-h1>
                <font-awesome-icon :icon="['fas', 'user']" class="shift-icon" />
                <n-text class="group-mdate">{{ meeting.mDate }}</n-text>
                <n-text class="group-mtime">{{ meeting.mTime }}</n-text>
                <n-text class="group-mloc">{{ meeting.mLoc }}</n-text>
              </n-space>
            </n-space>
          </n-card>
        </n-space>
      </n-scrollbar>


    </n-space>

  </n-space>

</template>


<script>

import {defineComponent, ref, computed, onMounted} from "vue";
import {useMessage} from "naive-ui";
import store from "../store/index.js";
//import { generateDummyGroups, generateDummyMeetings } from "@/utils/dummyData";


export default defineComponent({
  data() {
    return {
      interval: null,
      time: null,
      date: null
    }
  },


  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      let currentDate = new Date();
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).format(currentDate);
      this.date = Intl.DateTimeFormat(navigator.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(currentDate);
    }, 1000);
  },

  setup() {
    const meetings = ref([]);
    const message = useMessage();

    // create dummy meetings

    /* onMounted(async() => {
      const groups = await store.dispatch("group/getOwnGroups");
      for (let group of groups) {
        const ms = await store.dispatch("meeting/getMeeting", group.GroupID);
        for (let m of ms) {
          // meetings.value.push(m);
        }
      }
    })
    return {
      meetings: meetings.value,
    }; */

  },

});

</script>


<style>
.dashboard {
  position: relative;
  flex-direction: row;
  margin: 0% 15% 0% 15%;
}


.time {
  font-size: 55px;
}

.text-container {
  align-items: center;
  width: 50%;
  text-align: center;
  flex: 15 1 600px;
}

.day-date-year{
  font-size: 30px;
  white-space: nowrap;
}



@media screen and (min-width: 600px) {
  .carousel-container {
    margin: 10% 10%;
    width: 60%;
    flex: 0 0 400px;
  }
  .carousel-img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
  }

}


.custom-card-first {
  justify-content: center;
  align-items: center;
  background-color: rgba(254,170,0,.60); /* Replace with your desired color for the top half */
  width: 400px;
  height: 400px;
  border-radius: 30px;
}

.custom-card-second {
  justify-content: center;
  align-items: center;
  background-color: rgba(120,132,2, .60); /* Replace with your desired color for the top half */
  width: 400px;
  height: 400px;
  border-radius: 30px;
}

.custom-card-third {
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 40, 34, .60); /* Replace with your desired color for the top half */
  width: 400px;
  height: 400px;
  border-radius: 30px;
}

</style>