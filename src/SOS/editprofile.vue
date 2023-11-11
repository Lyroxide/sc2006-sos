<template>
  <n-space class="editprofile" item-style="display:flex; height: 100%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="huge" style="width:500px;">
      <n-h1 style="text-align: center;"> Account Details </n-h1>
      <n-thing>
        <template v-if="isEditing && userDetails">
          <n-form ref="formRef" :model="userDetails" :rules="rules" style="flex-wrap: nowrap;">
            <n-space item-style="font-size: 70px; display: flex;" justify="center">
              <n-icon :component="UserRegular" color="#342628"/>
            </n-space>
            <n-form-item path="Username" label="Username">
              <n-input
                  v-model:value="userDetails.Username"
                  maxlength="39"
                  show-count
                  @keydown.enter.prevent="saveEdit"
              />
            </n-form-item>
            <n-form-item path="Email" label="Email">
              <n-input
                  v-model:value="userDetails.Email"
                  @keydown.enter.prevent="saveEdit"
              />
            </n-form-item>
            <n-form-item path="Name" label="Display Name">
              <n-input
                  v-model:value="userDetails.Name"
                  maxlength="100"
                  show-count
                  @keydown.enter.prevent="saveEdit"
              />
            </n-form-item>
            <n-form-item path="Age" label="Age" style="width:15%;">
              <n-input
                  v-model:value="userDetails.Age"
                  @keydown.enter.prevent="saveEdit"
              />
            </n-form-item>
            <n-form-item path="Gender" label="Gender">
              <n-select v-model:value="userDetails.Gender"
                        @update:value="userDetails.Gender = $event"
                        :options="options"/>
            </n-form-item>

            <n-form-item path="regionPref" label="Choose Region Preferences">
              <n-select
                  v-model:value="userRegionPrefs"
                  placeholder="Please Choose"
                  multiple
                  :options="RPOptions"
                  @update:value="handleRPSelection"
              />
            </n-form-item>

            <n-form-item path="foodPref" label="Choose Food Preferences">
              <n-select
                  v-model:value="userFoodPrefs"
                  placeholder="Please Choose"
                  multiple
                  :options="FPOptions"
                  @update:value="handleFPSelection"
              />
            </n-form-item>

            <n-space align="center" justify="end">
              <n-button
                  round
                  type="primary"
                  @click="saveEdit"
                  color="#D9D9D9"
                  style="margin-top: 15px;"
                  :disabled="!userDetails.Username || !userDetails.Email || !userDetails.Name || !userDetails.Age || !userDetails.Gender"
              >
                <n-icon :component="Check" color="#342628"/>
              </n-button>
              <n-button round @click="cancelEdit" color="#D9D9D9" style="margin-top: 15px;"><n-icon :component="Times" color="#342628"/></n-button>
            </n-space>
          </n-form>
        </template>
        <template v-else>
          <n-space item-style="font-size: 50px; display: flex; margin-bottom: 15px;" justify="center">
            <n-icon :component="UserRegular" color="#342628"/>
          </n-space>
          <n-space item-style="flex-direction: row;" align="center" justify="center">
            <n-text style="font-size: 20px; text-align: center;">@{{ userDetails.Username }}</n-text>
          </n-space>
          <n-space item-style="flex-direction: row;" align="center" justify="center">
            <n-text style=" text-align: center;">{{ userDetails.Name }}</n-text>
          </n-space>
          <n-space item-style="flex-direction: row;" align="center" justify="center">
            Email: {{ userDetails.Email }}
          </n-space>
          <n-space item-style="flex-direction: row;" align="center" justify="center">
            Age: {{ userDetails.Age }}
          </n-space>
          <n-space item-style="flex-direction: row; margin-bottom: 10px;" align="center" justify="center">
            Gender: {{ userDetails.Gender }}
          </n-space>
          <n-space item-style="flex-direction: row; margin-bottom: 15px;" align="center" justify="center">
            <n-tag v-for="rp in userRegionPrefsProxy" round :color="{ color: 'rgba(52,38,40,0.2)', textColor: 'rgba(52,38,40,0.8)'}">
              <n-icon :component="LocationOutline" size="12" color="#342628"/>
              {{ rp.RegionType }}
            </n-tag>
          </n-space>
          <n-space item-style="flex-direction: row; " align="center" justify="center" v-if="userFoodPrefsProxy.length > 0">
            You like:
            <n-tag v-for="fp in userFoodPrefsProxy" round :color="{ color: 'rgba(52,38,40,0.2)', textColor: 'rgba(52,38,40,0.8)'}">
              {{ fp.FoodType }}
            </n-tag>
          </n-space>

          <n-space align="center" justify="end">
            <n-a @click="goTo('/changepassword')">
              <n-button round type="primary" color="#D9D9D9"  style="margin-top: 15px; color: #342628">Change Password</n-button>
            </n-a>
            <n-button round type="primary" @click="editProfile" color="#D9D9D9"  style="margin-top: 15px;"><n-icon :component="Pen" color="#342628"/></n-button>
          </n-space>

        </template>
      </n-thing>

    </n-card>
  </n-space>
