<template>
  <div id="list">
    <input
      class="col-md-5 justify-content-right"
      type="text"
      v-model="search"
      placeholder="Search by the Language you want to learn"
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
        <!-- <table class="table table-striped">
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
        </table> -->

        <div class="col-md-6 col-sm-12 col-lg-6 mt-2 mb-2" v-for="user in filteredUsers" :key="user._id">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title" v-if="user.premium">
                              <img 
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/crown_1f451.png" 
                alt="Kitten" width="25" height="25" style="position: relative; top: -5px;">
                              {{user.name}}</h5>
                            <h5 class="card-title" v-else-if="!user.premium">{{ user.name }}</h5>
                            
                            <img class="card-img-top smallimg"
                             src="https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png" 
                             alt="Card image cap"
                             >
                            <br>
                            <p class="card-text">Mother Tongue: {{user.motherTongue}}</p>
                            <p class="card-text">
                               Desired Language: {{user.desiredLanguage}}
                            </p>
                            <p class="card-text">
                               Meetings Completed: {{user.meetingCount}}
                            </p>
                            <p class="card-text">
                               Meeting Rating: {{ user.meetingRating.toFixed(0) }}/100
                            </p>
                            <router-link
                  :to="{ name: 'userProfile', params: { id: user._id } }"
                  class="btn btn-primary"
                  >👀
                </router-link>
                <router-link
                  :to="{ name: '', params: { id: user._id } }"
                  class="btn btn-success"
                  >💬
                </router-link>
                        </div>
                    </div>
                </div>
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

.card-img-top {
    width: 100px;
    height: 100px;

    object-fit: cover;
}
</style>
