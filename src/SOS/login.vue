<template>
  <n-space vertical class="login" style="margin-top: 130px;" >
    <n-space item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: nowrap;">
      <n-card size="huge">
        <n-h1 style="text-align: center;">Log In</n-h1>
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="loginInput" label="Username/Email">
            <n-input v-model:value="model.loginInput" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="password" label="Password">
            <n-input
                v-model:value="model.password"
                type="password"
                show-password-on="mousedown"
                @keyup.enter="handleLoginButtonClick"
            />
          </n-form-item>
          <n-space style="display: flex; justify-content: center">
            <n-button
                :disabled="!model.loginInput || !model.password"
                round
                type="primary"
                @click="handleLoginButtonClick"
                color="rgba(120,132,2,0.6)"
                text-color="rgba(52,38,40,0.8)"
            >
              Login
            </n-button>
          </n-space>
          <n-space item-style="display: flex; margin: 20px auto 0;" justify="center">
            <n-a @click="goTo('/forgetpassword')">
              <n-p style="color: #342628;">Forgot Password?</n-p>
            </n-a>
          </n-space>
          <n-divider/>
          <n-space item-style="display: flex;" align="center" justify="center">
            <n-p>New Here?</n-p>
            <n-a @click="goTo('/register')">
              <n-button
                  round
                  type="primary"
                  color="rgba(120,132,2,0.6)"
                  text-color="rgba(52,38,40,0.8)"
              >
                Register!
              </n-button>
            </n-a>
          </n-space>
        </n-form>
      </n-card>
    </n-space>
  </n-space>

</template>

<script>
import { useMessage } from "naive-ui";
import {defineComponent, ref, watchEffect} from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
      loginInput: null,
      password: null
    });

    const rules = {
      loginInput: [
        {
          required: true,
          message: "Username or Email is required",
          trigger: ["input", "blur"]
        }
      ],
      password: [
        {
          required: true,
          message: "Password is required",
          trigger: ["input", "blur"]
        }
      ]
    };

    async function handleLoginButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store.dispatch("auth/login", modelRef.value).then(
              () => {
                router.push("/findgroups");
                message.success("Login Success");
              })
              .catch((err) => {
                message.error(err.message);
                message.error('Invalid Username or Password');
              }
          );
        } else {
          console.log(errors);
        }
      });
    }

    const goTo = (path) => {
      router.push(path)
    }

    return {
      formRef,
      model: modelRef,
      rules,
      goTo,
      handleLoginButtonClick
    };
  },
});
</script>

<style scoped>
.n-card {
  border-radius: 20px;
}
</style>