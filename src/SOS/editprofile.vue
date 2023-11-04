<template>
  <n-space vertical class="editprofile" style ="margin-top:100px">
    <n-space item-style="display:flex; margin:12px;" align="center" justify="center" style="flex-wrap: nowrap;">
      <n-card title="Account detail" size="huge">
        <n-form ref="formRef" :model="model" style="width:300px">
          <n-form-item path="displayName" label="Display Name">
            <n-input v-model:value="model.Name" :disabled="!isEditing" @keydown.enter.prevent/>
          </n-form-item>
          <n-form-item path="email" label="Email">
            <n-input v-model:value="model.Email" :disabled="!isEditing" @keydown.enter.prevent/>
          </n-form-item>
          <n-form-item path="username" label="Username">
            <n-input v-model:value="model.Username" :disabled="!isEditing" @keydown.enter.prevent/>
          </n-form-item>
          <n-form-item path="age" label="Age" style="width:30%;">
            <n-input
                v-model:value="model.Age"
                :disabled="!isEditing"
                @keydown.enter.prevent
                placeholder=""
            />
          </n-form-item>
          <n-form-item path="gender" label="Gender">
            <n-select :value="model.Gender" :disabled="!isEditing" @update:value="model.gender = $event" :options="options"/>
          </n-form-item>

          <n-button round type="primary" @click="isEditing ? saveEdit() : isEditing = true">
            {{ isEditing ? 'Save' : 'Edit' }}
          </n-button>
        </n-form>
      </n-card>
    </n-space>
  </n-space>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import store from "../store/index.js";
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const isEditing = ref(false);
    const userDetails = ref({});

    async function getDetails() { //to populate fields automatically (from backend) after entering editProfile page
      try {
        userDetails.value = await store.dispatch("user/getUserDetails");
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
      model: userDetails,
      isEditing,
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
