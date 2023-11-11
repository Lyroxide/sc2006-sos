<template>
  <n-space class="group" v-if="group" item-style="display: flex;" justify="space-evenly">
    <n-card size="huge" content-style="width: 1000px; justify-content: center;">
      <div class="container" style="display:flex">
        <h2 class="title">{{ group.GroupName }}</h2>
        <div class="actions" style="margin-top:20px; margin-left:750px" >
          <n-button v-show="!isGroupOwner" circle @click="handleLeaveButtonClick" color="#F7F4EF" style="width:100px">
            Leave
          </n-button>
          <n-button v-show="isGroupOwner" circle @click="handleDeleteButtonClick" color="#F7F4EF" style="width:100px">
            Delete
          </n-button>
          </div>
      </div>
      <n-tabs default-value="oasis" justify-content="space-evenly" type="line">
        <n-tab-pane name="chat" tab="Group Chat">
          <GroupChat :group-id="group.GroupID"/>
        </n-tab-pane>
        <n-tab-pane name="meeting" tab="Next Meeting">
          <Meeting :group-id="group.GroupID"/>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>

<script>
import { onMounted, ref, toRefs , watch, toRaw} from 'vue';
import store from '../store/index.js';
import Meeting from './nextmeeting.vue';
import GroupChat from './groupchat.vue';
import { useMessage } from "naive-ui";
import { useRouter } from 'vue-router';

export default {
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  components: {
    Meeting,
    GroupChat
  },

  setup(props) {
    const message = useMessage();
    const group = ref({});
    const isGroupOwner = ref({});
    const router = useRouter();
    const userDetails = ref({});

    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        return group.value;
      }
    };
    watch(() => props.groupId, async (newVal) => {
      if (newVal) {
        group.value = await store.dispatch('group/getGroupDetails', newVal)
            .catch(error => console.error(error));
      }
    }, {immediate: true});

    //check if current user is group owner
    onMounted(async() => {
      await getGroupDetails(props.groupId);
      if (group.value) {
        try {
          userDetails.value = await store.dispatch("user/getUserDetails");
          if (userDetails.value.UserID === group.value.OwnerID) {
            isGroupOwner.value = true;
            console.log(userDetails.value.UserID);
            console.log(group.value.OwnerID);
          }
        } catch (error) {
          console.error(error);
        }
      }

    })

    //leave group
    async function handleLeaveButtonClick(e) {
       // e.preventDefault();
            store.dispatch("group/leaveGroup", group.value.GroupId).then(
                () => {
                  router.push("/mygroups");
                  message.success("Leave Success");
                })
                .catch((err) => {
                      message.error(err.message);
                      message.error('Leave fail');
                    }
                );
      }
    //delete group
    async function handleDeleteButtonClick() {
    //  e.preventDefault();
          console.log(Number.isInteger(group.value.GroupID));
      if (Number.isInteger(group.value.GroupID)) {
        store.dispatch("group/deleteGroup", group.value.GroupID).then(
            () => {
              router.push("/mygroups");
              message.success("Delete Success");
            })
            .catch((err) => {
                  message.error(err.message);
                  message.error('Delete fail');
                }
            );
      }else{console.error("GroupID is not an interger", group.value.GroupID)}
    }
    return {
      group,
      Meeting,
      GroupChat,
      isGroupOwner,
      handleLeaveButtonClick,
      handleDeleteButtonClick,
    };
  },
};
</script>

<style scoped>


</style>