<template>
  <n-space class="dashboard" item-style="display:flex;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-space class="carousel-container">
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

      <n-scrollbar style="max-height: 200px">
        <n-space class="vertical-scroll-container" align="center" justify="center">
          <template v-if="meetings.length > 0">
            <n-card hoverable v-for="(meeting, index) in meetings" :key="meeting.GroupID" :class="[index % 3 === 0 ? 'custom-card-first' : index % 3 === 1 ? 'custom-card-second' : 'custom-card-third']">
              <n-space vertical align="center" justify="center" item-style="display: flex;">
                <n-h1 class ="group-name">{{ meeting.GroupName }}</n-h1>
                <n-space><n-text class="group-mdate">Date: {{ meeting.Date }}</n-text></n-space>
                <n-space><n-text class="group-mtime">Time: {{ meeting.Time }}</n-text></n-space>
                <n-space><n-text class="group-mloc">Location: {{ meeting.MeetingAddress }}</n-text></n-space>
              </n-space>
            </n-card>
          </template>
          <template v-else>
            <n-h1>There are no upcoming meetings.</n-h1>
          </template>

        </n-space>
      </n-scrollbar>
    </n-space>
  </n-space>
</template>


<script>
import { defineComponent, ref, onMounted } from "vue";
import store from "../store/index.js";
import { DateTime } from "luxon";

export default defineComponent({
  data() {
    return {
      interval: null,
      time: null,
      date: null,
    };
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  created() {
    this.interval = setInterval(() => {
      let currentDate = new Date();
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).format(currentDate);
      this.date = Intl.DateTimeFormat(navigator.language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(currentDate);
    }, 1000);
  },

  setup() {
    const meetings = ref([]);
    const meetingDetails = ref({})

    onMounted(async() => {
      const groups = await store.dispatch("group/getOwnGroups");
      for (let group of groups) {
        const allMeetings = await store.dispatch("meeting/getMeeting", group.GroupID);
        meetingDetails.value = await getLatestMeeting(allMeetings);
        meetingDetails.value.GroupName = group.GroupName;
        meetings.value.push(meetingDetails.value);
        console.log(meetingDetails.value);
      }
    })

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

    return {
      meetings,
    };
  },
});
</script>


<style scoped>
.dashboard {
  flex-direction: row;
  width: 50vw;
  height: 70vh;
  margin: 15vh auto;
  justify-content: center;
}

.time {
  font-size: 70px;
}

.text-container {
  align-items: center;
  width: 50%;
  text-align: center;
  flex: 0 1 600px;
}

.day-date-year{
  font-size: 20px;
  white-space: nowrap;
}

.n-card {
  border-color: #342628 !important;
  border-width: 3px !important;
}

@media screen and (min-width: 600px) {
  .carousel-container {
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
  background-color: rgba(254,170,0,.30); /* Replace with your desired color for the top half */
  width: 400px;
  height: 200px;
  border-radius: 30px;
}

.custom-card-second {
  justify-content: center;
  align-items: center;
  background-color: rgba(120,132,2, .30); /* Replace with your desired color for the top half */
  width: 400px;
  height: 200px;
  border-radius: 30px;
}

.custom-card-third {
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 40, 34, .30); /* Replace with your desired color for the top half */
  width: 400px;
  height: 200px;
  border-radius: 30px;
}

.vertical-scroll-container {
  gap: 0;
}

.group-name {
  margin: 0;
}

.group-mdate, .group-mtime, .group-mloc {
  display: block;
  overflow: hidden;
  width: 100%;
  gap: 0;
}

</style>