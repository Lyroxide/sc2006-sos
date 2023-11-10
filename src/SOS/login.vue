<template>
  <n-space vertical class="login" style="margin-top: 130px;" >
    <n-space item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: nowrap;">
      <n-card title="Login" size="huge">
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="username" label="Username/Email">
            <n-input v-model:value="model.username" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="password" label="Password">
            <n-input
                v-model:value="model.password"
                type="password"
                @keydown.enter.prevent
            />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="16">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                    :disabled="!model.username || !model.password"
                    round
                    type="primary"
                    @click="handleLoginButtonClick"
                >
                  Login
                </n-button>
              </div>
            </n-col>
          </n-row>
          <n-space horizontal item-style="display: flex; front-size:0px" align="center" justify="center">
            <n-p>New Here?</n-p>
            <n-a @click="goTo('/register')">
              <n-p style="color: #342628;">Register!</n-p>
            </n-a>
          </n-space>
          <n-space horizontal item-style="display: flex; front-size:0px" align="center" justify="center">
            <n-a @click="goTo('/forgetpassword')">
              <n-p style="color: #342628;">Forget Password?</n-p>
            </n-a>
          </n-space>
        </n-form>
      </n-card>
    </n-space>
  </n-space>

</template>

<script>
import { useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
      username: null,
      password: null
    });

    const rules = {
      username: [
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
                // An error occurred, display its message
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
</style>