<template>

  <n-space class="dashboard" item-style="display:flex;" align="center" justify="center" style="flex-wrap: nowrap; align-items: center; justify-content: center;">
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

      <n-scrollbar style="max-height: 200px">
        <n-space class="vertical-scroll-container" item-style="display:block;margin:0px;" align="center" justify="center" style="flex-wrap: wrap;">
          <n-card hoverable v-for="(meeting, index) in meetings" :key="meeting.GroupID" :class="[index % 3 === 0 ? 'custom-card-first' : index % 3 === 1 ? 'custom-card-second' : 'custom-card-third']">
            <n-space vertical align="center" justify="center" item-style="display: flex;">
              <n-h1 class ="group-name">{{ meeting.GroupName }}</n-h1>
              <n-space><n-text class="group-mdate">Date: {{ meeting.mDate }}</n-text></n-space>
              <n-space><n-text class="group-mtime">Time: {{ meeting.mTime }}</n-text></n-space>
              <n-space><n-text class="group-mloc">Location: {{ meeting.mLoc }}</n-text></n-space>
            </n-space>
          </n-card>
        </n-space>
      </n-scrollbar>
    </n-space>

  </n-space>

</template>


<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useMessage } from "naive-ui";
import store from "../store/index.js";

export default defineComponent({
  data() {
    return {
      interval: null,
      time: null,
      date: null,
    };
  },

  beforeDestroy() {
    // prevent memory leak
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

    onMounted(async () => {
      // Generate dummy group data
      meetings.value = [
        {
          GroupID: 1,
          GroupName: "cinnamoroll",
          mDate: "2022-01-01",
          mTime: "10:00 AM",
          mLoc: "258 South Bridge Rd, #01-01, Singapore 058807",
        },
        {
          GroupID: 2,
          GroupName: "pochacco",
          mDate: "2022-01-02",
          mTime: "11:00 AM",
          mLoc: "52 Tanjong Pagar Rd, Singapore 088473",
        },
        {
          GroupID: 3,
          GroupName: "pompompurin",
          mDate: "2022-01-03",
          mTime: "12:00 PM",
          mLoc: "89 Neil Rd, #01-01, Singapore 088849",
        },
      ];

    });
    return {
      meetings
    }
  },
});
</script>



<style scoped>
.dashboard {
  position: relative;
  flex-direction: row;
  margin: 0 10% 0 10%;
  height: 100vh;
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

.vertical-scroll-container{
  gap: 0;
}

.group-name{
  margin: 0 0 0 0;
}

.group-mdate, .group-mtime, .group-mloc{
  display: block;
  overflow: hidden;
  width: 100%;
  gap: 0;
}

</style>