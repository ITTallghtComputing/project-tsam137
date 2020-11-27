<template>
  <div id="list">
    <input class="col-md-5 justify-content-right" type="text" v-model="search" placeholder="Search by Mother Tongue"/>
    <br>
    <hr />
    <br>
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
                    <tr v-for="(user) in filteredUsers" :key="user._id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.motherTongue }}</td>
                        <td>{{ user.desiredLanguage }}</td>
                        <td>{{ user.meetingPlatform }}</td>
                     
                          <td>
                            <router-link :to="{name: 'edit', params: {id: user._id }}" class="btn btn-primary">Edit
                            </router-link>
                          </td>
               
                          <td>
                            <button @click.prevent="removeUser(user, user.key)" class="btn btn-danger">Delete</button>
                          </td>
              
                    </tr>
                </tbody>
            </table>
        </div>
    </div>




    <!-- <div class="notification" v-for="(user, i) in users" :key="user._id">
      <div class="columns">
        <input class="column input" v-if="isSelected(user)" v-model="editedName" />
        <input class="column input" v-if="isSelected(user)" v-model="editedEmail" />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1}}</span>
          {{ user.name }}
          {{ user.email }}
        </p>
        <div class="column is-narrow">
          <span
            class="icon has-text-primary"
            @click="isSelected(user) ?  unselect() : select(user)"
          >
            <i class="material-icons">{{isSelected(user) ? 'close': 'edit'}}</i>
          </span>

          <span
            class="icon has-text-info"
            @click="isSelected(user) ? updateUser(user, i) : removeUser(user, i)">
            <i class="material-icons">{{isSelected(user) ? 'save': 'delete'}}</i>
          </span>
        </div>
      </div>
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
      motherTongue: "",
      desiredLanguage: "",
      meetingPlatform: "",
      search: "",
      editedName: "",
      editedEmail: "",
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("api/profileList/");
    this.users = response.data;
  },
  computed: {
      filteredUsers: function(){
        return this.users.filter((user) =>  {
          return user.motherTongue.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },

  methods: {
  

    async addUser() {
      const response = await axios.post("api/profileList/", {
        name: this.users.name,
        email: this.users.email,
        motherTongue: this.users.motherTongue,
        desiredLanguage: this.users.desiredLanguage,
        meetingPlatform: this.users.meetingPlatform
      });
      this.users.push(response.data);
      this.name = "";
      this.email = "";
      this.motherTongue = "";
      this.desiredLanguage = "";
      this.meetingPlatform = "";
    },

    

    
    async removeUser(user, i) {
      await axios.delete("api/profileList/" + user._id);
      this.users.splice(i, 1);
    },
    select(user) {
      this.selected = user;
      this.editedName = user.name;
       this.editedEmail = user.email;
    },
    isSelected(user) {
      return user._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedName = "";
      this.editedEmail = "";
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

.searchBox{
  width: 40%;
}


</style>
