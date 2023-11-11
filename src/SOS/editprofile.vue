<template>
  <n-space class="editprofile" item-style="display:flex; height: 100%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="huge">
      <n-h1 style="text-align: center;"> Account Details </n-h1>
      <n-thing>
        <template v-if="isEditing">
          <n-form ref="formRef" :model="userDetails" :rules="rules" style="width:500px; flex-wrap: nowrap;">
            <n-space item-style="font-size: 70px; display: flex;" justify="center">
              <n-icon :component="UserRegular" color="#342628"/>
            </n-space>
            <n-form-item path="username" label="Username">
              <n-input
                  v-model:value="userDetails.Username"
                  maxlength="39"
                  show-count
                  @keydown.enter.prevent/>
            </n-form-item>
            <n-form-item path="email" label="Email">
              <n-input
                  v-model:value="userDetails.Email"
                  @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="displayName" label="Display Name">
              <n-input
                  v-model:value="userDetails.Name"
                  maxlength="100"
                  show-count
                  @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="age" label="Age" style="width:10%;">
              <n-input
                  v-model:value="userDetails.Age"
                  @keydown.enter.prevent
              />
            </n-form-item>
            <n-form-item path="gender" label="Gender">
              <n-select :value="userDetails.Gender"
                        @update:value="userDetails.Gender = $event"
                        :options="options"/>
            </n-form-item>

            <n-form-item path="regionPref" label="Choose Region Preferences">
              <n-select
                  v-model:value="userRegionPrefs.RegionType"
                  placeholder="Please Choose"
                  multiple
                  :options="RPOptions"
                  @update:value="handleRPSelection"
              />
            </n-form-item>

            <n-form-item path="foodPref" label="Choose Food Preferences">
              <n-select
                  v-model:value="userFoodPrefs.FoodType"
                  placeholder="Please Choose"
                  multiple
                  :options="FPOptions"
                  @update:value="handleFPSelection"
              />
            </n-form-item>

            <n-space align="center" justify="end">
              <n-button round type="primary" @click="saveEdit" color="#D9D9D9" style="margin-top: 15px;"><n-icon :component="Check" color="#342628"/></n-button>
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
            <n-tag v-for="rp in userRegionPrefs" round :color="{ color: 'rgba(52,38,40,0.2)', textColor: 'rgba(52,38,40,0.8)'}">
              <n-icon :component="LocationOutline" size="12" color="#342628"/>
              {{ rp.RegionType }}
            </n-tag>
          </n-space>
          <n-space item-style="flex-direction: row;" align="center" justify="center">
            You like:
            <n-tag v-for="fp in userFoodPrefs" round :color="{ color: 'rgba(52,38,40,0.2)', textColor: 'rgba(52,38,40,0.8)'}">
              {{ fp.FoodType }}
            </n-tag>
          </n-space>



          <n-space align="center" justify="end">
            <n-a @click="goTo('/changepassword')">
              <n-button round type="primary" color="#D9D9D9"  style="margin-top: 15px; color: #342628">Change Password</n-button>
            </n-a>
            <n-button round type="primary" @click="editProfile()" color="#D9D9D9"  style="margin-top: 15px;"><n-icon :component="Pen" color="#342628"/></n-button>
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
import { defineComponent, onMounted, reactive, ref } from "vue";
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
    const userFoodPrefs = ref({});
    const userRegionPrefs = ref({});

    const rules = {
      displayName: [
        {
          required: true,
          message: "Display Name is required",
          trigger: ["input", "blur"]
        }
      ],
      email: [
        {
          required: true,
          message: "Email is required",
          trigger: ["input", "blur"]
        }
      ],
      username: [
        {
          required: true,
          message: "Username is required",
          trigger: ["input", "blur"]
        }
      ],
      age: [
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
      gender: [
        {
          required: true,
        }
      ]
    };

    const RPOptions = ref([]);
    const FPOptions = ref([]);

    const handleFPSelection = (selectedFoodPrefs) => {
      userDetails.foodPreferences = selectedFoodPrefs;
    }
    const handleRPSelection = (selectedRegionPref) => {
      userDetails.regionPreferences = selectedRegionPref;
    }


    onMounted(async () => {
      try {
        const foodPref = await store.dispatch("preference/getAllFoodPreferences");
        for (let p of foodPref) {
          FPOptions.value.push({
            label: p.FoodType,
            value: `${p.FoodPreferenceID}`
          });
        }
        const regionPref = await store.dispatch("preference/getAllRegionPreferences");
        for (let q of regionPref) {
          RPOptions.value.push({
            label: q.RegionType,
            value: `${q.RegionPreferenceID}`
          });
        }

        userDetails.value = await store.dispatch("user/getUserDetails");
        userFoodPrefs.value = await store.dispatch("user/getUserFoodPreferences");
        userRegionPrefs.value = await store.dispatch("user/getUserRegionPreferences");
        console.log(userFoodPrefs.value);

        console.log(userDetails);
      } catch (error) {
        console.error(error);
      }
    });

    const goTo = (path) => {
      router.push(path)
    }

    async function saveEdit() {
      const userCoreDetails = { ...userDetails };
      delete userCoreDetails.regionPreferences;
      delete userCoreDetails.foodPreferences;

      const selectedRegionPrefs = userDetails.regionPreferences;
      const selectedFoodPrefs = userDetails.foodPreferences;

      try {
        await store.dispatch("user/editUserDetails", userCoreDetails);
        await store.dispatch("user/editUserRegionPreferences", selectedRegionPrefs);
        await store.dispatch("user/editUserFoodPreferences", selectedFoodPrefs);
        message.info("Successfully Saved");
        isEditing.value = false;
      } catch (error) {
        console.error(error);
        message.error("Failed to save");
      }
    }

    function editProfile() {
      if(!isEditing.value) {
        Object.assign(originalUserDetails, userDetails.value);
        isEditing.value = true;
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
      userFoodPrefs,
      userRegionPrefs,
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
      ],

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
}
</style>
