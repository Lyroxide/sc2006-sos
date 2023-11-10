<template>
  <n-space class="changePassword" item-style="display:flex; height: 100%; width: 25%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="medium">
      <n-h2> Change your Password </n-h2>
      <n-thing>
        <n-form ref="formRef" :model="model" style="width:100%; flex-wrap: nowrap;">
          <n-space item-style="font-size: 70px; display: flex; margin-bottom: 30px;" justify="center">
            <n-icon :component="UserRegular" color="#342628"/>
          </n-space>
          <n-form-item path="currentPassword" label="Enter Current Password">
            <n-input v-model:value="model.currentPassword" type="password" @keydown.enter.prevent placeholder="Enter Current Password" show-password-on="mousedown"/>
          </n-form-item>
          <n-form-item path="newPassword" label="Enter New Password">
            <n-input v-model:value="model.newPassword" type="password" @input="handlePasswordInput" @keydown.enter.prevent placeholder="Enter minimum 8 characters" show-password-on="mousedown"/>
          </n-form-item>
          <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="Re-enter New Password">
            <n-input v-model:value="model.reenteredPassword" :disabled="!model.newPassword" type="password" @keydown.enter.prevent placeholder="Re-enter New Password" show-password-on="mousedown"/>
          </n-form-item>
          <n-space align="center" justify="end">
            <n-button round type="primary"
                      :disabled="!model.currentPassword || model.newPassword !== model.reenteredPassword"
                      @click="saveEdit()"
                      color="#D9D9D9"
                      style="margin-top: 15px;">
              <n-icon :component="Check" color="#342628"/>
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
import { defineComponent, onMounted, reactive, ref } from "vue";
import store from "../store/index.js";


export default defineComponent({
  setup() {
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const userDetails = reactive({});

    const modelRef = ref({
      currentPassword: null,
      newPassword: null,
      reenteredPassword: null
    });

    function validatePasswordStartWith(rule, value) {
      return !!modelRef.value.newPassword && modelRef.value.newPassword.startsWith(value) && modelRef.value.newPassword.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === modelRef.value.newPassword;
    }

    async function saveEdit() {
      try {
        await store.dispatch("user/editUserDetails", modelRef.value.newPassword);
        message.info("Successfully Saved");
      } catch (error) {
        console.error(error);
        message.error("Failed to save");
      }
    }

    // getting existing user password stored in DB
    async function getDetails() {
      try {
        const details = await store.dispatch("user/getUserDetails");
        Object.assign(userDetails, details.password);
      } catch (error) {
        console.error(error);
      }
    }
    onMounted(getDetails);

    const rules = {
      currentPassword: [
        {
          required: true,
          message: "Current Password required",
          trigger: ["input", "blur"]
        }
      ],
      newPassword: [
        {
          required: true,
          message: "Password input required",
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
          validator: validatePasswordStartWith,
          message: "Password is not same as re-entered password!",
          trigger: "input"
        },
        {
          validator: validatePasswordSame,
          message: "Password is not same as re-entered password!",
          trigger: ["blur", "password-input"]
        }
      ]

    };

    return {
      UserRegular,
      Check,
      formRef,
      rules,
      getDetails,
      saveEdit,
      rPasswordFormItemRef,
      model: modelRef,

      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
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
