<template>
  <n-space vertical class="searchpage">
    <h1>Groups</h1>
    <n-space item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: nowrap;">
      <n-input v-model:value="searchvalue" type="text" :loading="isSearching" @keyup.enter="searchRequest" default-value="Search">
      </n-input>
      <n-button type="info" @click="searchRequest">
        <n-icon size="24">
          <SearchIcon />
        </n-icon>
      </n-button>
    </n-space>
    <n-switch v-model:value="show">
      <template #checked>
        Filter
      </template>
      <template #unchecked>
        No Filter
      </template>
    </n-switch>
    <n-collapse-transition :show="show">

    </n-collapse-transition>

      <n-space horizontal class="vertical-scroll-container" item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: nowrap;">

        <div class="card-container" v-for="group in groups" :key="group.id">
          <n-card hoverable class="custom-card">
            <h1>{{ group.name }}</h1>
            <p>{{ group.description }}</p>
            <p>{{ group.capacity }}</p>
          </n-card>
        </div>

      </n-space>




  </n-space>





 <!--  <div class="vertical-scroll-container">
    // assume each group object in the groups array has id, name, and description properties
    // adjust the template code based on the actual structure of your group objects
    <div class="scrolling-wrapper">
      <div class="card" v-for="group in groups" :key="group.id">
        <h2>{{ group.name }}</h2>
        <p>{{ group.description }}</p>
      </div>
    </div>
  </div>-->


</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useMessage } from "naive-ui";
import { SearchOutlined } from "@vicons/material";
import store from "../store/index.js";


export default defineComponent({
  components: {
    SearchIcon: SearchOutlined,
  },
  setup() {
    const dummyGroups = ref([

      {
        id: 1,
        name: "Group 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        capacity: "50/50"
      },
      {
        id: 2,
        name: "Group 2",
        description: "Nulla tempus est nec tellus ultrices, vitae accumsan nisl cursus.",
        capacity: "40/50"
      },
      {
      id: 3,
        name: "Group 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        capacity: "50/50"
      },
      {
       id: 4,
        name: "Group 4",
        description: "Nulla tempus est nec tellus ultrices, vitae accumsan nisl cursus.",
        capacity: "40/50"
      },

      {
        id: 5,
        name: "Group 5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        capacity: "50/50"
      },
      {
        id: 6,
        name: "Group 6",
        description: "Nulla tempus est nec tellus ultrices, vitae accumsan nisl cursus.",
        capacity: "40/50"
      },
      {
        id: 7,
        name: "Group 7",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        capacity: "50/50"
      },
      {
        id: 8,
        name: "Group 8",
        description: "Nulla tempus est nec tellus ultrices, vitae accumsan nisl cursus.",
        capacity: "40/50"
      },


      // Add more dummy groups as needed
    ]);

    const searchvalue = ref("");
    const isSearching = ref(false);
    const filterTag = ref("");
    const filterOptions = ref([]);
    //const groups = ref([]);

    const message = useMessage();

    async function searchRequest() {
      isSearching.value = true;

      try {
        const response = await store.dispatch("group/getGroupDetails");
        //groups.value = response;
        isSearching.value = false;
      } catch (error) {
        console.error(error);
      }

    }

    async function joinGroup(group) {
      try {
        await store.dispatch("group/joinGroup", group.id);
        message.info("Successfully joined the group");
      } catch (error) {
        console.error(error);
        message.error("Failed to join the group");
      }
    }

    return {
      show: ref(true),
      groups: dummyGroups,
      searchvalue,
      isSearching,
      filterTag,
      filterOptions,
      searchRequest,
      joinGroup,
    };
  },
});
</script>



<style scoped>
.n-card {
  max-width: 300px;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.card-item {
  display: inline-block;
  width: 300px;
  height: 200px;
  margin-right: 10px;
  border-radius: 30px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 200px;
  margin-right: 10px;
  border-radius: 40px;
  padding: 20px;

}


.custom-card {
  /* Add your custom styles for the card */
  display: inline-block;
  width: 300px;
  height: 300px;
  margin-right:00px;
  border-radius: 30px;

}

.custom-card .n-card-title {
  /* Add your custom styles for the title section */
}

</style>