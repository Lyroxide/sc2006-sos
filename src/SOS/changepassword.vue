<template>
  <n-space class="changePassword" item-style="display:flex; height: 100%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="huge" style="width:500px;">
      <n-h1 style="text-align: center;"> Change your Password </n-h1>
      <n-thing>
        <n-form ref="formRef" :model="model" :rules="rules" style="flex-wrap: nowrap;">
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
                      @click="saveNewPassword"
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
        const isMatch = await store.dispatch("user/checkCurrentPassword", modelRef.value.currentPassword);
        isCurrentPasswordCorrect.value = isMatch.isMatch
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

    const rules = {
      currentPassword: [
        {
          required: true,
          message: "Password input required",
          trigger: ["input", "blur"]
        }
      ],
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
            const alphanumericRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
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


.n-card {
  border-radius: 30px;
  margin-top: 10%;
  width: auto;
}

</style>
