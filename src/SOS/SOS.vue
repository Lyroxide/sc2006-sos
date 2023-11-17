<template>
  <metainfo />
  <n-layout class="site">
    <Header/>
    <n-config-provider :theme-overrides="themeOverrides">
      <n-global-style />
      <n-message-provider>
        <n-dialog-provider>
          <router-view/>
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </n-layout>

</template>

<script>
import { NConfigProvider, lightTheme } from 'naive-ui'
import headerVue from "./header.vue"
import footerVue from "./footer.vue"
import { defineComponent } from 'vue';


export default defineComponent ({
  components: {
    "Header": headerVue,
    "Footer": footerVue
  },
  setup() {

    const themeOverrides = {
      common: {
        primaryColor: 'rgba(120,132,2,1)'
      },
      Button: {
        textColor: 'rgba(52,38,40,0.8)',
        textColorHover: 'rgba(52,38,40,0.8)',
        textColorPressed: 'rgba(52,38,40,1)',
        textColorFocus: 'rgba(52,38,40,0.8)',
        textColorGhostHover: 'rgba(52,38,40,0.8)',
        textColorTextHover: 'rgba(52,38,40,0.8)',
        textColorTextPressed: 'rgba(52,38,40,0.8)',
        textColorTextFocus: 'rgba(52,38,40,0.8)',
        border: '1px solid rgba(52,38,40,0.8)',
        borderHover: '1px solid rgba(52,38,40,0.8)',
        borderFocus: '1px solid rgba(52,38,40,0.8)'
      },
      Select: {
        peers: {
          InternalSelection: {
            border: '1px solid rgba(120,132,2,.80)',
            borderHover: '1px solid rgba(120,132,2,.80)',
            borderFocus: '1px solid rgba(120,132,2,.80)',
            boxShadowFocus: '0 0 0 1.5px rgba(120,132,2,.50)'
          }
        }
      },
      Input: {
        border: '1px solid rgba(120,132,2,.80)',
        borderHover: '1px solid rgba(120,132,2,.80)',
        borderFocus: '1px solid rgba(120,132,2,.80)',
        boxShadowFocus: '0 0 0 1.5px rgba(120,132,2,.50)'
      }
    }

    return {
      themeOverrides
    }
  }




});
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
