<template>
   <div>
        <h4 class="text-center mt-20">
         <!-- <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small> -->
        </h4>
        <div class="col-md-7 form-wrapper">
          <h2> Edit Customer </h2>
          <form id="create-post-form" @submit.prevent="editUser">
               <div class="form-group col-md-12">
                <label for="title"> Name </label>
                <input type="text" id="last_name" v-model="user.name" name="title" class="form-control" placeholder="Enter Name">
               </div>
             <div class="form-group col-md-12">
                <label for="title"> Email </label>
                <input type="text" id="email" v-model="user.email" name="title" class="form-control" placeholder="Enter email">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Mother Tongue </label>
                <input type="text" id="motherTongue" v-model="user.motherTongue" name="title" class="form-control" placeholder="Enter Mother Tongue">
            </div>
            <div class="form-group col-md-12">
                <label for="title"> Desired Language </label>
                <input type="text" id="desiredLanguage" v-model="user.desiredLanguage" name="title" class="form-control" placeholder="Enter Desired Language">
            </div>
              <div class="form-group col-md-12">
                  <label for="title"> Meeting Platform </label>
                  <input type="text" id="meetingPlatform" v-model="user.meetingPlatform" name="title" class="form-control" placeholder="Enter Meeting Platform">
              </div>
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-primary" type="submit"> Edit User </button>
              </div>           </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      user: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
  },
  methods: {
    editUser() {
      let userData = {
        name: this.user.name,
        email: this.user.email,
        motherTongue: this.user.motherTongue,
        desiredLanguage: this.user.desiredLanguage,
        meetingPlatform: this.user.meetingPlatform
      };
      axios
        .put(
          `http://localhost:3000/api/profileList/${this.id}`,
          userData
        )
        this.$router.push('/admin');
    },
    getUser() {
      axios
        .get(`http://localhost:3000/api/profileList/${this.id}`)
        .then(data => (this.user = data.data));
    },
    // navigate() {
    //   router.go("/list");
    // }
  }
};
</script>