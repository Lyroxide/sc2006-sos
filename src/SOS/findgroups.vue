<template>
  <n-space vertical class="findgroups" item-style="display:flex; height: 100%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-h1> Find Groups Here!</n-h1>

    <n-space item-style="display:flex;" align="center" justify="center" style="flex-wrap: nowrap;">
      <n-input v-model:value="searchvalue" type="text" :loading="isSearching" @keyup.enter="searchRequest" placeholder="Search by Group Name">
      </n-input>
      <n-button  @click="searchRequest">
        <n-icon size="24" :component="SearchOutlined"/>
      </n-button>
    </n-space>

    <n-space vertical >
      <n-select
          v-model:value="userFoodPrefs"
          placeholder="Food Preferences"
          multiple
          :options="options"
          @update:value="handleFPSelection"
          class="select-component"
          :style="{width: componentWidth}"
      />
    </n-space>


    <n-scrollbar style="max-height: 500px">
      <n-space class="vertical-scroll-container" item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: wrap;">
        <n-card hoverable v-for="(group, index) in groups" :key="group.id" :class="[index % 3 === 0 ? 'custom-card-first' : index % 3 === 1 ? 'custom-card-second' : 'custom-card-third']">
          <n-space vertical align="center" justify="center" item-style="display: flex;">
            <n-space class="card-top">
              <n-grid :cols="4" x-gap="12">
                <n-gi/>
                <n-gi :span="2">
                  <n-space class="group-name" style="font-size: 30px;" justify="center"> {{ group.GroupName }} </n-space>
                </n-gi>
                <n-gi style="display: flex; align-items: center; justify-content: center;">
                  <n-space class="group-count-wrapper" align="center">
                    <n-icon :component="User" class="shift-icon" size="20"/>
                    <n-text class="group-count">{{group.memberCount.count}}</n-text>
                  </n-space>
                </n-gi>

              </n-grid>
            </n-space>

            <n-space class="group-description" justify="center" align="center">
              {{ group.GroupDesc }}
            </n-space>
          </n-space>

          <n-space class="group-tags" justify="start">
            <n-tag class="tag" :bordered="false" style="justify-content: center;"><n-icon :component="LocationOutline" size="12" color="#342628"/>{{ group.regionPreference }}</n-tag>
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
import { SearchOutlined } from "@vicons/material";
import { LocationOutline } from "@vicons/ionicons5";
import { User } from "@vicons/fa";
import store from "../store/index.js";
export default defineComponent({

  setup() {
    const searchvalue = ref("");
    const isSearching = ref(false);
    const filterTag = ref("");
    const filterOptions = ref([]);
    const groups = ref([]);
    const selectedValues = ref(null);
    const message = useMessage();
    const options = ref([]);

    const userFoodPrefs = ref([]);
    const userFoodPrefsProxy = ref({});
    async function searchRequest() {
      try {
        let searchPayload = {};

        // Only add the search criteria to the payload if they exist
        if (searchvalue.value.trim() || userFoodPrefs.value.length) {
          searchPayload = {
            searchValue: searchvalue.value.trim(),
            foodPreferences: userFoodPrefs.value
          };
        }
        groups.value = await store.dispatch("group/searchGroups", searchPayload);
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

      userFoodPrefsProxy.value = await store.dispatch("user/getUserFoodPreferences");
      userFoodPrefs.value = userFoodPrefsProxy.value.map(fp => `${fp.FoodPreferenceID}`);
    })

    const componentWidth = computed(() => {
      const baseWidth = 200; // Base width
      const optionWidth = 40; // Width of an option
      return `${baseWidth + selectedValues.length * optionWidth}px`;
    });

    const handleFPSelection = (selectedFoodPrefs) => {
      userFoodPrefs.value = selectedFoodPrefs;
    }

    return {
      groups: groups,
      searchvalue,
      isSearching,
      filterTag,
      filterOptions,
      searchRequest,
      joinGroup,
      options: options.value,
      componentWidth,
      handleFPSelection,
      userFoodPrefs,
      selectedValues: selectedValues,
      SearchOutlined, User, LocationOutline
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
  background-color: rgba(254,170,0,.50); /* Replace with your desired color for the top half */
  width: 400px;
  height: 400px;
  border-radius: 30px;
}

.custom-card-second {
  justify-content: center;
  align-items: center;
  background-color: rgba(120,132,2, .50); /* Replace with your desired color for the top half */
  width: 400px;
  height: 400px;
  border-radius: 30px;
}

.custom-card-third {
  justify-content: center;
  align-items: center;
  background-color: rgba(87, 40, 34, .50); /* Replace with your desired color for the top half */
  width: 400px;
  height: 400px;
  border-radius: 30px;
}

.findgroups {
  margin: 5% 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
