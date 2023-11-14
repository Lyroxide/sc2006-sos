<template>
  <h4>Description:</h4>
  <n-scrollbar style="height: 300px">
    {{group.GroupDesc}}
    <n-space size="small" style="margin-top: 4px">
      <n-tag
          :bordered="false"
          round
          type="info"
          :color="{ color: '#f4d1bc', borderColor: '#a6a6a6', textColor: '#342628' }"
      >
        <n-icon :component="LocationOutline" size="12" color="#342628"/>
        {{ group.regionPreference }}
      </n-tag>
      <n-tag
          v-for="fp in group.foodPreferences" :bordered="false"
          round
          type="info"
          :color="{ color: '#f4d1bc', borderColor: '#a6a6a6', textColor: '#342628' }"
      >
        {{ fp }}
      </n-tag>
    </n-space>
  </n-scrollbar>
  <n-divider/>
  <n-grid  :cols="2">
    <n-gi class="group-members">
      <n-h4>Group Members:</n-h4>
      <n-scrollbar style="height: 300px">
        <n-space style="flex-direction: row;" v-for="member in groupMembers">
          <n-text>{{ member }}</n-text>
        </n-space>

      </n-scrollbar>

    </n-gi>

    <n-gi style="margin-left:30px">
      <n-h4>Past Meetings:</n-h4>
      <n-scrollbar style="max-height: 350px;">

          <n-timeline>
            <n-timeline-item
                v-for="meeting in pastMeetings"
                :bordered="false"
                type="success"
                :title="meeting.MeetingPlace"
                :content="meeting.MeetingAddress"
                :time="meeting.DateTime"
            />
          </n-timeline>
      </n-scrollbar>
    </n-gi>
  </n-grid>


</template>

<script>
import { LocationOutline } from "@vicons/ionicons5";
import { DateTime } from 'luxon';
import { useMessage } from "naive-ui";
import { defineComponent, ref, watch } from "vue";
import store from "../store/index.js";

export default defineComponent({
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const message = useMessage();
    const group = ref({});
    const groupMembers = ref([]);
    const pastMeetings = ref({});


    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        return group.value;
      }
    };

    const initialFetch = async () => {
      groupMembers.value = await store.dispatch('group/getAllGroupMembers');
      let allMeetings = await store.dispatch('meeting/getMeeting', group.value.GroupID);
      pastMeetings.value = allMeetings.slice(0, -1);
      for (let m of pastMeetings.value) {
        m.DateTime = DateTime.fromISO(m.MeetingDate).toFormat('ff');
      }
      console.log(groupMembers.value);
      console.log(pastMeetings.value);
    }


    watch(() => props.groupId, async (newGroupId) => {
      await getGroupDetails(newGroupId);
      if(group.value){
        try {
          await initialFetch();
        } catch (error) {
          console.error(error);
        }
      }
    }, { immediate: true });



    return {
      LocationOutline,
      group,
      groupMembers,
      pastMeetings,


    };
  }
})
</script>



<style scoped>

.group-members {
  border-right: 1px solid rgb(239,239,245);
}
</style>