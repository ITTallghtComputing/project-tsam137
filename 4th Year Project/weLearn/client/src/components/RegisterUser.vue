<template>
  <div id="create">
    <div class="row justify-content-center">
        <div class="col-md-7">
            <h3 class="text-center">Register User</h3>
            <br>
            <form @submit.prevent="addUser">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="users.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="users.email" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="users.password" required>
                </div>

                <div class="form-group">
                    <label>Mother Tongue</label>
                    <input type="text" class="form-control" v-model="users.motherTongue" required>
                </div>

                <div class="form-group">
                    <label>Desired Language</label>
                    <input type="text" class="form-control" v-model="users.desiredLanguage" required>
                </div>

                <div class="form-group">
                    <label>Meeting Platform</label>
                    <input type="text" class="form-control" v-model="users.meetingPlatform" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Add User</button>
                </div>
            </form>
        </div>
    </div>

      <!-- <div class="control">
        <a class="button is-info" @click="addUser" :disabled="!name">Add</a>
      </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserList",
  data() {
    return {
      users: [],
      name: "",
      email: "",
      password: "",
      motherTongue: "",
      desiredLanguage: "",
      meetingPlatform: "",
      editedName: "",
      editedEmail: "",
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("api/profileList/");
    this.users = response.data;
  },
  methods: {

    async addUser() {
      const response = await axios.post("api/profileList/", {
        name: this.users.name,
        email: this.users.email,
        password: this.users.password, 
        motherTongue: this.users.motherTongue,
        desiredLanguage: this.users.desiredLanguage,
        meetingPlatform: this.users.meetingPlatform
      });
      this.users.push(response.data);
      this.name = "";
      this.email = "";
      this.password = "";
      this.users.motherTongue = "",
      this.users.desiredLanguage = "",
      this.users.meetingPlatform = ""
    },

    async updateUser(user, i) {
      const response = await axios.put("api/profileList/" + user._id, {
        name: this.editedName,
        email: this.editedEmail
      });
      this.users[i] = response.data;
      this.unselect();
    }
  }
};
</script>

<style>
.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}

.label {
    display: inline-block;
    margin-bottom: .5rem;
}
</style>
