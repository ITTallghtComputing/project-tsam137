<template>
<div id="container">
  <div id="list" v-if="user._id == '5fcd335aba244d058e44c002'">
    <input
      class="col-md-5 justify-content-right"
      type="text"
      v-model="search"
      placeholder="Search by Name"
    />
    <br />
    <hr />
    <br />
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mother Tongue</th>
              <th>Desired Language</th>
              <th>Premium</th>
              <th>Meetings Completed</th>
              <th>Meetings Rating</th>
              <th>Test Points</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user._id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.motherTongue }}</td>
              <td>{{ user.desiredLanguage }}</td>
              <td>{{ user.premium }}</td>
              <td>{{ user.meetingCount }}</td>
              <td>{{ user.meetingRating.toFixed(0) }}/100</td>
              <td>{{ user.testScore.toFixed(0) }}</td>
              

              <td>
                <router-link
                  :to="{ name: 'edit', params: { id: user._id } }"
                  class="btn btn-primary"
                  >Edit
                </router-link>
              </td>

              <td>
                <button
                  @click.prevent="removeUser(user, user.key)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    
  <div id="notAdmin" v-if="user._id != '5fcd335aba244d058e44c002'">
    <h1>You are not an Admin.</h1>
  </div>
</div>
</div>
  
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  
  name: "Admin",
  data() {
    return {
      users: [],
      name: "",
      email: "",
      motherTongue: "",
      desiredLanguage: "",
      meetingPlatform: "",
      premium: "",
      meetingCount: "",
      meetingRating: "",
      search: "",

    };
  },
  async mounted() {
    const response = await axios.get("/api/profileList/");
    this.users = response.data;
    this.getProfile();
  },
  computed: {
    ...mapGetters(["user"]),
    filteredUsers: function () {
      return this.users.filter((user) => {
        return user.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
created() {
    this.getProfile();
  },
  methods: {
    ...mapActions(["getProfile"]),
    async removeUser(user) {
      if (confirm("Are you sure you want to delete " + user.name)) {
        await axios.delete("/api/profileList/" + user._id);
        this.users.splice(1);
        this.$router.push("/admin");
      }
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

.searchBox {
  width: 40%;
}
</style>
