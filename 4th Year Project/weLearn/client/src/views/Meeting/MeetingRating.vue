<template>
  <div>
    <h4 class="text-center mt-20">
      <!-- <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small> -->
    </h4>
    <div class="col-md-7 form-wrapper">
      <h2>Rate User</h2>
      <br />
      <br />
      <form id="create-post-form" @submit.prevent="rateUser">
        <div class="form-group col-md-7">
          <label for="title">
            How was their attitude during the meeting?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value="7"
            step="1"
            orient="vertical"
            id="attitude"
            v-model.number="attitude"
            name="title"
            class="form-control"
            placeholder=""
          />
        </div>
        <div class="form-group col-md-7">
          <label for="title">
            How was their knowledge of the language they were teaching you?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value="7"
            step="1"
            orient="vertical"
            id="knowledge"
            v-model.number="knowledge"
            name="title"
            class="form-control"
            placeholder=""
          />
        </div>
        <div class="form-group col-md-7">
          <label for="title">
            How was their teaching skills when they were teaching you?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value="7"
            step="1"
            orient="vertical"
            id="teachingSkill"
            v-model.number="teachingSkill"
            name="title"
            class="form-control"
            placeholder=""
          />
        </div>
        <div class="form-group col-md-7 pull-down">
          <br />
          <button class="btn btn-primary" type="submit">Rate User</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
//19/02/2021 - FIX:
//Rate the meeting - What if it was toUserID that needs the rating
//Round down to 0 decimal places
//Add Stars instead of Numbers in UserList
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: 0,
      toUserID: 0,
      userID: 0,
      user: {},
      toUser: {},
      attitude: 0,
      knowledge: 0,
      teachingSkill: 0,
      overallRating: 0,
      currentRating: 0,
      count: 0,
    };
  },
  computed: mapGetters(["user"]),
  created() {
    this.toUserID = this.$route.params.toUserID;
    this.userID = this.$route.params.userID;
    this.count = this.$route.params.meetingCount;
    console.log(this.user.email);
    this.getUsers();
    this.getProfile();
  },
  methods: {
    ...mapActions(["getProfile"]),
    rateUser() {
      if (this.count > 1) {
        this.count *= 0.1;
        this.overallRating =
          this.knowledge + this.attitude + this.teachingSkill;
        this.overallRating += this.currentRating;
        this.overallRating *= 100;
        this.overallRating /= 30;
        this.overallRating /= this.count;
      } else {
        this.overallRating =
          this.knowledge + this.attitude + this.teachingSkill;
        this.overallRating *= 100;
        this.overallRating /= 30;
      }

      let toUserData = {
        meetingRating: this.overallRating,
      };
      if (this.user._id == this.userID) {
        axios.put(
          `http://localhost:3000/api/profileList/${this.toUserID}`,
          toUserData
        );
        this.$router.push("/usermeetings");
      }
      else {
        axios.put(
          `http://localhost:3000/api/profileList/${this.userID}`,
          toUserData
        );
        this.$router.push("/usermeetings");
      }
    },
    getUsers() {
      axios
        .get(`http://localhost:3000/api/profileList/${this.userID}`)
        .then((data) => (this.user = data.data));
      axios
        .get(`http://localhost:3000/api/profileList/${this.toUserID}`)
        .then((data) => (this.toUser = data.data));
    },
  },
};
</script>