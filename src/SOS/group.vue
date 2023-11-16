<template>
  <n-space class="group" v-if="group" item-style="display: flex;" justify="space-evenly">
    <n-card size="huge" content-style="width: 1000px; justify-content: center;">
      <n-space justify="space-around" align="center">
        <n-grid :cols="10">
          <n-gi span="8">
            <n-h2 class="title">{{ group.GroupName }}</n-h2>
          </n-gi>
          <n-gi>
            <n-space class="group-count-wrapper" align="center" style="margin-top: 5px">
              <n-icon :component="User" class="shift-icon" size="20"/>
              <n-text class="group-count">{{ memberCount }}</n-text>
            </n-space>
          </n-gi>
          <n-gi>
            <n-button v-show="!isGroupOwner" strong round type="error" circle @click="handleConfirmLeave" color="#F7F4EF" style="width:100px">
              Leave
            </n-button>
            <n-button v-show="isGroupOwner" strong round type="error" circle @click="handleConfirmDelete"  style="width:100px">
              Delete
            </n-button>
          </n-gi>
        </n-grid>


        <div class="actions" style="margin-top:20px; margin-left:635px" >


          </div>
      </n-space>
      <n-tabs default-value="oasis" justify-content="space-evenly" type="line">
        <n-tab-pane name="detail" tab="Group Details">
          <GroupDetail :group-id="group.GroupID"/>
        </n-tab-pane>
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
import { User } from "@vicons/fa";
import { onMounted, ref, toRefs , watch, toRaw} from 'vue';
import store from '../store/index.js';
import Meeting from './nextmeeting.vue';
import GroupChat from './groupchat.vue';
import GroupDetail from './groupdetail.vue';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import { useMessage, useDialog } from 'naive-ui';


export default {
  computed: {
    User() {
      return User
    }
  },
  props: {
    groupId: {
      type: Number,
      required: true,
    },
  },
  components: {
    Meeting,
    GroupChat,
    GroupDetail
  },
  emits: ['group-updated'],
  setup(props, { emit }) {
    const context = { emit };
    const message = useMessage()
    const dialog = useDialog()
    const group = ref({});
    const isGroupOwner = ref(false);
    const router = useRouter();
    const userDetails = ref({});
    const memberCount = ref({});


    const getGroupDetails = async (groupId) => {
      if (groupId) {
        group.value = await store.dispatch('group/getGroupDetails', groupId)
            .catch(error => console.error(error));
        memberCount.value = group.value.memberCount.count;
        return group.value;

      }
    };
    watch(() => props.groupId, async (newVal) => {
      if (newVal) {
        group.value = await store.dispatch('group/getGroupDetails', newVal)
            .catch(error => console.error(error));
      }

    }, {immediate: true});
    console.log(isGroupOwner.value);
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
    async function handleLeaveButtonClick() {
       // e.preventDefault();
            store.dispatch("group/leaveGroup", group.value.GroupID).then(
                () => {
                  router.push("/mygroups");
                  message.success("Leave Success");
                  context.emit('group-updated');
                })
                .catch((err) => {
                      message.error(err.message);
                      message.error('Leave fail');
                    }
                );
      }
    //delete group
    async function handleDeleteButtonClick() {
      //handleLeaveButtonClick(); //to remove owner from group while deleting group??
      //deleteMeeting Details along with group (optional)
      store.dispatch("group/deleteGroup",group.value.GroupID).then(
          () => {
            router.push("/mygroups");
            message.success("Delete Success");
            context.emit('group-updated');
          })
          .catch((err) => {
                message.error(err.message);
                message.error('Delete fail');
              }
          );
    }
    return {
      group,
      memberCount,
      Meeting,
      GroupChat,
      GroupDetail,
      isGroupOwner,
      handleConfirmLeave () {
        dialog.warning({
          title: 'Confirm',
          content: 'Are you sure you want to leave the group?',
          positiveText: 'LEAVE GROUP',
          negativeText: 'CANCEL',
          onPositiveClick: () => {
            handleLeaveButtonClick()
          },
          onNegativeClick: () => {
          }
        })
      },
      handleConfirmDelete () {
        dialog.warning({
          title: 'Confirm',
          content: 'Are you sure you want to delete and leave the group?',
          positiveText: 'DELETE GROUP',
          negativeText: 'CANCEL',
          onPositiveClick: () => {
            handleDeleteButtonClick()
          },
          onNegativeClick: () => {
          }
        })
      },

    };
  },
};
</script>

<style scoped>


</style>