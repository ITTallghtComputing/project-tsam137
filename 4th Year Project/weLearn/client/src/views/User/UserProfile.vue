<template>
  <div>
    <h4 class="text-center mt-20">
      <!-- <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small> -->
    </h4>

    <h2 v-if="user.premium">👑 <span>{{ user.name }}</span>'s Premium Profile</h2>
    <h2 v-else-if="!user.premium"><span>{{ user.name }}</span>'s Profile</h2>
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
          Premium Account: {{ user.premium }}
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
    <td>
                <router-link
                  :to="{ name: 'meetingrequest', params: { id: user._id, emailIn: user.email } }"
                  class="btn btn-primary"
                  >Request Meeting
                </router-link>
              </td>
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
    getUser() {
      axios
        .get(`http://localhost:3000/api/profileList/${this.id}`)
        .then((data) => (this.user = data.data));
    },
  },
};
</script>