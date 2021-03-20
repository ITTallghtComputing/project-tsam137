<template>
  <div>
    <h2>
      Chatroom List
    </h2>
    <br />
    <h4>Which Chatroom would you like to enter?</h4>
    <br />
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Name: {{ user.name }}</li>
      </ul>
      <br>
      <ul>
        <td>
                <router-link
                  :to="{ name: 'chatroom', params: { name: user.name, id: user._id } }"
                  class="btn btn-primary"
                  ><img 
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/globe-showing-americas_1f30e.png" 
                alt="Kitten" width="25" height="25"> Global Chatroom
                </router-link>
              </td>
      </ul>
      
    <ul>
      <td v-if="user.motherTongue=='English' || user.desiredLanguage=='English'">
                <router-link
                  :to="{ name: 'chatroomLanguage', params: { name: user.name, id: user._id } }"
                  class="btn btn-primary"
                  >
                  <img 
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/flag-united-kingdom_1f1ec-1f1e7.png" 
                alt="Kitten" width="25" height="25"> English Chatroom
                </router-link>
              </td>
    </ul>
    <ul>
      <td v-if="user.motherTongue=='German' || user.desiredLanguage=='German'">
                <router-link
                  :to="{ name: 'chatroomLanguage', params: { name: user.name, id: user._id } }"
                  class="btn btn-primary"
                  ><img 
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/flag-germany_1f1e9-1f1ea.png" 
                alt="Kitten" width="25" height="25"> German Chatroom
                </router-link>
              </td>
    </ul>
    <ul>
      <td v-if="user.motherTongue=='Spanish' || user.desiredLanguage=='Spanish'">
                <router-link
                  :to="{ name: 'chatroomLanguage', params: { name: user.name, id: user._id } }"
                  class="btn btn-primary"
                  ><img 
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/flag-spain_1f1ea-1f1f8.png" 
                alt="Kitten" width="25" height="25"> Spanish Chatroom
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
