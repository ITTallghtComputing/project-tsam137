<template>
  <div>
      <h2>Meetings</h2>
      <br>
      <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Their Email</th>
              <th>Language your Teaching</th>
              <th>Date</th>
              <th>Time</th>
              <th>Timezone</th>
              <th>Meeting Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="meeting in meetings" :key="meeting.email">
              <td>{{ meeting.toEmail }}</td>
              <td>{{ meeting.motherTongue }}</td>
              <td>{{ meeting.date.substring(2, 10) }}</td>
              <td>{{ meeting.time }}</td>
              <td>{{ meeting.timezone }}</td>
             <td>
                <button
                  @click.prevent="enterMeeting(meeting.meetingLink)"
                  class="btn btn-primary"
                >
                  Enter Meeting
                </button>
              </td>
              
              <td>
                <router-link
                  :to="{ name: 'meetingEdit', params: { id: meeting._id } }"
                  class="btn btn-primary"
                  >Edit
                </router-link>
              </td>

              <td>
                <button
                  @click.prevent="removeMeeting(meeting, meeting.email)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    
    <br>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      meetings: {},
      link: "a"
    }
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    enterMeeting(url){
        this.link = url;
        window.open(this.link, "_blank");   
    },
  },
  async removeMeeting(meetings) {
      if (confirm("Are you sure you want to delete this meeting " + meetings.name)) {
        await axios.delete("api/meeting/" + meetings._id);
        this.meetings.splice(1);
        this.$router.push("/usermeetings");
      }
    },
  created() {
    this.getProfile();
  },
  async mounted() {
    const response = await axios.get("api/meetings/");
    this.meetings = response.data;
  },
  
};
</script>
<style>
.card {
  border-radius: 5px;
}
</style>
