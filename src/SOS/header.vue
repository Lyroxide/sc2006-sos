<template>
  <n-layout-header >
    <n-space item-style="display: flex; " justify="space-between" align="center" class="header" style="flex-warp: nowarp;">
      <n-space item-style="display: flex;" align="center">

        <router-link to="/" #="{ navigate, href }" custom>
          <n-a :href="href" @click="navigate">
            <n-text class="nav">Let's Makan Together</n-text>
          </n-a>
        </router-link>

      </n-space>
      <template v-if="currentUser">
        <n-space justify="end" item-style="display: flex;" align="center">
          <router-link to="/profile" #="{ navigate, href }" custom style="margin-right:20px;">
            <n-a :href="href" @click="navigate">
              <n-text class="nav">My Profile</n-text>
            </n-a>
          </router-link>
          <n-button type="error" ghost @click="signOut">Sign Out</n-button>
        </n-space>

        <router-link to="/findgroups" #="{ navigate, href }" custom>
          <n-a :href="href" @click="navigate">
            <n-text class="nav">Find Groups</n-text>
          </n-a>
        </router-link>

        <router-link to="/findfood" #="{ navigate, href }" custom>
          <n-a :href="href" @click="navigate">
            <n-text class="nav">Find Food</n-text>
          </n-a>
        </router-link>

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
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
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