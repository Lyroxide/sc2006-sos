<template>
  <n-grid x-gap="12" :cols="24">
    <n-gi :offset="1" :span="22">
      <div class="native-scrollbar" ref="scrollArea">
        <n-list class="message-list">
          <n-space vertical v-for="(messages, date) in messagesByDate" :key="date">
            <n-space justify="center" align="center">
              <n-tag size="small" round :color="{ color: 'rgba(52,38,40,0.2)', textColor: 'rgba(52,38,40,0.8)'}">{{ date }}</n-tag>
            </n-space>
            <n-card
              v-for="message in messages"
              :key="message.GroupChatMessageID"
              :class="{'message-card-current': message.ByCurrentUser, 'message-card-other': !message.ByCurrentUser}"
          >
            <n-space item-style="flex-direction: row;" align="baseline">
              <n-text style="font-size: 20px;">{{ message.Name }} @{{ message.Username }}</n-text>
            </n-space>
            <n-space item-style="flex-direction: row;" align="center">
              <n-text style="font-size: 14px; text-align: start;">{{ message.Message }}</n-text>
            </n-space>
            <n-space item-style="flex-direction: row;" align="center" justify="end">
              <n-text style="font-size: 10px;">{{ message.Time }}</n-text>
            </n-space>
          </n-card>
          </n-space>
        </n-list>
      </div>
      <n-input-group style="margin-top: 4px">
        <n-input
            :value="userMessage"
            @update:value="updateInputText"
            @keydown.enter="sendChatMessage"
            ref="inputArea"
            class="input-text"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 6 }"
            maxlength="3000"
        >
          <template #suffix>
            <n-button text>
              <n-icon :size="16" :component="Send28Filled"/>
            </n-button>
          </template>
        </n-input>
      </n-input-group>
    </n-gi>
  </n-grid>
</template>

<script>
import { Send28Filled } from "@vicons/fluent";
import { DateTime } from 'luxon';
import { useMessage } from "naive-ui";
import {createApp, defineComponent, ref, watch, nextTick, onMounted} from "vue";
import store from "../store/index.js";


export default defineComponent({
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const message = useMessage();
    const messages = ref({});
    const group = ref({});
    const userMessage = ref("");
    const inputArea = ref(null);
    const updateInputText = (value) => {
      userMessage.value = value
    }
    const messagesByDate = ref({});
    const watchedMessages = ref([]);
    const scrollArea = ref(null);

    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        return group.value;
      }
    };
    const scrollToBottom = () => {
      nextTick(() => {
        const scrollContainer = scrollArea.value; // References the scrollable div container
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight; // Scrolls to bottom
        }
      });
    };
    const fetchChatMessages = async () => {
      const allChatMessages = await store.dispatch("chatMessage/getAllChatMessages");
      for (let m of allChatMessages) {
        let date = DateTime.fromISO(m.MessageDate).toFormat('dd LLL yyyy');
        let time = DateTime.fromISO(m.MessageDate).toFormat('t');
        let data = await store.dispatch("user/getUserDetails");
        m.Date = date;
        m.Time = time;
        m.ByCurrentUser = m.UserID === data.UserID;
      }
      watchedMessages.value = allChatMessages;
      //scrollToBottom();
    }

    watch(() => props.groupId, async (newGroupId) => {
      await getGroupDetails(newGroupId);
      if(group.value){
        try {
          await fetchChatMessages();
        } catch (error) {
          console.error(error);
        }
      }
    }, { immediate: true });


    watch(() => watchedMessages.value, (newMessages) => {
      messagesByDate.value = newMessages.reduce((acc, message) => {
        (acc[message.Date] = acc[message.Date] || []).push(message);
        return acc;
      }, {});
    });

    const sendChatMessage = async (event) => {
      let textareaElement = inputArea.value.wrapperElRef.children[0].children[0].children[0];
      event.preventDefault();
      if (event.shiftKey) {
        let pos = textareaElement.selectionStart;
        userMessage.value = userMessage.value.slice(0, pos) + '\n' + userMessage.value.slice(pos);
        textareaElement.value = userMessage.value;
        textareaElement.selectionStart = textareaElement.selectionEnd = pos + 1;
        return;
      }
      try {
        let data = {
          MessageDate: DateTime.now().toISO(),
          Message: userMessage
        }
        await store.dispatch("chatMessage/sendChatMessage", data);
        userMessage.value = "";
        await fetchChatMessages();
        scrollToBottom();
      } catch (error) {
        console.error(error);
        message.error("Failed to send");
      }
    }
    const loadLatestMessagesAndScrollToBottom = async () => {
      await fetchChatMessages();
      scrollToBottom();
    };

    // Lifecycle hook for on mounted
    onMounted(async () => {
      await loadLatestMessagesAndScrollToBottom();
    });

    // Watch for changes in the group ID
    watch(() => props.groupId, async (newGroupId, oldGroupId) => {
      if (newGroupId !== oldGroupId) {
        await loadLatestMessagesAndScrollToBottom();
      }
    });

    return {
      Send28Filled,
      getGroupDetails,
      messages,
      userMessage,
      inputArea,
      sendChatMessage,
      updateInputText,
      messagesByDate,
      scrollToBottom,
      scrollArea,
      loadLatestMessagesAndScrollToBottom,
    };
  }
})
</script>



<style scoped>

.native-scrollbar {
  max-height: 400px; /* Same as before, adjust this to your needs */
  overflow-y: auto; /* Enables scrolling when content overflows */
  /* Additional styles for aesthetics (optional) */
  padding-right: 2px; /* Offset for scrollbar width if needed */
}


.message-list {
  margin-top: 8px;
  overflow-y: auto;
}


.n-card {
  margin-bottom: 6px;
  width: calc(100% - 20%);
  border-radius: 20px;
}

.message-card-current {
  background-color: rgba(254,170,0,.30);
  border-right: 4px solid #FEAA00;
  margin-left: auto;
}

.message-card-other {
  background-color: rgba(120,132,2,.30);
  border-left: 4px solid #788402;
  margin-right: auto;
}

.n-tag {
  align-items: center;
}

</style>