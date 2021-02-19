<template>
  <div>
    <h2>
      Buffer Room
    </h2>
    <br />
    <h4>Ready to enter Chatroom?  {{ user.name }}</h4>
    <br />
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Name: {{ user.name }}</li>
      </ul>
      <ul>
        <td>
                <router-link
                  :to="{ name: 'chatroom', params: { name: user.name, id: user._id } }"
                  class="btn btn-primary"
                  >Yes
                </router-link>
              </td>
      </ul>
      
    <ul>
      <td>
                <router-link
                  :to="{ name: 'list' }"
                  class="btn btn-primary"
                  >No
                </router-link>
              </td>
    </ul>
              
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
  },
  created() {
    this.getProfile();
  },
};
</script>

<style>
.card {
  border-radius: 5px;
}
</style>
