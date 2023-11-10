<template>
    <n-space vertical class="forget-password" style="margin-top: 130px;" >
    <n-space item-style="display:flex;margin:0px;" align="center" justify="center" style="flex-wrap: nowrap;">
        <n-card title="Forgot Password" size="huge" style="border-radius: 30px;">
        <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="email" label="Email">
            <n-input v-model:value="model.email" @keydown.enter.prevent />
            </n-form-item>
            <n-row :gutter="[0, 24]">
            <n-col :span="16">
                <div style="display: flex; justify-content: flex-end">
                <n-button style="margin-top: 15px;"
                    :disabled="!model.email"
                    round
                    color="#F7F4EF"
                    @click="handleForgotPasswordButtonClick"
                >
                    <n-icon :component="Check" color="#342628" size="100%"/>
                </n-button>
                </div>
            </n-col>
            </n-row>
        </n-form>
        </n-card>
    </n-space>
    </n-space>
</template>

<script>
import { Check } from "@vicons/fa";
import axios from 'axios';
import { useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { API_URL } from '../services/docker.ip.js';

export default defineComponent({
    setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
        email: null
    });

    const rules = {
        email: [
        {
            required: true,
            message: "Email is required",
            trigger: ["input", "blur"]
        }
        ]
    };

    async function handleForgotPasswordButtonClick(e) {
    e.preventDefault();
    formRef.value?.validate(async (errors) => {
        if (!errors) {
        try {
            const response = await axios.post(API_URL+'reset-password', { email: modelRef.value.email });
            message.success(response.data.message);
        } catch (err) {
            // An error occurred, display its message
            message.error(err.message);
        }
        } else {
        console.log(errors);
        }
    });
    }

    return {
        Check,
        formRef,
        model: modelRef,
        rules,
        handleForgotPasswordButtonClick
    };
    },
});
</script>

<style scoped>
</style>