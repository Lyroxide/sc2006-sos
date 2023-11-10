<template>
  <n-space class="group" v-if="group" item-style="display: flex;" justify="space-evenly">
    <n-card :title="group.GroupName" size="huge" content-style="width: 1000px; justify-content: center;">
      <n-tabs default-value="oasis" justify-content="space-evenly" type="line">
        <n-tab-pane name="chat" tab="Group Chat">
          <GroupChat :group-id="group.GroupID"/>
        </n-tab-pane>
        <n-tab-pane name="meeting" tab="Next Meeting">
          <Meeting :group-id="group.GroupID"/>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

<script>
import { onMounted, ref, toRefs , watch, toRaw} from 'vue';
import store from '../store/index.js';
import Meeting from './nextmeeting.vue';
import GroupChat from './groupchat.vue';

export default {
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  components: {
    Meeting,
    GroupChat
  },

  setup(props) {
    const group = ref({});

    watch(() => props.groupId, async (newVal) => {
      if (newVal) {
        group.value = await store.dispatch('group/getGroupDetails', newVal)
            .catch(error => console.error(error));
      }
    }, {immediate: true});



    return {
      group,
      Meeting,
      GroupChat
    };
  },
};
</script>

<style scoped>


</style>