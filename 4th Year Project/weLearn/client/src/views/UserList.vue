<template>
  <div id="list">
    <input
      class="col-md-5 justify-content-right"
      type="text"
      v-model="search"
      placeholder="Search by Mother Tongue"
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
              <th>Meeting Platform</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user._id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.motherTongue }}</td>
              <td>{{ user.desiredLanguage }}</td>
              <td>{{ user.meetingPlatform }}</td>

              <td>
                <router-link
                  :to="{ name: 'userProfile', params: { id: user._id } }"
                  class="btn btn-primary fa fa-home"
                  >👀
                </router-link>
              </td>

              <td>
                <router-link
                  :to="{ name: '', params: { id: user._id } }"
                  class="btn btn-primary fa fa-home"
                  >🗨
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      motherTongue: "",
      desiredLanguage: "",
      meetingPlatform: "",
      search: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/profileList/");
    this.users = response.data;
  },
  computed: {
    filteredUsers: function () {
      return this.users.filter((user) => {
        return user.motherTongue.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },

  methods: {
    async removeUser(user, i) {
      await axios.delete("api/profileList/" + user._id);
      this.users.splice(i, 1);
      this.$router.push("/list");
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
