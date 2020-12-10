<template>
  <div>
    <h2 v-if="user._id != '5fcd335aba244d058e44c002'">Welcome {{user.name}} 👨‍🎓</h2>
    <h2 v-else-if="user._id == '5fcd335aba244d058e44c002'">Welcome {{user.name}} 👨‍✈️</h2>
    <h5 v-if="user._id != '5fcd335aba244d058e44c002'">Ready to Learn?</h5>
    <h5 v-else-if="user._id == '5fcd335aba244d058e44c002'">Ready to Administrate?</h5>
    <br>
    <h2 v-if="user._id != '5fcd335aba244d058e44c002'">Profile</h2>
    <h2 v-else-if="user._id == '5fcd335aba244d058e44c002'">Admin Profile</h2>
    <br>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Name: {{ user.name }}</li>
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Mother Tongue: {{ user.motherTongue }}</li>
        <li class="list-group-item">Desired Language: {{ user.desiredLanguage }}</li>
        <li class="list-group-item">Meeting Platform: {{ user.meetingPlatform }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"])
  },
  created() {
    this.getProfile();
  }
};
</script>

<style>
.card{
  border-radius: 5px;
}
</style>