</template>

<script>
import { Check, Pen, Times, UserRegular } from "@vicons/fa";
import { LocationOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import {defineComponent, onMounted, reactive, ref, nextTick, watchEffect} from "vue";
import store from "../store/index.js";
import { useRouter } from 'vue-router';


export default defineComponent({

  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const message = useMessage();
    const isEditing = ref(false);
    const userDetails = ref({});
    const originalUserDetails = reactive({});
    const userFoodPrefs = ref([]);
    const userRegionPrefs = ref([]);
    const userFoodPrefsProxy = ref({});
    const userRegionPrefsProxy = ref({});

    const rules = {
      Name: [
        {
          required: true,
          message: "Display Name is required",
          trigger: ["input", "blur"]
        }
      ],
      Email: [
        {
          required: true,
          message: "Email is required",
          trigger: ["input", "blur"]
        }
      ],
      Username: [
        {
          required: true,
          message: "Username is required",
          trigger: ["input", "blur"]
        }
      ],
      Age: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("Age is required");
            } else if (!/^\d*$/.test(value)) {
              return new Error("Age should be an integer");
            } else if (Number(value) < 18) {
              return new Error("Age should be above 18");
            }
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      Gender: [
        {
          required: true,
        }
      ]
    };


    const RPOptions = ref([]);
    const FPOptions = ref([]);

    const handleFPSelection = (selectedFoodPrefs) => {
      userFoodPrefs.value = selectedFoodPrefs;
    }
    const handleRPSelection = (selectedRegionPref) => {
      userRegionPrefs.value = selectedRegionPref;
    }

    async function fetchInitialData() {
      try {
        const foodPref = await store.dispatch("preference/getAllFoodPreferences");
        FPOptions.value = foodPref.map(p => ({
          label: p.FoodType,
          value: `${p.FoodPreferenceID}`
        }));

        const regionPref = await store.dispatch("preference/getAllRegionPreferences");
        RPOptions.value = regionPref.map(q => ({
          label: q.RegionType,
          value: `${q.RegionPreferenceID}`
        }));

        userDetails.value = await store.dispatch("user/getUserDetails");
        userFoodPrefsProxy.value = await store.dispatch("user/getUserFoodPreferences");
        userRegionPrefsProxy.value = await store.dispatch("user/getUserRegionPreferences");

        userFoodPrefs.value = userFoodPrefsProxy.value.map(fp => `${fp.FoodPreferenceID}`);
        userRegionPrefs.value = userRegionPrefsProxy.value.map(rp => `${rp.RegionPreferenceID}`);
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(fetchInitialData);

    const goTo = (path) => {
      router.push(path)
    }

    async function saveEdit() {
      try {
        await store.dispatch("user/editUserDetails", userDetails.value);
        await store.dispatch("user/editUserRegionPreferences", userRegionPrefs.value);
        await store.dispatch("user/editUserFoodPreferences", userFoodPrefs.value);
        await fetchInitialData();
        isEditing.value = false;
        message.info("Successfully Saved");
      } catch (error) {
        console.error(error);
        message.error("Failed to save");
      }
    }

    function editProfile() {
      if(!isEditing.value) {
        Object.assign(originalUserDetails, userDetails.value);
        isEditing.value = true;
        nextTick();
      }
    }

    function cancelEdit() {
      if(isEditing.value) {
        Object.assign(userDetails.value, originalUserDetails);
        isEditing.value = false;
      }
    }

    return {
      Times,
      UserRegular,
      Pen,
      Check,
      LocationOutline,
      formRef,
      rules,
      goTo,
      saveEdit,
      cancelEdit,
      editProfile,
      userDetails,
      userFoodPrefs, userFoodPrefsProxy,
      userRegionPrefs, userRegionPrefsProxy,
      isEditing,
      FPOptions, RPOptions, handleFPSelection, handleRPSelection,
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
      ]
    };
  },
});
</script>

<style scoped>

.editprofile {
  margin: 10% 0;
}

.n-card {
  border-radius: 30px;
  margin-top: 10%;
  width: auto;
}
</style>
