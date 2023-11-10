<template>
  <n-space class="changePassword" item-style="display:flex; height: 100%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="medium">
      <n-h1> Change your Password </n-h1>
      <n-thing>
        <template v-if="isEditing">
          <n-form ref="formRef" :model="model" style="width:500px; flex-wrap: nowrap;">
            <n-space item-style="font-size: 70px; display: flex;" justify="center">
              <n-icon :component="UserRegular" color="#342628"/>
            </n-space>
            <n-form-item path="currentPassword" label="Enter Current Password">
              <n-input v-model:value="model.Password" :disabled="!isEditing" @keydown.enter.prevent/>
            </n-form-item>
            <n-form-item path="newPassword1" label="Enter New Password">
              <n-input v-model:value="model.NewPassword1" :disabled="!isEditing" @keydown.enter.prevent/>
            </n-form-item>
            <n-form-item path="newPassword2" label="Enter New Password Again">
              <n-input v-model:value="model.NewPassword2" :disabled="!isEditing" @keydown.enter.prevent/>
            </n-form-item>


            <n-space align="center" justify="end">
              <n-button round type="primary" @click="saveEdit()" color="#D9D9D9"  style="margin-top: 15px;"><n-icon :component="Check" color="#342628"/></n-button>
              <n-button round @click="cancelEdit()" color="#D9D9D9"  style="margin-top: 15px;"><n-icon :component="Times" color="#342628"/></n-button>
            </n-space>


          </n-form>
        </template>
        <template v-else>
          <n-space item-style="font-size: 50px; display: flex;" justify="center">
            <n-icon :component="UserRegular" color="#342628"/>
          </n-space>
          <n-space item-style="flex-direction: row;" align="baseline" justify="center">
            <n-text style="font-size: 20px; text-align: center; whiteSpace: pre-line;">Enter Current Password</n-text>
          </n-space>
          <n-space item-style="flex-direction: row;" align="baseline" justify="center">
            <n-text style="font-size: 20px; text-align: center; whiteSpace: pre-line;">Enter New Password</n-text>
          </n-space>
          <n-space item-style="flex-direction: row;" align="baseline" justify="center">
            <n-text style="font-size: 20px; text-align: center; whiteSpace: pre-line;">Enter New Password Again</n-text>
          </n-space>

        </template>
      </n-thing>

    </n-card>
  </n-space>
</template>

<script>
import { Check, Times, UserRegular } from "@vicons/fa";
import { useMessage } from "naive-ui";
import { defineComponent, onMounted, reactive, ref } from "vue";
import store from "../store/index.js";


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
      Check,
      formRef,
      getDetails,
      saveEdit,
      cancelEdit,
      editProfile,
      model: userDetails,
      isEditing,


    };
  },
});
</script>

<style scoped>

.changePassword {
  margin: 10% 0;
}

.n-h1 {
  text-align: center;
}

.n-card {
  border-radius: 30px;
  margin-top: 10%;
}

</style>
