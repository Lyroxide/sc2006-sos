<template>
  <n-space vertical class="findgroups">
    <n-h1> Find Groups Here!</n-h1>
    <n-space item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: nowrap;">

      <n-input v-model:value="searchvalue" type="text" :loading="isSearching" @keyup.enter="searchRequest" placeholder="Search by Group Name">

      </n-input>
      <n-button type="info" @click="searchRequest">
        <n-icon size="24">
          <SearchIcon />
        </n-icon>
      </n-button>
    </n-space>


    <n-space vertical>
      <n-select
          v-model:value="selectedValue"
          filterable
          placeholder="Food Preferences"
          :options="options"
      ></n-select>
    </n-space>


        <n-scrollbar style="max-height: 500px">
          <n-space class="vertical-scroll-container" item-style="display:flex;margin:10px;" align="center" justify="center" style="flex-wrap: wrap;">
            <n-card hoverable v-for="(group, index) in groups" :key="group.id" :class="[index % 3 === 0 ? 'custom-card-first' : index % 3 === 1 ? 'custom-card-second' : 'custom-card-third']">
              <n-space vertical align="center" justify="center" item-style="display: flex;">
                <n-space class="card-top" justify="start">
                  <n-h1 class ="group-name"> {{ group.GroupName }} </n-h1>
                  <font-awesome-icon :icon="['fas', 'user']" class="shift-icon" />
                  <n-text class="group-capacity">{{group.memberCount.count}}/{{ group.Capacity }}</n-text>
                </n-space>
                <n-space class="group-description" justify="center" align="center">
                  {{ group.GroupDesc }}
                </n-space>
              </n-space>
              <n-space class="group-tags" justify="start">
                <n-button class="tag">{{ group.regionPreference }}</n-button>
                <n-button v-for="tag in group.foodPreferences" :key="tag" class="tag">{{ tag }}</n-button>
              </n-space>
              <n-space class="group-footer" justify="center" align="center">
                <n-button circle @click="joinGroup(group)">
                  <font-awesome-icon :icon="['fas', 'user-plus']"/>
                </n-button>
              </n-space>
            </n-card>
          </n-space>
        </n-scrollbar>
  </n-space>

</template>


    <script>
    import {defineComponent, ref} from "vue";
    import {useMessage} from "naive-ui";
    import {SearchOutlined} from "@vicons/material";
    import store from "../store/index.js";
    

      export default defineComponent({
        components: {
          SearchIcon: SearchOutlined,
        },

        setup() {

          const searchvalue = ref("");
          const isSearching = ref(false);
          const filterTag = ref("");
          const filterOptions = ref([]);
          const groups = ref([]);

          const message = useMessage();

          async function searchRequest() {
            isSearching.value = true;

            try {
              groups.value = await store.dispatch("group/getAllGroups");
              isSearching.value = false;
            } catch (error) {
              console.error(error);
            }

          }

          async function joinGroup(group) {
            try {
              console.log(group);
              await store.dispatch("group/joinGroup", group.GroupID);
              message.info("Successfully joined the group");
            } catch (error) {
              console.error(error);
              message.error("Failed to join the group");
            }
          }

          return {
            show: ref(true),
            groups: groups,
            searchvalue,
            isSearching,
            filterTag,
            filterOptions,
            searchRequest,
            joinGroup,

            selectedValue: ref(null),
            options: [
              'Chinese Cuisine',
              'Fusion Food',
              'Hawker Food',
              'Indian Cuisine',
              'Italian Cuisine',
              'Japanese Cuisine',
              'Korean Cuisine',
              'Kosher',
              'Local (Singaporean) Cuisine',
              'Malay Cuisine',
              'Mediterranean',
              'Pub Food',
              'Street Food',
              'Thai Cuisine',
              'Alcohol',
              'Drinks Only',
              'Allergen-Specific',
              'Dairy-Free',
              'Farm-to-Table',
              'Gluten-Free',
              'Health Food',
              'Halal',
              'High Fibre',
              'High Protein',
              'Ketogenic',
              'Low-Carb',
              'Low-Fat',
              'Low-Sodium',
              'Low-Sugar',
              'Non-Alcoholic',
              'Organic',
              'Paleo',
              'Pescatarian',
              'Plant-Based',
              'Seafood',
              'Superfoods',
              'Vegan',
              'Vegetarian',
              'Zero Waste',
              'Artisan Food',
              'BBQ',
              'Baked Goods & Pastries',
              'Brunch',
              'Buffet',
              'Café',
              'Comfort Food',
              'Desserts',
              'Fine Dining',
              'Fruits & Salads',
              'High Tea'
            ].map(item => ({
              value: item,
              label: item,
            }))
          };
        },
      });
    </script>



    <style>


      .custom-card-first {
        justify-content: center;
        align-items: center;
        background-color: rgba(254,170,0,.60); /* Replace with your desired color for the top half */
        width: 400px;
        height: 400px;
        border-radius: 30px;
      }

      .custom-card-second {
        justify-content: center;
        align-items: center;
        background-color: rgba(120,132,2, .60); /* Replace with your desired color for the top half */
        width: 400px;
        height: 400px;
        border-radius: 30px;
      }

      .custom-card-third {
        justify-content: center;
        align-items: center;
        background-color: rgba(87, 40, 34, .60); /* Replace with your desired color for the top half */
        width: 400px;
        height: 400px;
        border-radius: 30px;
      }


      .shift-icon {
        position: absolute;
        top: 29px;
        right: 20px;
      }

      .group-capacity {

        position: absolute;
        top: 42px;
        right: 15px;
        font-size: 12px;

      }

      .findgroups {
        margin: 2% 18%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }



      .shift-icon {
        margin-right: 5px;
      }

      .group-description {
        background-color: rgb(239, 222, 205);
        height: 200px;
        width: 350px;
        flex-grow: 1;
        padding: 10px;
        border-radius: 30px;
      }

      .group-tags {
        flex-grow: 1;
        padding: 10px;

      }

      .tag {
        background-color: rgba(255, 255, 255, .40);
        border-radius: 30px;
        padding: 15px;
        font-size: 10px;


      }



    </style>
