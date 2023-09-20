<template>
  <metainfo />
  <n-layout class="site">
    <n-config-provider :theme="lightTheme">
      <n-loading-bar-provider>
        <n-dialog-provider>
          <router-view></router-view>

        </n-dialog-provider>
      </n-loading-bar-provider>
      <Footer></Footer>
    </n-config-provider>
  </n-layout>
</template>

<script>
import { NConfigProvider, lightTheme } from "naive-ui"
import headerVue from "./header.vue"
import footerVue from "./footer.vue"
import { useMeta } from "vue-meta"

export default {
  data() {
    return {
      lightTheme: lightTheme,
    }
  },
  created() {
    this.lightTheme = this.prepare(lightTheme);
  },
  components: {
    "Header": headerVue,
    "Footer": footerVue,
  },
  methods:{
    prepare(theme){
      console.log(theme);
      theme.common.bodyColor = "#151515";
      theme.common.primaryColor = "#ffd03f";
      theme.common.primaryColorHover = "#eca93b";
      theme.common.primaryColorPressed = "#ffc33f";
      theme.common.primaryColorSuppl = "#ffc33f";
      theme.Typography.common.infoColor = "#87c1af"
      return theme;
    }
  }

}
</script>

<style>

.site {
  height: 100vh;
}

.site>.n-layout-scroll-container {
  background-color: rgb(24, 24, 28);
}

@font-face {
  font-family: 'Montserrat-Regular';
  src: url('Montserrat-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="font-"],
[class*=" font-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'Montserrat-Regular', serif !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.n-list {
  color: rgba(0, 0, 0, 0) !important;
  --n-color: rgba(0, 0, 0, 0) !important;
}

.n-list-item {
  padding: 20px !important;
  transition: all 0.5s !important;
}

.n-list-item:hover {
  background-color: rgba(143, 52, 46,0.5);
  /* padding: 30px 20px !important; */
  /* add inner box shadow */
  box-shadow: 0px 0px 20px 0px rgba(143, 52, 46, 0.3);
}
</style>