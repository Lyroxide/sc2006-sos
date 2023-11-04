<template>
  <n-space vertical class="group" v-if="group.value">
    <n-space class="header" justify="start">
      <n-h1>{{ group.value.GroupName }}</n-h1>
      <n-button>View Next Meeting</n-button>
      <n-text>{{ group.value.Capacity }}</n-text>
    </n-space>
    <n-space class="group-image">
      <n-image
          src=""
      />
    </n-space>
  </n-space>
</template>

<script>
import { onMounted, ref, toRefs , watch, toRaw} from 'vue';
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

    watch(() => props.groupId, async (newVal) => {
      if (newVal) {
        console.log(newVal);
        group.value = await store.dispatch('group/getGroupDetails', newVal)
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