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
            <n-col :span="24">
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
          <n-space horizontal item-style="display: flex; front-size:0px" align="center" >
            <p>New Here?</p>
            <router-link to="/register" #="{ navigate, href }" custom style="margin-right:20px;">
              <n-a :href="href" @click="navigate">
                <n-text class="nav">Sign Up</n-text>
              </n-a>
            </router-link>
          </n-space>
        </n-form>
      </n-card>
    </n-space>
  </n-space>

</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import store from "../store/index.js";

export default defineComponent({
  setup() {
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
                this.$router.push("/profile");
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

    return {
      formRef,
      model: modelRef,
      rules,
      handleLoginButtonClick
    };
  },
});
</script>