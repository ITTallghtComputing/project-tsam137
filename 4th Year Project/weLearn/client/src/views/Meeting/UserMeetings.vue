<template>
  <div>
      <h2>Meetings</h2>
      <br>
      <br>
      <div class="row">
      <div class="col-md-12">
        <table  class="table table-striped">
          <thead>
            <tr>
              <th>Their Email</th>
              <th>Language your Teaching</th>
              <th>Date</th>
              <th>Time</th>
              <th>Timezone</th>
              <th>Meeting Link</th>
              <th>Attended?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="meeting in meetings" :key="meeting.userID">
              <td v-if="(user._id == meeting.userID || 
              user._id == meeting.toUserID) && 
              user.email == meeting.email">{{ meeting.toEmail }}</td>

              <td v-else-if="(user._id == meeting.userID || 
              user._id == meeting.toUserID) &&
               user.email == meeting.toEmail">{{ meeting.email }}</td>
               
              <td v-if="user._id == meeting.userID || 
              user._id == meeting.toUserID">{{ meeting.motherTongue }}</td>

              <td v-if="user._id == meeting.userID || 
              user._id == meeting.toUserID">{{ meeting.date.substring(0, 10) }}</td>

              <td v-if="user._id == meeting.userID || 
              user._id == meeting.toUserID">{{ meeting.time }}</td>

              <td v-if="user._id == meeting.userID || 
              user._id == meeting.toUserID">{{ meeting.timezone }}</td>

             <td v-if="user._id == meeting.userID || 
              user._id == meeting.toUserID">
                <button
                  @click.prevent="enterMeeting(meeting.meetingLink)"
                  class="btn btn-primary"
                >
                  Enter Meeting
                </button>
              </td>
              
              <!-- <td>
                <router-link
                  :to="{ name: 'meetingEdit', params: { id: meeting._id } }"
                  class="btn btn-primary"
                  >Edit
                </router-link>
              </td> -->
              
              <td v-if="user._id == meeting.userID || 
              user._id == meeting.toUserID">
                <button style="border-radiue=5px"
                  @click.prevent="removeMeeting(meeting, meeting.userID)"
                  class="btn btn-success"
                >
                  Yes
                </button>
              
              </td>
              <td v-if="user._id == meeting.userID || 
              user._id == meeting.toUserID">
                <button
                  @click.prevent="deleteMeeting(meeting, meeting.key)"
                  class="btn btn-danger"
                >
                  No
                </button>
              </td>
            </tr>

            <!-- Second Row -->
            <tr v-for="meeting in meetings" :key="meeting.toUserID">
              <td v-if="(meeting._id != meeting._id &&
              user._id == meeting.toUserID) && 
              user.email == meeting.email">{{ meeting.toEmail }}</td>

              <td v-else-if="(meeting._id != meeting._id &&
              user._id == meeting.toUserID) &&
               user.email == meeting.toEmail">{{ meeting.email }}</td>
               
              <td v-if="meeting._id != meeting._id &&
              user._id == meeting.toUserID">{{ meeting.motherTongue }}</td>

              <td v-if="meeting._id != meeting._id &&
              user._id == meeting.toUserID">{{ meeting.date.substring(0, 10) }}</td>

              <td v-if="meeting._id != meeting._id &&
              user._id == meeting.toUserID">{{ meeting.time }}</td>

              <td v-if=" meeting._id != meeting._id &&
              user._id == meeting.toUserID">{{ meeting.timezone }}</td>

             <td v-if="meeting._id != meeting._id &&
              user._id == meeting.toUserID">
                <button
                  @click.prevent="enterMeeting(meeting.meetingLink)"
                  class="btn btn-primary"
                >
                  Enter Meeting
                </button>
              </td>
              
              <!-- <td>
                <router-link
                  :to="{ name: 'meetingEdit', params: { id: meeting._id } }"
                  class="btn btn-primary"
                  >Edit
                </router-link>
              </td> -->
              
              <td v-if="meeting._id != meeting._id &&
              user._id == meeting.toUserID">
                <button style="border-radiue=5px"
                  @click.prevent="removeMeeting(meeting, meeting.userID)"
                  class="btn btn-success"
                >
                  Yes
                </button>
              
              </td>
              <td v-if="meeting._id != meeting._id &&
              user._id == meeting.toUserID">
                <button
                  @click.prevent="deleteMeeting(meeting, meeting.key)"
                  class="btn btn-danger"
                >
                  No
                </button>
              </td>
              <!-- <p v-if="user._id != meeting.userID && user._id != meeting.toUserID">
             You have no meetings {{user.name}}.
             </p> -->
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
      id: 0,
      meetings: {},
      link: "a",
      count: 0
    }
  },
  computed: mapGetters(["user"]),
  created() {
    this.id = this.$route.params.id;
    this.count = this.$route.params.meetingCount;
    this.getProfile();
  },
  methods: {
    ...mapActions(["getProfile"]),
    enterMeeting(url){
        this.link = url;
        window.open(this.link, "_blank");   
    },
    
    async removeMeeting(meetings) {
      if (confirm("Has this meeting already occured " + this.user.name + "?")) {
        this.count+=1;
        let userData = {
        meetingCount: this.count,  
      };
      
      axios.put(`http://localhost:3000/api/profileList/${this.user._id}`, userData);
        await axios.delete("api/meetings/" + meetings._id);
        this.meetings.splice(1);
        this.$router.push({ name: "meetingRating", params: { userID: meetings.userID, toUserID: meetings.toUserID,
         meetingsCount: meetings.count } });
      }
    },
      async deleteMeeting(meeting) {
      if (confirm("Do you wish to delete this meeting " + this.user.name + "?")) {
        await axios.delete("api/meetings/" + meeting._id);
        this.meetings.splice(1);
        this.$router.push("/profile");
      }
    },
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
