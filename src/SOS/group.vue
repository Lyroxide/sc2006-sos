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
import { onMounted, ref, toRefs , watch} from 'vue';
import store from '../store/index.js';

export default {
  props: {
    groupId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const group = ref([]);

    watch(() => props.groupId, async (newVal) => {
      if (newVal) {
        console.log(newVal);
        group.value = await store.dispatch('group/getGroupDetails', newVal)
            .then(data => data)
            .catch(error => console.error(error));
        console.log(group.value);
      }
    }, {immediate: true});



    return {
      group,
    };
  },
};
</script>

<style>


</style>