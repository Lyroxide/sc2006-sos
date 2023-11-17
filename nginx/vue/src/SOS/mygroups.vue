<template>
  <n-space class="group-page" item-style="display:flex;margin:10px;" justify="start" style="flex-wrap: nowrap;">
    <n-space vertical class="group-listing">
      <n-tabs
          :key="type + placement"
          :type="type"
          animated
          :placement="placement"
      >
        <n-tab-pane v-for="group in groups" :key="group.GroupID" :name="group.GroupName" :tab="group.GroupName">
          <Group :group-id="group.GroupID"/>
        </n-tab-pane>
      </n-tabs>
    </n-space>
  </n-space>
</template>


<script>
import {defineComponent, ref, computed, onMounted} from "vue";
import {useMessage} from "naive-ui";
import store from "../store/index.js";
import Group from "./group.vue";

export default defineComponent({
  components: {
    Group,
  },

  setup() {
    const groups = ref([]);
    const placement = ref("left");
    const type = ref("card");
    onMounted(async() => {
      const groupsDB = await store.dispatch("group/getOwnGroups");
      for (let g of groupsDB) {
        groups.value.push(g);
      }
    })

    console.log(groups);

    return {
      groups,
      placement,
      type,
    };
  },
});
</script>



<style>


</style>
