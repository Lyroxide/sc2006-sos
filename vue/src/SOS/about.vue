<template>
  <div class="about">
    <div class="carousel-container">
      <n-carousel autoplay>
        <img class="carousel-img circle" src="../assets/Carou1.png">
        <img class="carousel-img circle" src="../assets/Carou2.png">
        <img class="carousel-img circle" src="../assets/Carou3.png">
        <img class="carousel-img circle" src="../assets/Carou4.png">
      </n-carousel>
    </div>
    <div class="about-text">
      <div class="text-container" style="width: 100%; text-align: center;">
        <h1>DISCOVER COMMUNITIES OF FOODIES</h1>
        <p>At Let'sMakanTogether, we believe that sharing a meal with friends is one of life's simple joys and it can be challenging to do so in today's fast-paced world. That's why we've created this platform that makes it easier than ever to connect with like-minded food enthusiasts and turn dining into a social experience.</p>
      </div>
      <div style="width: 100%; text-align: center;">
        <router-link to="/login" #="{ navigate, href }" custom>
          <n-a :href="href" @click="navigate">
            <n-button
                round
                type="primary"
                color="rgba(120,132,2,0.6)"
                text-color="rgba(52,38,40,0.8)"
                size="large"
                style="font-size: 20px;"
            >
              GET STARTED
            </n-button>
          </n-a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  }
};
</script>

<style scoped>

.about {
  margin: 10% 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.text-container {
  width: 100%;
  color: #342628;
  font-size: 18px;
}

@media screen and (min-width: 600px) {
  .carousel-container {
    width: 100%;
    padding: 50px;
    /*padding-right: 10px;*/
    overflow: visible;
  }
  .carousel-img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
  }

}

@media screen and (max-width: 600px) {
  .about {
    flex-direction: column;
  }
  .carousel-container {
    width: 400px;
    height: 400px;
    padding: 0;
    /*padding-right: 10px;*/
    overflow: visible;
  }
  .carousel-img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
  }

}




</style>