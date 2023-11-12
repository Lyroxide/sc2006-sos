<template>
  <n-layout-header >
    <n-space item-style="display: flex;" justify="space-evenly" align="center" class="header">

      <template v-if="currentUser">
        <n-a @click="goTo('/dashboard')">
          <n-space item-style="display: flex;" align="center">
            <font-awesome-icon :icon="['fas', 'bowl-food']" style="color:#F7F4E4; font-size: 3em;"/>
            <n-text class="main">Let's Makan <br> Together</n-text>
          </n-space>
        </n-a>
        <n-space class="nav-menu" justify= "start" item-style="display: flex;" align="start">

          <n-space>
            <n-a @click="goTo('/mygroups')">
              <n-text class="nav-text" :class="{ 'selected': $route.path === '/mygroups' }">My Groups</n-text>
            </n-a>
          </n-space>

          <n-space>
            <n-a @click="goTo('/findgroups')">
              <n-text class="nav-text" :class="{ 'selected': $route.path === '/findgroups' }">Find Groups</n-text>
            </n-a>
          </n-space>

          <n-space>
            <n-a @click="goTo('/findfood')">
              <n-text class="nav-text" :class="{ 'selected': $route.path === '/findfood' }">Find Food</n-text>
            </n-a>
          </n-space>
        </n-space>

        <n-space justify="end" align="center" class="nav-end">
          <n-a @click="goTo('/editprofile')">
            <n-text class="nav-text" :class="{ 'selected': $route.path === '/editprofile' }">My Profile</n-text>
          </n-a>
          <n-button strong round type="error" @click="signOut">Sign Out</n-button>
        </n-space>




      </template>
      <template v-else>
        <n-a @click="goTo('/')">
          <n-space item-style="display: flex;" align="center">
            <font-awesome-icon :icon="['fas', 'bowl-food']" style="color:#F7F4E4; font-size: 3em;"/>
            <n-text class="main">Let's Makan <br> Together</n-text>
          </n-space>
        </n-a>
        <n-space class="login" justify="end" item-style="display: flex;" align="center">
          <n-a @click="goTo('/login')">
            <n-button round strong color='#FEAA00' style="color: #F7F4E4;">Log In</n-button>
          </n-a>
        </n-space>
      </template>

    </n-space>

  </n-layout-header>

</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

export default {
  computed: {
    currentUser() {
      return useStore().state.auth.user;
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const signOut = () => {
      store.dispatch('auth/logout');
      router.push('/login');
    }

    const goTo = (path) => {
      router.push(path)
    }

    return {
      signOut,
      goTo
    }
  }
};
</script>

<style scoped>

.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(52,38,40,0.95);
  z-index: 10;
}

.main {
  margin-right: 15px;
  color: #F7F4E4;
  font-size: 1.5em;
}

.nav-text {
  color: #F7F4E4;
}

.selected {
  color: #788402;
}

</style>