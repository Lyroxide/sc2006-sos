<template>
    <n-space class="resetPassword" item-style="display:flex; height: 100%; width: 25%; margin: auto;" align="center" justify="center" style="flex-wrap: nowrap;">
    <n-card size="medium">
        <n-h2> Reset your Password </n-h2>
        <n-thing>
        <n-form ref="formRef" :model="model" :rules="rules" style="width:100%; flex-wrap: nowrap;">
            <n-space item-style="font-size: 70px; display: flex; margin-bottom: 30px;" justify="center">
            <n-icon :component="UserRegular" color="#342628"/>
            </n-space>
            <n-form-item path="newPassword" label="Enter New Password">
            <n-input v-model:value="model.newPassword" type="password" @input="handlePasswordInput" @keydown.enter.prevent placeholder="Enter minimum 12 characters" show-password-on="click"/>
            </n-form-item>
            <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="Re-enter New Password">
            <n-input v-model:value="model.reenteredPassword" type="password" @keydown.enter.prevent placeholder="Re-enter New Password" show-password-on="click"/>
            </n-form-item>
            <n-space align="center" justify="center" style="width: 100%;">
            <n-button round type="primary"
                        :disabled="!model.newPassword || !model.reenteredPassword"
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
import axios from 'axios';
import { useMessage } from "naive-ui";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { API_URL } from '../services/docker.ip.js';


export default defineComponent({
    setup() {
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const router = useRouter();
    const userEmail = ref(null);

    const modelRef = ref({
        newPassword: null,
        reenteredPassword: null
    });

    function validatePasswordSame(rule, value) {
        return value === modelRef.value.newPassword;
    }

    async function saveEdit() {
        if (modelRef.value.newPassword !== modelRef.value.reenteredPassword) {
            //message.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(API_URL+'/update-password', {
            email: userEmail.value, // Assuming you have the user's email stored in this variable
            password: modelRef.value.newPassword
            });

            if (response.status === 200) {
            router.push("/login");
            message.info(response.data.message);
            } else {
            message.error("Failed to save");
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to save");
        }
    }

    const rules = {
        newPassword: [
        {
            required: true,
            message: "Password input required",
            trigger: ["input", "blur"]
        },
        {
            min: 12,
            message: "Password must be at least 12 characters",
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
            validator: validatePasswordSame,
            message: "Password is not same as new password!",
            trigger: ["blur", "password-input"]
        }
        ]
    };

    onMounted(async () => {
    const resetToken = router.currentRoute.value.query.token;

    try {
        const response = await axios.get(API_URL+`/validateResetToken?token=${resetToken}`, {
        validateStatus: function (status) {
            return status >= 200 && status < 500; // Resolve only if the status code is less than 500
        }
        });

        //console.log(response.data)
        //console.log(response.status)

        if (response.status === 200) {
        userEmail.value = response.data.email; // Assuming the server returns the user's email
        //message.info("User-email: " + response.data.email);
        } else {
        router.push('/forgetpassword');
        message.error(response.data.message);
        }
    } catch (error) {
        console.error(error);
        router.push('/');
        message.error("Error");
    }
    });
    

    return {
        UserRegular,
        Check,
        formRef,
        rules,
        saveEdit,
        rPasswordFormItemRef,
        model: modelRef,
        userEmail,

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

.resetPassword {
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