<template>
  <n-space horizontal class="about">
    <n-space item-style="display:flex;margin:10px;" align="start" justify="start" style="flex-wrap: nowrap;">
      <div class="carousel-container">
        <n-carousel autoplay>
          <img
              class="carousel-img circle"
              src="../assets/Carou1.png"
          >
          <img
              class="carousel-img circle"
              src="../assets/Carou2.png"
          >
          <img
              class="carousel-img circle"
              src="../assets/Carou3.png"
          >
          <img
              class="carousel-img circle"
              src="../assets/Carou4.png"
          >

        </n-carousel>
      </div>
      <n-space align="center" justify="center" direction="vertical" style="padding:2px;">
        <div class="text-container">
          <h1>DISCOVER
            COMMUNITIES
            OF FOODIES</h1>
          <p>At FoodKaki, we believe that sharing a meal with friends is one of life's
            simple joys and it can be challenging to do so in today's fast-paced world.
            That's why we've created this platform that makes it easier than ever to
            connect with like-minded food enthusiasts and turn dining into a social experience.
          </p>
        </div>
        <div style="width: 100%; text-align: center;">
          <router-link to="/login" #="{ navigate, href }" custom style="margin-right:24px;">
            <n-a :href="href" @click="navigate">
              <n-button
                  round
                  type="primary"
                  style="font-size: 18px;"
              >
                GET STARTED
              </n-button>
            </n-a>
          </router-link>
        </div>
      </n-space>
    </n-space>
  </n-space>


</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then( //to call from backend
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
};
</script>

<style scoped>

.about {
  margin: 10% 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container {
  width: 100%;
  padding-left: 120px;
  padding-top: 5px;
  /*padding-right: 10px;*/
  overflow: visible;
}
.carousel-img {
  width: 100%;
  height: 500px;
  /*object-fit: cover;*/
}
.text-container {
  width: 75%;
  padding-right: 230px;
  padding-left:50px;
  color: #342628;
  font-size: 18px;
  text-align: center;
}

</style>