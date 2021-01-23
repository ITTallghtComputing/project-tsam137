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
      👑 Premium Profile
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
          Meeting Platform: {{ user.meetingPlatform }}
        </li>
        <li class="list-group-item">
          Premium Account: {{ user.premium }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
  },
  created() {
    this.getProfile();
  },
};
</script>
<style>
.card {
  border-radius: 5px;
}
</style>
