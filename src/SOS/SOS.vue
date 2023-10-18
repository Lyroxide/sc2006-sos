<template>
  <metainfo />
  <n-layout class="site">
    <Header/>
    <n-config-provider>
      <n-global-style />
      <n-message-provider>
        <router-view>

        </router-view>
      </n-message-provider>
    </n-config-provider>

    <Footer/>
  </n-layout>

</template>

<script>
import { NConfigProvider } from 'naive-ui'
import headerVue from "./header.vue"
import footerVue from "./footer.vue"




export default {
  components: {
    "Header": headerVue,
    "Footer": footerVue,
  },
  mounted() {
    fetch('http://www.letsmakantogether.com/api/connect')
      .then(response => response.json())
      .then(data => console.log(data));
  }
};
</script>

<style>
.site {
  display: flex;
  flex-direction: column; /* make main axis vertical */
  min-height: 100vh; /* minimum height of site */
  background-color: rgb(239, 222, 205);
}

.site > * {
  flex-shrink: 0; /* prevent flex items from being smaller than content */
}

/* all your inner pages here */
router-view {
  flex-grow: 1; /* consume all available free space */
  overflow:auto; /* add scroll to router-view content if needed instead of the whole page */
}
</style>
