<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Edit User</h3>
            <form @submit.prevent="updateUser()">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="email" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="password" required>
                </div>

                <div class="form-group">
                    <label>Mother Tongue</label>
                    <input type="text" class="form-control" v-model="motherTongue" required>
                </div>

                <div class="form-group">
                    <label>Desired Language</label>
                    <input type="text" class="form-control" v-model="desiredLanguage" required>
                </div>

                <div class="form-group">
                    <label>Meeting Platform</label>
                    <input type="text" class="form-control" id="meetingPlatform" v-model="meetingPlatform" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Edit User</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
name: "UserEdit",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      motherTongue: "",
      desiredLanguage: "",
      meetingPlatform: ""
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/api/profileList/"+ this.user._id);
    this.user = response.data;
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    async updateUser() {
      const response = await axios.put("http://localhost:3000/api/profileList/" + this.user._id, {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        motherTongue: this.user.motherTongue,
        desiredLanguage: this.user.desiredLanguage,
        meetingPlatform: this.user.meetingPlatform

      });
      this.user.put(response.data);
      this.name = "";
      this.email = "";
      this.password = "";
      this.motherTongue = "";
      this.desiredLanguage = "";
      this.meetingPlatform = "";
      this.$router.push('/list');
    }
  }
};
</script>