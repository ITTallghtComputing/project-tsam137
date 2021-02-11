<template>
  <div>
    <h4 class="text-center mt-20">
      <!-- <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Users </button>
         </small> -->
    </h4>
    <div class="col-md-7 form-wrapper">
      <h2>Edit Meeting</h2>
      <form id="create-post-form" @submit.prevent="editMeeting">
          <div class="form-group col-md-12">
          <label for="title">Name</label>
          <input
            type="text"
            id="name"
            v-model="meeting.name"
            name="title"
            class="form-control"
            placeholder="Your Name"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Their Email </label>
          <input
            type="email"
            id="toEmail"
            v-model="meeting.toEmail"
            name="title"
            class="form-control"
            placeholder="Their Email"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Language your Teaching </label>
          <input
            type="text"
            id="motherTongue"
            v-model="meeting.motherTongue"
            name="title"
            class="form-control"
            placeholder="Enter Language your Teaching"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Date</label>
          <input
            type="date"
            id="date"
            v-model="meeting.date"
            name="date"
            class="form-control"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Time</label>
          <input
            type="time"
            id="time"
            v-model="meeting.time"
            name="time"
            class="form-control"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Timezone</label>
          <input
            type="text"
            id="timezone"
            v-model="meeting.timezone"
            name="timezone"
            class="form-control"
            placeholder="Enter your timezone"
          />
        </div>
        
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-primary" value="Send" type="submit">Edit Meeting</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import emailjs from 'emailjs-com';
export default {
  data() {
    return {
      id: 0,
      meeting: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMeeting();
    console.log(this.meeting)
  },
  methods: {
    editMeeting(e) {
      let meetingsData = {
        
          name: this.meeting.name,
          email: this.meeting.email,
          motherTongue: this.meeting.motherTongue,
          toEmail: this.meeting.toEmail,
          date: this.meeting.date,
          time: this.meeting.time,
          timezone: this.meeting.timezone,
          meetinglink: this.meeting.meetingLink,
        };
      axios.put(`http://localhost:3000/api/meetings/${this.id}`, meetingsData);
    try {
        emailjs.sendForm('welearn', 'template_gn4ll04', e.target, 'user_XsK6yvrBzsbxesJ0vxJmQ', {
          name: this.meeting.name,
          email: this.meeting.email,
          motherTongue: this.meeting.motherTongue,
          toEmail: this.meeting.toEmail,
          date: this.meeting.date,
          time: this.meeting.time,
          timezone: this.meeting.timezone,
          meetinglink: this.meeting.meetinglink,
        });
        } catch (error) {
          console.log({error})
          console.log(this.meeting)
      }
      this.$router.push("/usermeetings");
    },
    getMeeting() {
      axios
        .get(`http://localhost:3000/api/meetings/${this.id}`)
        .then((data) => (this.meeting = data.data));
    },
    
  },
};
</script>