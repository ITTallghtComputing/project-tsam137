<template>
  <div>
    <h4 class="text-center mt-20">
      <!-- <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small> -->
    </h4>

    <h2 v-if="toUser.premium">👑 <span>{{ toUser.name }}</span>'s Premium Profile</h2>
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