<template>
  <n-grid  :cols="2">
    <n-gi class="description">
      <n-h4>Description:</n-h4>
      <n-scrollbar style="height: 250px">
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
      <n-space align="center" justify="end">
        <n-button v-show="isGroupOwner" round type="primary" @click="editGroupDetails" color="#D9D9D9"><n-icon :component="Pen" color="#342628"/></n-button>
      </n-space>
    </n-gi>
    <n-gi style="margin-left:30px">
      <n-space style="height: 300px" justify="center">
        <n-image
            v-if="group.pictureFilePath"
            :src="`http://localhost:8080/uploads/${group.pictureFilePath}`"
            alt="Group Picture"
            style="width: auto; height: 300px; object-fit: none; object-position: center; overflow: hidden;"
        />
      </n-space>
    </n-gi>
  </n-grid>

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
      <n-scrollbar style="max-height: 300px;">

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


  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-space class="createGroup" item-style="display:flex; height: 1000%; width: 200%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
      <n-card size="huge" style="border-radius: 40px;">
        <n-h3 style="text-align: center;"> Edit Group Details </n-h3>
        <n-form ref="formRef" :model="model"  :rules="rules" style="width:100%; flex-wrap: nowrap;">
          <n-space item-style="display: flex; margin-bottom: 30px; justify-content: center;" justify="center">
            <n-button round @click="fileInputClick" color="#F7F4EF"><n-icon :component="AddPhotoAlternateRound" color="#342628" size="100%"/></n-button>
            <input type="file" ref="fileInput" @change="onFileChange" style="display: none" />
            <img v-if="previewImage" :src="previewImage" alt="Preview" class="preview-image" />
            <n-button round @click="clearImage" color="#F7F4EF" v-if="previewImage"><n-icon :component="Close" color="#342628" size="100%"/></n-button>
          </n-space>

          <n-form-item path="GroupName" label="Enter Group Name">
            <n-input
                v-model:value="model.GroupName"
                maxlength="100"
                @keydown.enter.prevent
                placeholder="Maximum 100 Characters"
                show-count
            />
          </n-form-item>

          <n-form-item path="GroupDesc" label="Enter Group Description">
            <n-input type="textarea"
                     maxlength="3000"
                     v-model:value="model.GroupDesc"
                     @keydown.enter.prevent
                     placeholder="Maximum 3000 Characters"
                     item-style="height: 150%"
                     show-count
            />
          </n-form-item>

          <n-form-item path="foodPreferences" label="Choose Food Preferences (maximum 3)">
            <n-select v-model:value="model.foodPreferences" placeholder="Maximum 3 Preferences" multiple :max-tag-count="3" :options="FPOptions" @update:value="handleFPSelection"/>
          </n-form-item>

          <n-form-item path="regionPreference" label="Choose Regional Preference (only 1)">
            <n-select v-model:value="model.regionPreference" placeholder="Only 1 Preference" :max-tag-count="1" :options="RPOptions" @update:value="handleRPSelection"/>
          </n-form-item>

          <n-space align="center" justify="end">
            <n-button circle @click="updateGroupDetails" color="#F7F4EF" :disabled="!model.GroupName || !model.GroupDesc || model.foodPreferences.length === 0 || !model.regionPreference"><n-icon :component="Check" color="#342628" size="110%"/></n-button>
            <n-button circle @click="cancelCreation" color="#F7F4EF"><n-icon :component="Times" color="#342628" size="110%"/></n-button>
          </n-space>
        </n-form>
      </n-card>
    </n-space>
  </n-modal>



</template>

