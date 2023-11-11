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
            <!-- Leave Group button -->
          </n-thing>
        </n-list-item>
      </n-list>
      <n-divider />
      <!-- create group model + form here -->
      <n-button circle @click="showModal=true" color="#F7F4EF"><n-icon :component="Plus" color="#342628" size="20px"/></n-button>
      <n-modal v-model:show="showModal" :mask-closable="false">
        <n-space class="createGroup" item-style="display:flex; height: 1000%; width: 200%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
          <n-card size="huge" style="border-radius: 40px;">
            <n-h3> Create your Group! </n-h3>
            <n-form ref="formRef" :model="model" style="width:100%; flex-wrap: nowrap;">
              <!-- enter group name (100), food preference, regional preference, choose photo, description (5000)-->
              <n-space item-style="display: flex; margin-bottom: 30px; border-radius: 20px; font-size: 70px;" justify="center">
                <n-button square @click="addGroupPhoto()" color="#F7F4EF"><n-icon :component="AddPhotoAlternateRound" color="#342628" size="100%"/></n-button>
              </n-space>

              <n-form-item path="groupName" label="Enter Group Name">
                <n-input
                    v-model:value="model.groupName"
                    maxlength="100"
                    @keydown.enter.prevent
                    placeholder="Maximum 100 Characters"
                    show-count
                />
              </n-form-item>

              <n-form-item path="groupDesc" label="Enter Group Description">
                <n-input type="textarea"
                         maxlength="5000"
                         v-model:value="model.groupDesc"
                         @keydown.enter.prevent
                         placeholder="Maximum 5000 Characters"
                         item-style="height: 150%"
                         show-count
                />
              </n-form-item>

              <n-form-item path="foodPref" label="Choose Food Preferences (maximum 3)">
                <n-select v-model:value="model.foodPref" placeholder="Maximum 3 Preferences" multiple :max-tag-count="3" :options="FPoptions" @update:value="handleFPselection"/>
              </n-form-item>

              <n-form-item path="regionPref" label="Choose Regional Preference (only 1)">
                <n-select v-model:value="model.regionPref" placeholder="Only 1 Preferences" :max-tag-count="1" :options="RPoptions" @update:value="handleRPselection"/>
              </n-form-item>

              <n-space align="center" justify="end">
                <n-button circle @click="createGroup" color="#F7F4EF"><n-icon :component="Check" color="#342628" size="110%"/></n-button>
                <n-button circle @click="cancelCreation" color="#F7F4EF"><n-icon :component="Times" color="#342628" size="110%"/></n-button>
              </n-space>
            </n-form>
          </n-card>
        </n-space>
      </n-modal>



    </n-space>
    <n-space v-if="selectedGroupId">
      <Group :group-id="selectedGroupId"/>
    </n-space>
  </n-space>
</template>


<script>
import { LocationOutline } from "@vicons/ionicons5";
import { Check, Plus, Times } from "@vicons/fa";
import { AddPhotoAlternateRound } from "@vicons/material";
import { defineComponent, ref, computed, onMounted, reactive } from "vue";
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

    const message = useMessage()
    const showModal = ref(false)
    const formRef = ref(null);

    const selectGroup = (id) => {
      selectedGroupId.value = id;
      active.value = id;
    }

    const model = ref({
      groupName: null,
      groupDesc: null,
      foodPref: [],
      regionPref: null,
    });

    const RPoptions = ref([]);
    const FPoptions = ref([]);

    // store group details after group has been created
    async function createGroup() {
      try {
        await store.dispatch("group/createGroup", model);
        message.success("Group successfully created!");
        showModal.value = false;
      } catch (error) {
        console.error(error);
        message.error("Failed to create group :(");
      }
    }

    const cancelCreation = () => {
      showModal.value = false;
    }
    const handleFPselection = (selectedFoodPrefs) => {
      if (selectedFoodPrefs.length > 3) {
        message.warning('You can only choose up to 3 food preferences.');
        selectedFoodPrefs.pop();
      }
      model.foodPref = selectedFoodPrefs;
    }
    const handleRPselection = (selectedRegionPref) => {
      model.regionPref = selectedRegionPref;
    }

    onMounted(async() => {
      groups.value = await store.dispatch("group/getOwnGroups");
      for (let group of groups.value) {
        const g = await store.dispatch('group/getGroupDetails', group.GroupID);
        console.log(g);
        Object.assign(group, g);
      }
      const foodPref = await store.dispatch("preference/getAllFoodPreferences");
      for (let p of foodPref) {
        FPoptions.value.push({
          label: p.FoodType,
          value: `${p.FoodPreferenceID}`
        });
      }
      const regionPref = await store.dispatch("preference/getAllRegionPreferences");
      for (let q of regionPref) {
        RPoptions.value.push({
          label: q.RegionType,
          value: `${q.RegionPreferenceID}`
        });
      }
    })

    return {
      LocationOutline,
      Check, Plus, Times,
      AddPhotoAlternateRound,
      active,
      groups,
      selectedGroupId,
      placement,
      type,
      selectGroup,

      model,
      showModal: showModal,
      createGroup,
      cancelCreation,
      FPoptions, RPoptions, handleFPselection, handleRPselection

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