<template>
  <!--
  should have:
    carousel
    time
    day date
    scrollable card
      pull next meeting details from all the groups the user is part of
      display in cards
  -->

  <n-space class="dashboard">
    <n-space class="carousel-container">
      <n-carousel autoplay>
        <img class="carousel-img circle" src="../assets/Carou1.png">
        <img class="carousel-img circle" src="../assets/Carou2.png">
        <img class="carousel-img circle" src="../assets/Carou3.png">
        <img class="carousel-img circle" src="../assets/Carou4.png">
      </n-carousel>
    </n-space>

    <n-space class="dashboard-panel">
      <n-space class="time-date-container">
        <n-text class="time">{{ time }}</n-text>
        <n-text class="day-date-year">{{ date }}</n-text>
        <n-space class="scrollable-card">
          <n-scrollbar style="max-height:500px">
            <n-space class="vertical-scroll-container" item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: wrap;">
              <n-card hoverable v-for="(group, index) in groups" :key="group.id" :class="[index % 3 === 0 ? 'custom-card-first' : index % 3 === 1 ? 'custom-card-second' : 'custom-card-third']">
                <n-space vertical align="center" justify="center" item-style="display: flex;">
                  <n-space class="card-top" justify="start">

                    <n-h1 class ="group-name"> {{ group.GroupName }} </n-h1>
                    <font-awesome-icon :icon="['fas', 'user']" class="shift-icon" />

                    <n-text class="group-date">{{  }}</n-text>
                    <n-text class="group-time">{{  }}</n-text>
                    <n-text class="group-location">
                      <n-ellipsis style="max-width: 100px">{{  }}</n-ellipsis>
                    </n-text>

                    </n-space>
                  </n-space>
                <n-space class="group-footer" justify="center" align="center"></n-space>
              </n-card>
            </n-space>
          </n-scrollbar>
        </n-space>
      </n-space>
    </n-space>

  </n-space>


</template>


<script>

import {defineComponent, ref, computed, onMounted} from "vue";
import {useMessage} from "naive-ui";
import store from "../store/index.js";


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
      let currentDate = new Date()
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).format(currentDate)
      this.date = Intl.DateTimeFormat(navigator.language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(currentDate)
    }, 1000)
  },

  setup() {

    const message = useMessage();

    onMounted(async() => {
      const groups = await store.dispatch("group/getOwnGroups");
      for (let group of groups) {
        const meetings = await store.dispatch("meeting/getMeeting", group.GroupID);
        console.log(meetings);
      }
    })
    return {

    };
  },
});

</script>


<style>
.dashboard {
  margin: 10% 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.dashboard-panel {
  /* Add your custom styles for the dashboard panel container */
}

.time-date-container {
  /* Add your custom styles for the time date container */
    width: 100%;
    color: #342628;

}

.time {
  /* Add your custom styles for the time element */
  font-size: 30px;

}

.day-date-year{
  /* Add your custom styles for the day-date-year element */
  font-size: 18px;
}

.scrollable-card {
  /* Add your custom styles for the scrollable card element */
  border-radius: 30px;

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


@media screen and (min-width: 600px) {
  .carousel-container {
    width: 100%;
    padding: 50px;
    /*padding-right: 10px;*/
    overflow: visible;
  }
  .carousel-img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
  }

}

@media screen and (max-width: 600px) {
  .dashboard {
    flex-direction: column;
  }
  .carousel-container {
    width: 400px;
    height: 400px;
    padding: 0;
    /*padding-right: 10px;*/
    overflow: visible;
  }
  .carousel-img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
  }

}

</style>