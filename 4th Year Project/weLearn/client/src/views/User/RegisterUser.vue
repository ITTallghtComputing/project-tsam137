<template>
  <div id="create">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <h3 class="text-center">Register Here</h3>
        <br />
        <form @submit.prevent="addUser">
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              class="form-control"
              v-model="users.name"
              required
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              v-model="users.email"
              required
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="users.password"
              required
            />
          </div>

          <div class="form-group">
            <label>Mother Tongue</label>
            <input
              type="text"
              class="form-control"
              v-model="users.motherTongue"
              required
            />
          </div>

          <div class="form-group">
            <label>Desired Language</label>
            <input
              type="text"
              class="form-control"
              v-model="users.desiredLanguage"
              required
            />
          </div>


          <div class="form-group">
            <button class="btn btn-primary btn-block">Register</button>
          </div>
          {{ error }}
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterUser",
  data() {
    return {
      users: [],
      name: "",
      email: "",
      password: "",
      motherTongue: "",
      desiredLanguage: "",
      error: "",
      editedName: "",
      editedEmail: "",
      selected: {},

      nameIn: "Admin",
      motherTongueIn: "English",
      emailIn: "tobasamuel137@gmail.com",
      toEmail: "admin@welearn.com",
      date: "12/03/2021",
      time: "15:00",
      timezone: "GMT",
      meet: [],
      meetingLink: "https://meet.google.com/xze-juie-xwr",
      userID: "5fc3fc1194b1a78ea033d63a",
      toUserID: "602ff3cf264bde4cc0e1ac76",
    };
  },
  async mounted() {
    const response = await axios.get("/api/profileList/");
    this.users = response.data;
    const meetingsResponse = await axios.get("/api/meetings/");
    this.meet = meetingsResponse.data;
  },
  methods: {
    async addUser() {
      const response = await axios.post("/api/profileList/", {
        name: this.users.name,
        email: this.users.email,
        password: this.users.password,
        motherTongue: this.users.motherTongue,
        desiredLanguage: this.users.desiredLanguage,
      });
      this.users.push(response.data);
      this.name = "";
      this.email = "";
      this.password = "";
      (this.users.motherTongue = ""),
        (this.users.desiredLanguage = ""),
      this.$router.push("/");
    },

    async pushMeeting() {
      console.log(this.meet)
      const response = await axios.post("/api/meetings/", {
        name: this.meet.name,
        email: this.meet.email,
        toEmail: this.meet.toEmail,
        motherTongue: this.meet.motherTongue,
        date: this.meet.date,
        time: this.meet.time,
        timezone: this.meet.timezone,
        meetingLink: this.meet.meetingLink,
        userID: this.meet.userID,
        toUserID: this.meet.toUserID,
      });
      this.meet.push(response.data);
      console.log(this.meet[0])
      console.log(this.meet)
    },
  },
};
</script>

<style>
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
