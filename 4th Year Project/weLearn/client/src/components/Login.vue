<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <br>
            <h3 class="text-center">Enter Details</h3>
            <br>
            <form @submit.prevent="login">

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>
                <br>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
export default {
name: "Login",
  data() {
    return {
      user: [],
      email: "",
      password: "",
      error: ""
    };
  },
  async mounted() {
    const response = await axios.get("api/profileList/");
    this.users = response.data;
  },
  methods: {

      login() {
      let user = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/login', user)
        .then(res => {
          //if successfull
          console.log(res);
        })
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