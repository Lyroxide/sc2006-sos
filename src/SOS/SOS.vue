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
  }
};
</script>

<style>

.site {
  height: 100vh;
  background-color: rgb(239, 222, 205);
}

</style>