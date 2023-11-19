<template>
  <n-layout-footer >
    <n-space justify="space-around" class="footer">
      <n-space justify="space-around" class="links" item-style="display:flex" align="center">
        <n-button text @click="load('https://github.com/Lyroxide/sc2006-sos')">
          <n-icon size="32">
            <Github/>
          </n-icon>
        </n-button>
      </n-space>
      <n-text>
        SWE Project
      </n-text>
    </n-space>

  </n-layout-footer>
</template>

<script>
import {Github} from "@vicons/fa";

export default {
  components:{
    Github
  },
  methods:{
    load(site){
      window.location = site;
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  z-index: 10;
}

</style>