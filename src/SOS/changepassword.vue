<template>
  <n-space class="changePassword" item-style="display:flex; height: 100%; width: 25%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="medium">
      <n-h2> Change your Password </n-h2>
      <n-thing>
        <n-form ref="formRef" :model="model" :rules="rules" style="width:100%; flex-wrap: nowrap;">
          <n-space item-style="font-size: 70px; display: flex; margin-bottom: 30px;" justify="center">
            <n-icon :component="UserRegular" color="#342628"/>
          </n-space>
          <n-form-item path="currentPassword" label="Enter Current Password">
            <n-input v-model:value="model.currentPassword" type="password" @keydown.enter.prevent placeholder="Enter Current Password" show-password-on="click"/>
          </n-form-item>
          <n-form-item path="newPassword" label="Enter New Password">
            <n-input v-model:value="model.newPassword" type="password" @input="handlePasswordInput" @keydown.enter.prevent placeholder="Enter min. 12 alphanumeric characters" show-password-on="click"/>
          </n-form-item>
          <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="Re-enter New Password">
            <n-input v-model:value="model.reenteredPassword" type="password" @keydown.enter.prevent placeholder="Re-enter New Password" show-password-on="click"/>
          </n-form-item>
          <n-space align="center" justify="end">
            <n-button round type="primary"
                      :disabled="!model.currentPassword || !model.newPassword || !model.reenteredPassword"
                      @click="saveNewPassword()"
                      color="#D9D9D9"
                      style="margin-top: 15px; padding: 20px;">
              <n-icon :component="Check" color="#342628" style="font-size: 100%;"/>
            </n-button>
          </n-space>
        </n-form>
      </n-thing>
    </n-card>
  </n-space>
</template>

<script>
import { Check, UserRegular } from "@vicons/fa";
import { useMessage } from "naive-ui";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import store from "../store/index.js";


export default defineComponent({
  setup() {
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const userDetails = reactive({});
    const isCurrentPasswordCorrect = ref(false);
    const router = useRouter();

    const modelRef = ref({
      currentPassword: null,
      newPassword: null,
      reenteredPassword: null
    });

    function validatePasswordSame(rule, value) {
      return new Promise((resolve, reject) => {
        if (value === modelRef.value.newPassword) {
          resolve(true);
        } else {
          reject(new Error("Password is not same as new password!"));
        }
      });
    }
    async function hashCurrentPassword() {
      try {
        //const hashedPassword = await store.dispatch("user/hashPassword", modelRef.value.currentPassword);
        //console.log("Hashed password: ", hashedPassword.hashedPassword);
        //modelRef.value.currentPassword = hashedPassword;
        const isMatch = await store.dispatch("user/checkCurrentPassword", modelRef.value.currentPassword);
        isCurrentPasswordCorrect.value = isMatch.isMatch
        //console.log("Is match: ", isMatch.isMatch);
        /*
        if (!isMatch.isMatch) {
          message.error("Current password is incorrect");
        }
        */
      } catch (error) {
        console.error(error);
      }
    }

  async function saveNewPassword() {
    await hashCurrentPassword();
    if (!isCurrentPasswordCorrect.value) {
      message.error("Please enter the correct current password");
      return;
    }
    try {
      await store.dispatch("user/updateUserPassword", modelRef.value.newPassword);
      message.success("Password updated successfully");
      router.push('/editprofile');
      
    } catch (error) {
      console.error(error);
      message.error("Failed to update password");
    }
  }

    // getting existing user password stored in DB
    /*
    async function getDetails() {
      try {
        const details = await store.dispatch("user/getUserDetails");
        Object.assign(userDetails, details.password);
      } catch (error) {
        console.error(error);
      }
    }
    onMounted(getDetails);
    */
    

    const rules = {
    newPassword: [
      {
        required: true,
        message: "Password input required",
        trigger: ["input", "blur"]
      },
      {
        min: 12,
        message: "Password must be at least 12 characters",
        trigger: ["input", "blur"]
      },
      {
        validator: (rule, value) => {
          const alphanumericRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          return alphanumericRegex.test(value);
        },
        message: "Password must contain at least one letter and one number",
        trigger: ["input", "blur"]
      }
    ],
    reenteredPassword: [
      {
        required: true,
        message: "Re-entered password is required",
        trigger: ["input", "blur"]
      },
      {
        validator: validatePasswordSame,
        trigger: "blur"
      }
    ]
  };

    return {
      UserRegular,
      Check,
      formRef,
      rules,
      //getDetails,
      saveNewPassword,
      isCurrentPasswordCorrect,
      rPasswordFormItemRef,
      model: modelRef,

      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "input" });
        }
      },
    };
  },
});
</script>

<style scoped>

.changePassword {
  margin: 10% 0;
}

.n-h2 {
  text-align: center;
}

.n-card {
  border-radius: 30px;
  margin-top: 10%;
}

</style>
