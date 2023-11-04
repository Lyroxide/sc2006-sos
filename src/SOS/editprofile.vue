<template>
   <n-space vertical class="editprofile" style ="margin-top:100px">
     <n-space item-style="display:flex; margin:12px;" align="center" justify="center" style="flex-wrap: nowrap;">
       <n-card title="Account detail" size="huge">
          <n-form ref="formRef" :model="model" style="width:300px">
            <n-form-item path="displayName" label="Display Name">
              <n-input v-model:value="model.displayName" :disabled="!isEditing" @keydown.enter.prevent placeholder =""/>
            </n-form-item>
            <n-form-item path="email" label="Email">
              <n-input v-model:value="model.email" :disabled="!isEditing" @keydown.enter.prevent placeholder =""/>
            </n-form-item>
            <n-form-item path="username" label="Username">
              <n-input v-model:value="model.username" :disabled="!isEditing" @keydown.enter.prevent placeholder ="" />
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
       </n-card>
     </n-space>
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
    const message = useMessage();
    const isEditing = ref(true);
    const userDetails = ref({
      displayName: null,
      email: null,
      username: null,
      age: null,
      gender: null
    });

    async function getDetails() {
      try {
        const fetchedDetails = await store.dispatch("user/getUserDetails");
        userDetails.value = {
          displayName: fetchedDetails.displayName,
          email: fetchedDetails.email,
          username: fetchedDetails.username,
          //password: fetchedDetails.password,
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