<script>
import { Check, Pen, Times, UserRegular } from "@vicons/fa";
import { LocationOutline, Close } from "@vicons/ionicons5";
import { DateTime } from 'luxon';
import { useMessage } from "naive-ui";
import {defineComponent, onMounted, ref, watch} from "vue";
import store from "../store/index.js";
import { AddPhotoAlternateRound } from "@vicons/material";

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
    const showModal = ref(false)
    const formRef = ref(null);
    const model = ref({
      GroupName: null,
      GroupDesc: null,
      foodPreferences: [],
      regionPreference: null,
      selectedFile: null,
    });
    const fileInput = ref(null);
    const previewImage = ref(null);

    const RPOptions = ref([]);
    const FPOptions = ref([]);

    const isGroupOwner = ref(false);

    const rules = {
      GroupName: [
        {
          required: true,
          message: "Group Name is required",
          trigger: ["input", "blur"]
        }
      ],
      GroupDesc: [
        {
          required: true,
          message: "Description is required",
          trigger: ["input", "blur"]
        }
      ],
      foodPreferences: [
        {
          required: true,
          message: "Select at least 1 preference"
        }
      ],
      regionPreference: [
        {
          required: true,
          message: "Regional preference is required"
        }
      ],
    }


    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        return group.value;
      }
    };

    const initialFetch = async () => {
      const pictureData = await store.dispatch('group/getGroupPictureFilePath', group.value.GroupID);
      console.log(pictureData);
      group.value.pictureFilePath = pictureData.PictureFile;
      groupMembers.value = await store.dispatch('group/getAllGroupMembers');
      let allMeetings = await store.dispatch('meeting/getMeeting', group.value.GroupID);
      pastMeetings.value = allMeetings.slice(0, -1);
      for (let m of pastMeetings.value) {
        m.DateTime = DateTime.fromISO(m.MeetingDate).toFormat('ff');
      }
      const userDetails = await store.dispatch("user/getUserDetails");
      if (userDetails.UserID === group.value.OwnerID) {
        isGroupOwner.value = true;
      }
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

    onMounted(async() => {
      const foodPrefProxy = await store.dispatch("preference/getAllFoodPreferences");
      for (let p of foodPrefProxy) {
        FPOptions.value.push({
          label: p.FoodType,
          value: `${p.FoodPreferenceID}`
        });
      }

      const regionPrefProxy = await store.dispatch("preference/getAllRegionPreferences");
      for (let q of regionPrefProxy) {
        RPOptions.value.push({
          label: q.RegionType,
          value: `${q.RegionPreferenceID}`
        });
      }
    })


    const editGroupDetails = () => {
      Object.assign(model.value, group.value);
      console.log(model.value);
      showModal.value = true;
    };

    const updateGroupDetails = async () => {
      await store.dispatch('group/updateGroupDetails', model.value);
      await getGroupDetails(props.groupId);
      showModal.value = false;
    };

    function onFileChange(e) {
      const file = e.target.files[0];
      model.value.selectedFile = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.value = e.target.result;
          //console.log('Image selected, previewImage:', model.value.previewImage);
        };
        reader.readAsDataURL(file);
      }
    }

    async function fileInputClick() {
      //console.log('fileInputClick called');
      if (fileInput.value) {
        //console.log('fileInput.value is defined');
        fileInput.value.click();
      } else {
        //console.log('fileInput.value is not defined');
      }
    }

    function clearForm() {
      model.value.GroupName = null;
      model.value.GroupDesc = null;
      model.value.regionPreference = null;
      model.value.selectedFile = null;
      model.value.foodPreferences = [];
      previewImage.value = null;
    }

    function clearImage() {
      model.value.selectedFile = null;
      previewImage.value = null;
      if (fileInput.value) {
        fileInput.value.value = null;
      }
    }

    const cancelCreation = () => {
      clearForm();
      showModal.value = false;
    }
    const handleFPSelection = (selectedFoodPrefs) => {
      if (selectedFoodPrefs.length > 3) {
        message.warning('You can only choose up to 3 food preferences.');
        selectedFoodPrefs.pop();
      }
      model.value.foodPreferences = selectedFoodPrefs;
    }
    const handleRPSelection = (selectedRegionPref) => {
      model.value.regionPreference = selectedRegionPref;
    }



    return {
      Check, Pen, Times, UserRegular,
      LocationOutline, Close,
      AddPhotoAlternateRound,
      group,
      groupMembers,
      pastMeetings,
      formRef, rules,
      showModal,
      model,
      isGroupOwner,
      editGroupDetails,
      updateGroupDetails,
      cancelCreation,
      FPOptions, RPOptions, handleFPSelection, handleRPSelection,
      onFileChange, fileInputClick, fileInput, clearImage, previewImage,



    };
  }
})
</script>



<style scoped>

.group-members {
  border-right: 1px solid rgb(239,239,245);
}

.description {
  padding-right: 30px;
  border-right: 1px solid rgb(239,239,245);
}
</style>