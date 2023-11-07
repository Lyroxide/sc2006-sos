<template>
  <n-space class="editprofile" item-style="display:flex; height: 100%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="huge">
      <n-h1> Account Details </n-h1>
      <n-thing>
        <template v-if="isEditing">
          <n-form ref="formRef" :model="model" style="width:500px; flex-wrap: nowrap;">
            <n-space item-style="font-size: 70px; display: flex;" justify="center">
              <n-icon :component="UserRegular" color="#342628"/>
            </n-space>
            <n-form-item path="displayName" label="Display Name">
              <n-input v-model:value="model.Name" :disabled="!isEditing" @keydown.enter.prevent/>
            </n-form-item>
            <n-form-item path="email" label="Email">
              <n-input v-model:value="model.Email" :disabled="!isEditing" @keydown.enter.prevent/>
            </n-form-item>
            <n-form-item path="username" label="Username">
              <n-input v-model:value="model.Username" :disabled="!isEditing" @keydown.enter.prevent/>
            </n-form-item>
            <n-form-item path="age" label="Age" style="width:30%;">
              <n-input
                  v-model:value="model.Age"
                  :disabled="!isEditing"
                  @keydown.enter.prevent
                  placeholder=""
              />
            </n-form-item>
            <n-form-item path="gender" label="Gender">
              <n-select :value="model.Gender" :disabled="!isEditing" @update:value="model.gender = $event" :options="options"/>
            </n-form-item>

            <n-space align="center" justify="end">
              <n-button round type="primary" @click="saveEdit()">Save</n-button>
              <n-button round @click="cancelEdit()">Cancel</n-button>
            </n-space>
          </n-form>
        </template>
        <template v-else>
          <n-space item-style="font-size: 50px; display: flex;" justify="center">
            <n-icon :component="UserRegular" color="#342628"/>
          </n-space>
          <n-space item-style="flex-direction: row;" align="baseline" justify="center">
            <n-text style="font-size: 30px;">{{ model.Username }}</n-text>
            @{{ model.Name }}
          </n-space>
          <n-space item-style="flex-direction: row;" align="center">
            Email: {{ model.Email }}
          </n-space>
          <n-space item-style="flex-direction: row;" align="center">
            Age: {{ model.Age }}
          </n-space>
          <n-space item-style="flex-direction: row;" align="center">
            Gender: {{ model.Gender }}
          </n-space>
          <n-space item-style="flex-direction: row;" align="center">
            <n-icon :component="LocationOutline" size="15" color="#342628"/>
            <n-text v-for="rp in model.regionPreferences">{{ rp }}</n-text>
          </n-space>
          <n-space item-style="flex-direction: row;" align="center">
            You like:
            <n-text v-for="fp in model.foodPreferences">{{ fp }}</n-text>
          </n-space>




          <n-space align="center" justify="start">
            <n-button round type="primary" @click="editProfile()">Edit Your Profile</n-button>
          </n-space>

        </template>
      </n-thing>

      </n-card>
  </n-space>
</template>

<script>
import {defineComponent, ref, onMounted, reactive} from "vue";
import { useMessage } from "naive-ui";
import store from "../store/index.js";
import { useRouter } from 'vue-router';
import { Times, UserRegular } from "@vicons/fa";
import { LocationOutline } from "@vicons/ionicons5";


export default defineComponent({

  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const isEditing = ref(false);
    const userDetails = reactive({});
    const originalDetails = ref({});

    // Copy helper to preserve the original user details
    const setupOriginalDetails = (details) => {
      originalDetails.value = JSON.parse(JSON.stringify(details));
    };

    // Populate fields and save the original details for possible revert
    async function getDetails() {
      try {
        const details = await store.dispatch("user/getUserDetails");
        console.log(details);
        Object.assign(userDetails, details);
        setupOriginalDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
    onMounted(getDetails);

    // Update the user details and toggle off editing mode
    async function saveEdit() {
      try {
        await store.dispatch("user/editUserDetails", userDetails);
        message.info("Successfully Saved");
        isEditing.value = false;
      } catch (error) {
        console.error(error);
        message.error("Failed to save");
      }
    }

    // Toggle on editing mode
    function editProfile() {
      if(!isEditing.value) {
        setupOriginalDetails(userDetails);
        isEditing.value = true;
      }
    }

    // Revert changes made and toggle off editing mode
    function cancelEdit() {
      if(isEditing.value) {
        Object.assign(userDetails, originalDetails.value);
        isEditing.value = false;
      }
    }

    return {
      Times,
      UserRegular,
      LocationOutline,
      formRef,
      getDetails,
      saveEdit,
      cancelEdit,
      editProfile,
      model: userDetails,
      isEditing,
      options: [
        {
          label: "Male",
          value: "Male",
        },
        {
          label: "Female",
          value: "Female"
        },
        {
          label: "Prefer not to say",
          value: "Prefer not to say"
        }
      ],

    };
  },
});
</script>

<style scoped>

.editprofile {
  margin: 10% 0;
}

.n-h1 {
  text-align: center;
}

</style>
