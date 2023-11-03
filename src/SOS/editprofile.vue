<template>
 <n-space vertical class="editprofile">
    <n-form ref="formRef" :model="model" :rules="rules" style="width:300px">
      <n-form-item path="displayName" label="Display Name">
        <n-input v-model:value="model.displayName" :disabled="!isEditing" @keydown.enter.prevent placeholder =""/>
      </n-form-item>
      <n-form-item path="email" label="Email">
        <n-input v-model:value="model.email" :disabled="!isEditing" @keydown.enter.prevent placeholder =""/>
      </n-form-item>
      <n-form-item path="username" label="Username">
        <n-input v-model:value="model.username" :disabled="!isEditing" @keydown.enter.prevent placeholder ="" />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input
            v-model:value="model.password"
            :disabled="!isEditing"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
            placeholder ="Min 8 Characters"
        />
      </n-form-item>
      <n-form-item path="age" label="Age" style="width:30%;">
        <n-input
            v-model:value="model.age"
            :disabled="!isEditing"
            @keydown.enter.prevent
            placeholder=""
        />
      </n-form-item>
      <n-form-item path="gender" label="Gender">
        <n-select :value="model.gender" :disabled="!isEditing" @update:value="model.gender = $event" :options="options"/>
      </n-form-item>

      <n-button round type="primary" @click="saveEdit">
        {{ isEditing ? 'Save' : 'Edit' }}
      </n-button>
    </n-form>
  </n-space>
</template>

<script>

import { defineComponent, ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const userDetails = ref({
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
      ]
    }

    async function getDetails() {
      try {
        const fetchedDetails = await store.dispatch("user/getUserDetails");
        userDetails.value = {
          displayName: fetchedDetails.displayName,
          email: fetchedDetails.email,
          username: fetchedDetails.username,
          password: fetchedDetails.password,
          age: fetchedDetails.age,
          gender: fetchedDetails.gender
        };
      } catch (error) {
        console.error(error);
      }
    }
    onMounted(getDetails);

         // Update the user's details in the database
         // with the values in the form fields
         async function saveEdit() {
           if(isEditing.value) {
             try {
               await store.dispatch("user/editUserDetails", userDetails.value);
               message.info("Successfully Saved");
             } catch (error) {
               console.error(error);
               message.error("Failed to save");
             }
           }
         }

    return {
      formRef,
      getDetails,
      saveEdit,
      rPasswordFormItemRef,
      model: userDetails,
      rules,
      isEditing,
      handlePasswordInput() {
        if (modelRef.value.confirmPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
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
