<template>
<div>
<div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Name: {{ user.name }}</li>
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Mother Tongue: {{ user.motherTongue }}</li>
        <li class="list-group-item">
          Desired Language: {{ user.desiredLanguage }}
        </li>
        <li class="list-group-item">
          Meeting Platform: {{ user.meetingPlatform }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
name: "UserProfile",
computed: mapGetters(["user"]),

async mounted() {
    const response = await axios.get(`api/profileList/${this.id}`);
    this.user = response.data;
  },
  methods: {
    getUser() {
      axios
        .get(`http://localhost:3000/api/profileList/${this.id}`)
        .then((data) => (this.user = data.data));
    }
  },
};
</script>

<style>
.card {
  border-radius: 5px;
}
</style>