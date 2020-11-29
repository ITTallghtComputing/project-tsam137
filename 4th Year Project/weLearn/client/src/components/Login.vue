<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <br>
            <h3 class="text-center">Enter Details</h3>
            <br>
            <form @submit.prevent="login">

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="users.email" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="users.password" required>
                </div>
                <br>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Login</button>
                {{ error }}
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
      users: [],
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
      axios.post('http://localhost:3000/login', {
        email: this.users.email,
        password: this.users.password
      })
        .then(res => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            this.$router.push('/');
          }
        }, err => {
          console.log(err.response);
          console.log(this.users.email, this.users.password);
          this.error = err.response.data.error
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