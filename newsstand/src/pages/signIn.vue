<template>
<q-page class="row ">
  <div class="col-9 col-lg-9 col-md-9 desktop-only col-sm-12 col-xs-12">
    <q-carousel
      animated
      v-model="slide"
      :autoplay="7000"
      transition-prev="slide-right"
      transition-next="slide-up"
      height="100%"
      keep-alive
    >
      <q-carousel-slide class="q-pa-none" :name="1" img-src="statics/pic1.jpg" >
      <div class="overlay-dark row items-center justify-center">
        <div style="width:600px" >
          <h3 class="text-white text-weight-500 q-my-md">Get latest news from top around the globe</h3>
          <p class="text-subtle-grey text-weight-medium" style="font-size:22px">Know whats happening around the world all in one place with no hassle.</p>
        </div>
      </div>
      </q-carousel-slide>
      <q-carousel-slide class="q-pa-none"  :name="2" img-src="statics/pic2.jpg">
      <div class="overlay-dark row items-center justify-center">
        <div style="width:600px">
          <h3 class="text-white text-weight-500 q-my-md">
            Know what interests you
          </h3>
          <p class="text-subtle-grey text-weight-medium" style="font-size:22px">With different categories available choose if you want business updates, entertainment news, sports news or anything else...</p>
        </div>
      </div>
      </q-carousel-slide>
      <q-carousel-slide class="q-pa-none"  :name="3" img-src="statics/pic3.jpg">
      <div class="overlay-dark row items-center justify-center">
        <div style="width:600px">
          <h3 class="text-white text-weight-500 q-my-md">
            Everything from reputed and top news sources worldwide
          </h3>
          <p class="text-subtle-grey text-weight-medium" style="font-size:22px">with top news trending in more than 1000 news souces worldwide be assured that you are definitely informed</p>
        </div>
      </div>
      </q-carousel-slide>
      <q-carousel-slide class="q-pa-none"  :name="4" >
      <div style="height:100%" class="row justify-center">
        <div style="width:600px;margin-top:100px" class=" self-center text-center col-12">
          <h4 class="text-subtle-grey q-my-none">
            All that in one place...
          </h4>
          <h1 class="text-teal  q-my-sm">NewsStand</h1>
          
        </div>
        <q-item class="self-end row justify-center col-12">
              <a href="https://www.facebook.com" class="anchor text-teal q-mr-sm" style="font-size:36px">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="https://github.com/AbdullahSohail-SE" class="anchor text-teal q-mx-sm" style="font-size:36px">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/abdullahsohailned/?originalSubdomain=pk" class="anchor q-mx-sm text-teal" style="font-size:36px">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a class="anchor q-mx-sm text-teal" style="font-size:36px">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="anchor q-mx-sm text-teal" style="font-size:36px">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="anchor q-mx-sm text-teal" style="font-size:36px">
                <i class="fab fa-youtube"></i>
              </a>
          </q-item>
      </div>
      </q-carousel-slide>
      
    </q-carousel>
  </div>
  <div class="col-3 col-lg-3 col-md-3  col-sm-12 col-xs-12 row bg-teal items-center justify-center">
    <div class=" text-center" style="height:80%;width:80%">
      <h5 class="text-white">Sign In</h5>
       <q-input ref="emailInput" filled  label="email" v-model="email" label-color="teal" bg-color="white" color="teal" type="email" :rules="[val => !!val || 'Field is required',val => val.includes('@') || 'Type an email like abc@gmail.com']" >
        <template v-slot:prepend>
          <q-icon color="teal" name="mail" />
        </template>
      </q-input>
       <q-input ref="passwordInput" class="q-my-sm" filled label="password" v-model="password" label-color="teal" bg-color="white" color="teal" type="password" :rules="[val => !!val || 'Field is required']">
        <template v-slot:prepend>
          <q-icon color="teal" name="vpn_key" />
        </template>
      </q-input>
      <q-btn ref="signInBtn" @click="logIn" outline="" class="q-mt-lg"  label="Log In" size="md" text-color="white"  color="white"></q-btn>
      <span style="display:block" class="text-white q-mt-lg q-mb-sm">OR</span>
      <router-link  class="text-white hover" to="/users/signUp">Create an account</router-link>
      <div class="q-mt-xl" v-if="logInSpinner">
      <q-spinner-oval size="xl"  color="white" style="display:block:">
      </q-spinner-oval>
      </div>
    </div>
   
  </div>
  
</q-page>
</template>
<script>

export default {
  data(){
    return {

      slide:1,
      email:'',
      password:'',
      logInSpinner:false
    }
  },
  created(){
    this.$q.notify({
      message:`Testing Email:dummy@gmail.com      
      Password:123456`,
      type:"info",
      multiLine:true,
      timeout:12000,
      progress:true
    });
    this.$q.notify({
      message:"Some other people might also be using Testing Email so create an account with some random mail and password!",
      type:"warning",
      multiLine:true,
      timeout:12000,
      progress:true
    })
  },
  methods:{
    logIn:function(){
      const emailInput=this.$refs.emailInput;
      const passwordInput=this.$refs.passwordInput;

      emailInput.validate();
      passwordInput.validate();

      if(emailInput.hasError || passwordInput.hasError)
      return;
      
      this.logInSpinner=true;
      this.$refs.signInBtn.$el.disabled=true;
      this.$store.dispatch('logInUser',{email:this.email,password:this.password})
      .then(()=>{
        this.logInSpinner=false;
        this.$refs.signInBtn.$el.disabled=false;
        })
      .catch((err)=>{
        this.logInSpinner=false;
        this.$refs.signInBtn.$el.disabled=false;
        if(err.response.data.error.message=="INVALID_PASSWORD")
          this.$q.notify({
                color:"negative",
                message:"Incorrect Password!",
                icon:"lock"
            });
          if(err.response.data.error.message=="EMAIL_NOT_FOUND")
          this.$q.notify({
            color:"negative",
            message:"Invalid Email!",
            icon:"mail"
              });
        });
    }
  }
}
</script>
<style lang="scss" scoped>
.overlay-dark{
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 40px black;
}
.anchor {
  text-decoration: none;
  color: white;

  transition-duration: .2s;
  transition-property: all;

  &:hover{
    transform: scale(1.1);
  }
}
.hover{
  &:hover{
    text-decoration: underline;
  }
}
</style>