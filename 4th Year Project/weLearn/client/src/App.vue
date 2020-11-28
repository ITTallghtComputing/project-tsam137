<template>
  <div id=app>
    <nav class="navbar navbar-dark bg-dark justify-content flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">weLearn</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/add">Add User</router-link>
          </li>
          
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li> -->

          <li class="nav-item">
            <router-link class="nav-link" to="/">View Users</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#app img{
  height: 50vh;
  width: 50vh;
}


.navbar-dark .navbar-nav .nav-link {
    background: transparent;
    color: rgb(255, 255, 255);
}

</style>