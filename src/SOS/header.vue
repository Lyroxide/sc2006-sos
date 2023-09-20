<template>
  <n-layout-header >
    <n-space item-style="display: flex; " justify="space-between" align="center" class="header" style="flex-warp: nowarp;">
      <n-space item-style="display: flex;" align="center">
        <n-a @click="goToDashboard">
          <n-image src="" style="width:40px;height:40px"  preview-disabled/>
        </n-a>

        <n-space item-style="display: flex;" align="center" >
          <n-a @click="goToDashboard">
            <n-image src="" style="height:30px"  preview-disabled class="logo"/>
          </n-a>
        </n-space>

      </n-space>
      <template v-if="isAuthenticated">
        <n-space justify="end" item-style="display: flex;" align="center">
          <router-link to="/profile" #="{ navigate, href }" custom style="margin-right:20px;">
            <n-a :href="href" @click="navigate">
              <n-text class="nav">My Profile</n-text>
            </n-a>
          </router-link>
          <n-button type="error" ghost @click="signOut">Sign Out</n-button>
        </n-space>
      </template>
      <template v-else>
        <n-space justify="end" item-style="display: flex;" align="center">
          <router-link to="/login" #="{ navigate, href }" custom>
            <n-a :href="href" @click="navigate">
              <n-text class="nav">Sign In</n-text>
            </n-a>
          </router-link>
        </n-space>
      </template>

    </n-space>

  </n-layout-header>

</template>

<script>
import { mapGetters } from 'vuex';
import { useRouter as router } from 'vue-router';

export default {
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods:{
    signOut() {
      this.$store.commit('signout');
    },
    goToDashboard() {
      if (this.isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    }
  }
}
</script>

<style>
.header{
  background-color: #615c4f;
  font-weight: bold;
  padding: 0px 20px;
}

.nav{
  font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
  font-weight: bold;
}

@media(max-width: 1000px){
  .logo{
    display: none;
  }
}

@media(max-width: 820px){
  .nav{
    display: none;
  }
}
</style>