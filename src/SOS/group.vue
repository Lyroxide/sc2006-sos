<template>
  <n-space vertical class="group">
    <n-space class="header" justify="start">
      <n-h1>{{ group.GroupName }}</n-h1>
      <n-button>View Next Meeting</n-button>
      <n-text>{{ group.memberCount.count }}/{{ group.Capacity }}</n-text>
    </n-space>
    <n-space class="group-image">
      <n-image
          src=""
      />
    </n-space>


  </n-space>
</template>

<script>
import { onMounted, ref } from 'vue';
import store from '../store/index.js';

export default {
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const group = ref({});

    onMounted(async () => {
      group.value = await store.dispatch('group/getGroupDetails', props.groupId);
    });

    return {
      group,
    };
  },
};
</script>

<style>


</style>