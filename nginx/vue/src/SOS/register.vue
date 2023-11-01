<template>
  <n-space vertical class="register">
    <n-space item-style="display:flex; margin:12px;" align="center" justify="center" style="flex-wrap: nowrap;">
      <n-card title="Create Account" size="huge">
        <n-form ref="formRef" :model="model" :rules="rules" style="width:300px">
          <n-form-item path="displayName" label="Display Name">
            <n-input v-model:value="model.displayName" @keydown.enter.prevent placeholder =""/>
          </n-form-item>
          <n-form-item path="email" label="Email">
            <n-input v-model:value="model.email" @keydown.enter.prevent placeholder =""/>
          </n-form-item>
          <n-form-item path="username" label="Username">
            <n-input v-model:value="model.username" @keydown.enter.prevent placeholder ="" />
          </n-form-item>
          <n-form-item path="password" label="Password">
            <n-input
                v-model:value="model.password"
                type="password"
                @keydown.enter.prevent
                placeholder =""
            />
          </n-form-item>
          <n-form-item path="confirmPassword" label="Confirm Password">
            <n-input
                v-model:value="model.confirmPassword"
                type="password"
                @keydown.enter.prevent
                placeholder =""
            />
            </n-form-item>

          <n-space style=" display: flex; ; flex-direction:row; flex-wrap: nowrap;">
            <n-form-item path="age" label="Age" style="width:40%;">
              <n-input v-model:value="model.age" @keydown.enter.prevent
              placeholder=""/>
            </n-form-item>

            <n-form-item path="gender" label="Gender" style="margin-right:40px">
              <select v-model="model.gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            </n-form-item>

          </n-space>

          <n-row :gutter="[0, 24]">
            <n-col :span="15">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                    :disabled="!model.username || !model.email || !model.password || model.password !== model.confirmPassword || !model.age"
                    round
                    type="primary"
                    @click="handleRegisterButtonClick">
                  Register
                </n-button>
              </div>
            </n-col>
          </n-row>
          <n-space horizontal item-style="display: flex; font-size:10px" align="center" justify="center">
            <p>Already have an account?</p>
            <router-link to="/login" #="{ navigate, href }" custom style="margin-right:20px;">
              <n-a :href="href" @click="navigate">
                <n-text class="nav">Login</n-text>
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
      displayName: null,
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
      age: null,
      gender: null
    });

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
      password: [
        {
          required: true,
          message: "Password is required",
          trigger: ["input", "blur"]
        }
      ],
      confirmPassword: [
        {
          required: true,
          message: "Confirm Password is required",
          trigger: ["input", "blur"]
        }
      ],
      age: [
        {
          required: true,
          message: "Age is required",
          trigger: ["input", "blur"]
        }
      ]
    };

    async function handleRegisterButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          store.dispatch("auth/register", modelRef.value).then(
              () => {
                this.$router.push("/profile");
                message.success("Registration Success");
              })
              .catch((err) => {
                    // An error occurred, display its message
                    message.error(err.message);
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
      handleRegisterButtonClick
    };
  },
});
</script>
