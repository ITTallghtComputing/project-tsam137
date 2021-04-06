<template>
  <div>
    <h4 class="text-center mt-20">
      <!-- <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small> -->
    </h4>
    <div class="col-md-7 form-wrapper">
      <h2>Edit Customer</h2>
      <form id="create-post-form" @submit.prevent="editUser">
        <div class="form-group col-md-12">
          <label for="title"> Name </label>
          <input
            type="text"
            id="last_name"
            v-model="user.name"
            name="title"
            class="form-control"
            placeholder="Enter Name"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Email </label>
          <input
            type="text"
            id="email"
            v-model="user.email"
            name="title"
            class="form-control"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Mother Tongue </label>
          <input
            type="text"
            id="motherTongue"
            v-model="user.motherTongue"
            name="title"
            class="form-control"
            placeholder="Enter Mother Tongue"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Desired Language </label>
          <input
            type="text"
            id="desiredLanguage"
            v-model="user.desiredLanguage"
            name="title"
            class="form-control"
            placeholder="Enter Desired Language"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Premium </label>
          <input
            type="text"
            id="premium"
            v-model="user.premium"
            name="title"
            class="form-control"
            placeholder="Is this customer Premium?"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Meeting Count </label>
          <input
            type="number"
            id="meetingCount"
            v-model.number="user.meetingCount"
            name="title"
            class="form-control"
            placeholder="Number of meetings they have had"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Meeting Rating </label>
          <input
            type="number"
            id="meetingRating"
            v-model.number="user.meetingRating"
            name="title"
            class="form-control"
            placeholder="Their Meeting Rating score"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Test Score </label>
          <input
            type="number"
            id="testScore"
            v-model.number="user.testScore"
            name="title"
            class="form-control"
            placeholder="Their Test Score"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-primary" type="submit">Edit User</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      user: {},
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
        meetingPlatform: this.user.meetingPlatform,
        premium: this.user.premium,
        meetingCount: this.user.meetingCount,
        meetingRating: this.user.meetingRating,
        testScore: this.user.testScore,
      };
      axios.put(`http://localhost:3000/api/profileList/${this.id}`, userData);
      this.$router.push("/admin");
    },
    getUser() {
      axios
        .get(`http://localhost:3000/api/profileList/${this.id}`)
        .then((data) => (this.user = data.data));
    },
  },
};
</script>