<template>
  <n-space vertical class="register" item-style="display:flex; height: 100%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="huge" style="width:500px;">
      <n-h1 style="text-align: center;">Create Account</n-h1>
      <n-form ref="formRef" :model="model" :rules="rules" style="flex-wrap: nowrap;">
        <n-form-item path="username" label="Username">
          <n-input
              v-model:value="model.username"
              maxlength="39"
              show-count
              @keydown.enter.prevent
              placeholder=""
          />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input
              v-model:value="model.email"
              @keydown.enter.prevent
              placeholder=""
          />
        </n-form-item>
        <n-form-item path="displayName" label="Display Name">
          <n-input
              v-model:value="model.displayName"
              maxlength="100"
              show-count
              @keydown.enter.prevent
              placeholder=""
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
              v-model:value="model.password"
              type="password"
              show-password-on="mousedown"
              @input="handlePasswordInput"
              @keydown.enter.prevent
              placeholder="Min 12 Characters"
          />
        </n-form-item>
        <n-form-item ref="rPasswordFormItemRef" first path="confirmPassword" label="Confirm Password">
          <n-input
              v-model:value="model.confirmPassword"
              :disabled="!model.password"
              type="password"
              show-password-on="mousedown"
              @keydown.enter.prevent
              placeholder="Min 12 Characters"
          />
        </n-form-item>
        <n-form-item path="age" label="Age" style="width:30%;">
          <n-input-number
              v-model:value="model.age"
              :min="0"
              :max="100"
              @keydown.enter.prevent
              placeholder=""
          />
        </n-form-item>
        <n-form-item path="gender" label="Gender">
          <n-select :value="model.gender" @update:value="model.gender = $event" :options="options"/>
        </n-form-item>

        <n-space item-style="display: flex;" align="center" justify="center">
          <n-button
              :disabled="!model.username || !model.email || !model.password || model.password !== model.confirmPassword || !model.age || !model.gender"
              round
              type="primary"
              color="rgba(120,132,2,0.6)"
              text-color="rgba(52,38,40,0.8)"
              @click="handleRegisterButtonClick">
            Register
          </n-button>
        </n-space>
        <n-divider/>
        <n-space item-style="display: flex;" align="center" justify="center">
          <n-p>Already have an account?</n-p>
          <n-a @click="goTo('/login')">
            <n-button
                round
                type="primary"
                color="rgba(120,132,2,0.6)"
                text-color="rgba(52,38,40,0.8)"
            >
              Log In
            </n-button>
          </n-a>
        </n-space>
      </n-form>
    </n-card>
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
    const rPasswordFormItemRef = ref(null);
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

    function validatePasswordStartWith(rule, value) {
      return !!modelRef.value.password && modelRef.value.password.startsWith(value) && modelRef.value.password.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === modelRef.value.password;
    }

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
      confirmPassword: [
        {
          required: true,
          message: "Confirm Password is required",
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
          message: "Gender is required",
          trigger: ["input", "blur"]
        }
      ]
    };

    async function handleRegisterButtonClick(e) {
      e.preventDefault();
      formRef.value?.validate((errors) => {
        if (!errors) {
          let user = {
            name: modelRef.value.displayName,
            email: modelRef.value.email,
            username: modelRef.value.username,
            password: modelRef.value.password,
            age: modelRef.value.age,
            gender: modelRef.value.gender
          };
          store.dispatch("auth/register", user).then(
              () => {
                router.push("/login");
                message.success("Registration Success");
              })
              .catch((err) => {
                message.error(err.message);
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
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      goTo,
      handlePasswordInput() {
        if (modelRef.value.confirmPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
      handleRegisterButtonClick,
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

.register {
  margin: 10% 0;
}

.n-card {
  border-radius: 30px;
  width: auto;
}

</style>