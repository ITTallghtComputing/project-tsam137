<template>
  <div id="list">
    <input
      class="col-md-5 justify-content-right"
      type="text"
      v-model="search"
      placeholder="Search by Mother Tongue"
    />
     <!-- <select name="searchOption" id="search">
    <option value="name">Name</option>
    <option value="meetingCount">Meeting Count</option>
    <option value="desiredLanguage">Desired Language</option>
    <option value="email">Email</option>
  </select> -->
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
              <th>Meetings Completed</th>
              <th>Meeting Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user._id">
              <td v-if="user.premium">👑 {{ user.name }}</td>
              <td v-else-if="!user.premium">{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.motherTongue }}</td>
              <td>{{ user.desiredLanguage }}</td>
              <td>{{ user.meetingCount }}</td>
              <td>{{ user.meetingRating.toFixed(0) }}/100</td>

              <td>
                <router-link
                  :to="{ name: 'userProfile', params: { id: user._id } }"
                  class="btn btn-primary"
                  >👀
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
      searchOption: ""
    };
  },
  async mounted() {
    
    const response = await axios.get("api/profileList/");
    this.users = response.data;

  },
  computed: {
    

    filteredUsers: function () {
      return this.users.filter((user) => {
        if(this.searchOption == ""){
          return user.motherTongue.toLowerCase().match(this.search.toLowerCase());
        }
        else if(this.searchOption == "meetingCount"){
          return user.meetingCount.toLowerCase().match(this.search.toLowerCase());
        }
        else{
          return user.motherTongue.toLowerCase().match(this.search.toLowerCase());
        }
        
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
