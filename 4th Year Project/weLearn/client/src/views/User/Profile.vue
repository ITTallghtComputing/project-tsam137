<template>
  <div>
    <h2 v-if="user._id != '5fcd335aba244d058e44c002'">
      Welcome {{ user.name }} 👨‍🎓
    </h2>
    <h2 v-else-if="user._id == '5fcd335aba244d058e44c002'">
      Welcome {{ user.name }} 👨‍✈️
    </h2>
    <br>
    <h3 v-if="!(user.premium)">
      It seems you are not a Premium user {{ user.name }} 
    </h3>
    <p v-if="!(user.premium)">
      Click on Premium in your navigation bar to purchase Premium for only €9.98 and get loads of cool features.
    </p>
    <br>
    <br />
    <div v-if="user._id != '5fcd335aba244d058e44c002'">
    <h2 v-if="user.premium">
      <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/crown_1f451.png"
                  alt="Kitten"
                  width="50"
                  height="50"
                  style="position: relative; top: -5px"
                /> 
       Premium Profile
    </h2>
    <h2 v-else-if="!user.premium">
      Regular Profile
    </h2>
    </div>
    <h2 v-else-if="user._id == '5fcd335aba244d058e44c002'">Admin Profile</h2>
    <br />
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Name: {{ user.name }}</li>
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Mother Tongue: {{ user.motherTongue }}</li>
        <li class="list-group-item">
          Desired Language: {{ user.desiredLanguage }}
        </li>
        <li class="list-group-item">
          Meeting Count: {{ user.meetingCount }}
        </li>
        <li class="list-group-item">
          Meeting Rating: {{ user.meetingRating.toFixed(0) }}/100
        </li>
      </ul>
    </div>
    <br>
    
      <!-- userID: meetings.userID, toUserID: meetings.toUserID -->
                <router-link
                  :to="{ name: 'usermeetings', params: { id: user._id, meetingCount: user.meetingCount, } }" 
                  class="btn btn-primary"
                  >My Meetings
                </router-link>
              
              
            
 &nbsp;&nbsp;&nbsp;&nbsp;
                <router-link
                  :to="{ name: 'testLanguage'}" 
                  class="btn btn-success"
                  >Language Quiz
                </router-link>
              
              <br>
  <br>
  <br>
  <br>
  </div>
  
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      meetings: {},
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
  },
  created() {
    this.getProfile();
  },
  async mounted() {
    const response = await axios.get("api/meetings/");
    this.meetings = response.data;
  },
};
</script>
<style>
.card {
  border-radius: 5px;
}
</style>
