<template>
  <div>
    <h4 class="text-center mt-20">
      <!-- <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small> -->
    </h4>

    <h2 v-if="toUser.premium">
      <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/crown_1f451.png"
                  alt="Kitten"
                  width="50"
                  height="50"
                  style="position: relative; top: -5px"
                />
       <span> {{ toUser.name }}</span>'s Premium Profile</h2>
    <h2 v-else-if="!toUser.premium"><span>{{ toUser.name }}</span>'s Profile</h2>
    <br />

    <div class="card" v-if="toUser">
      <ul class="list-group">
        <li class="list-group-item">Name: {{ toUser.name }}</li>
        <li class="list-group-item">Email: {{ toUser.email }}</li>
        <li class="list-group-item">Mother Tongue: {{ toUser.motherTongue }}</li>
        <li class="list-group-item">
          Desired Language: {{ toUser.desiredLanguage }}
        </li>
        <li class="list-group-item">
          Premium Account: {{ toUser.premium }}
        </li>
        <li class="list-group-item">
          Meeting Count: {{ toUser.meetingCount }}
        </li>
        <li class="list-group-item">
          Meeting Rating: {{ toUser.meetingRating.toFixed(0) }}/100
        </li>
        <li class="list-group-item">
                <img v-if="user.testScore >=1000"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/trophy_1f3c6.png" 
                alt="gold" width="32" height="32">
              <img v-if="user.testScore >=70 && user.testScore <=100"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/1st-place-medal_1f947.png" 
                alt="gold" width="32" height="32">
                <img v-else-if="user.testScore >=40 && user.testScore <=69"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/2nd-place-medal_1f948.png" 
                alt="silver" width="32" height="32">
                <img v-else-if="user.testScore >=10 && user.testScore <=39"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/3rd-place-medal_1f949.png" 
                alt="bronze" width="32" height="32">
               Test Points: {{ user.testScore.toFixed(0) }}
              </li>
      </ul>
    </div>
    <br>
    <td>
                <router-link
                  :to="{ name: 'meetingrequest', params: { id: toUser._id, 
                  emailIn: toUser.email, thisName: user.name,  thisEmail: user.email} }"
                  class="btn btn-primary"
                  >Request Meeting
                </router-link>
              </td>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: 0,
      toUser: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
    this.getProfile();
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    getUser() {
      axios
        .get(`http://localhost:3000/api/profileList/${this.id}`)
        .then((data) => (this.toUser = data.data));
    },
  },
};
</script>