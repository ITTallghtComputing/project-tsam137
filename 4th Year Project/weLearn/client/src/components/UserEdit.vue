<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update User</h3>
            <form @submit.prevent="updateUser(users, users.key)">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Update User</button>
                </div>
            </form>
        </div>

        <div class="notification" v-for="(user, i) in users" :key="user._id">
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
    </div>
    </div>
</template>

<script>
    import axios from "axios";
export default {

  data() {
    return {
      user: [],
      name: "",
      email: "",
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
        name: this.name,
        email: this.email
      });
      this.users.push(response.data);
      this.name = "";
      this.email = "";
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
        name: this.user.name,
        email: this.user.email
      });
      this.users[i] = response.data;
      this.unselect();
    }
  }
};
</script>