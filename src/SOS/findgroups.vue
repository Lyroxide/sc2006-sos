<template>
  <n-space vertical class="findgroups">
    <n-h1> Find Groups Here!</n-h1>
    <n-space item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: nowrap;">

      <n-input v-model:value="searchvalue" type="text" :loading="isSearching" @keyup.enter="searchRequest" placeholder="Search by Group Name">

      </n-input>
      <n-button type="info" @click="searchRequest">
        <n-icon size="24">
          <SearchIcon />
        </n-icon>
      </n-button>
    </n-space>


    <n-space vertical >
      <n-select
          v-model:value="selectedValues"
          placeholder="Food Preferences"
          multiple
          :options="options"
          class="select-component"
          :style="{width: componentWidth}"
      />
    </n-space>


    <n-scrollbar style="max-height: 500px">
      <n-space class="vertical-scroll-container" item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: wrap;">
        <n-card hoverable v-for="(group, index) in groups" :key="group.id" :class="[index % 3 === 0 ? 'custom-card-first' : index % 3 === 1 ? 'custom-card-second' : 'custom-card-third']">
          <n-space vertical align="center" justify="center" item-style="display: flex;">
            <n-space class="card-top" justify="start">
              <n-h1 class ="group-name"> {{ group.GroupName }} </n-h1>
              <font-awesome-icon :icon="['fas', 'user']" class="shift-icon" />
              <n-text class="group-capacity">{{group.memberCount.count}}/{{ group.Capacity }}</n-text>
            </n-space>
            <n-space class="group-description" justify="center" align="center">
              {{ group.GroupDesc }}
            </n-space>
          </n-space>
          <n-space class="group-tags" justify="start">
            <n-tag class="tag" :bordered="false">{{ group.regionPreference }}</n-tag>
            <n-tag v-for="tag in group.foodPreferences" :key="tag" class="tag" :bordered="false">{{ tag }}</n-tag>
          </n-space>
          <n-space class="group-footer" justify="center" align="center">
            <n-button circle @click="joinGroup(group)">
              <font-awesome-icon :icon="['fas', 'user-plus']"/>
            </n-button>
          </n-space>
        </n-card>
      </n-space>
    </n-scrollbar>
  </n-space>
</template>


<script>
import {defineComponent, ref, computed, onMounted} from "vue";
import {useMessage} from "naive-ui";
import {SearchOutlined} from "@vicons/material";
import store from "../store/index.js";
export default defineComponent({
  components: {
    SearchIcon: SearchOutlined,
  },

  setup() {
    const searchvalue = ref("");
    const isSearching = ref(false);
    const filterTag = ref("");
    const filterOptions = ref([]);
    const groups = ref([]);
    const selectedValues = ref(null);
    const message = useMessage();
    const options = ref([]);
    async function searchRequest() {
      isSearching.value = true;

      try {
        groups.value = await store.dispatch("group/getAllGroups");
        isSearching.value = false;
      } catch (error) {
        console.error(error);
      }
    }
    async function joinGroup(group) {
      try {
        let ownGroups = await store.dispatch("group/getOwnGroups");
        for (let g of ownGroups) {
          if (g.GroupID === group.GroupID) {
            message.error("You are already in this group");
            return;
          }
        }
        await store.dispatch("group/joinGroup", group.GroupID);
        message.info("Successfully joined the group");
      } catch (error) {
        console.error(error);
        message.error("Failed to join the group");
      }
    }

    onMounted(async() => {
      const pref = await store.dispatch("preference/getAllFoodPreferences");
      for (let p of pref) {
        options.value.push({
          label: p.FoodType,
          value: `${p.FoodPreferenceID}`
        });
      }
    })

    const componentWidth = computed(() => {
      const baseWidth = 200; // Base width
      const optionWidth = 40; // Width of an option
      return `${baseWidth + selectedValues.length * optionWidth}px`;
    });

    return {
      show: ref(true),
      groups: groups,
      searchvalue,
      isSearching,
      filterTag,
      filterOptions,
      searchRequest,
      joinGroup,
      options: options.value,
      componentWidth,
      selectedValues: selectedValues,
    };
  },
});
</script>



<style scoped>

.n-card {
  border-color: #342628 !important;
  border-width: 3px !important;
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


.shift-icon {
  position: absolute;
  top: 29px;
  right: 20px;
}

.group-capacity {
  position: absolute;
  top: 42px;
  right: 15px;
  font-size: 12px;
}

.findgroups {
  margin: 2% 18%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.shift-icon {
  margin-right: 5px;
}

.group-description {
  background-color: rgb(239, 222, 205);
  height: 200px;
  width: 350px;
  flex-grow: 1;
  padding: 10px;
  border-radius: 30px;
}

.group-tags {
  flex-grow: 1;
  padding: 10px;
}

.tag {
  background-color: rgba(255, 255, 255, .40);
  border-radius: 30px;
  color: #342628;
  padding: 15px;
  font-size: 12px;
}

.select-component{
  width:600px;
}

</style>
