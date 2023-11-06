<template>
  <n-space class="group-page" item-style="display:flex;" justify="center" align="center" style="flex-wrap: nowrap; align-items: start; justify-content: center;">
    <n-space vertical class="group-listing">
      <n-list hoverable clickable>
        <n-list-item v-for="group in groups" @click="selectGroup(group.GroupID)" :key="group.GroupID" :class="{ 'active-item': active === group.GroupID }">
          <n-thing :title="group.GroupName" content-style="margin-top: 10px;">
            <template #description>
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
            </template>
            {{ group.GroupDesc }}
          </n-thing>
        </n-list-item>
      </n-list>
      <n-divider />
    </n-space>
    <n-space v-if="selectedGroupId">
      <Group :group-id="selectedGroupId"/>
    </n-space>
  </n-space>
</template>


<script>
import { LocationOutline } from "@vicons/ionicons5";
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
    const active = ref(null);
    const selectedGroupId = ref(null);
    const placement = ref("left");
    const type = ref("card");

    const selectGroup = (id) => {
      selectedGroupId.value = id;
      active.value = id;
    }

    onMounted(async() => {
      groups.value = await store.dispatch("group/getOwnGroups");
      for (let group of groups.value) {
        const g = await store.dispatch('group/getGroupDetails', group.GroupID);
        console.log(g);
        Object.assign(group, g);
      }
    })

    return {
      LocationOutline,
      active,
      groups,
      selectedGroupId,
      placement,
      type,
      selectGroup
    };
  },
});
</script>

<style scoped>

.group-page {
  position: relative;
  flex-direction: row;
  margin: 10% 10% 0 10%;
  height: 100vh;
}


.n-list-item {
  width: 300px;
  background-color: #c19e89;
}

.n-list-item:hover {
  background-color: #c19e89 !important;
  box-shadow: 0px 0px 20px 0px rgba(143, 52, 46, 0.3);
}

.active-item {
  background-color: #c19e89 !important;
  box-shadow: 0px 0px 20px 0px rgba(143, 52, 46, 0.3);
}

</style>