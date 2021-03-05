<template>
 <div class="container">
    <form @submit.prevent="editMeeting">
      <label>Name</label>
      <input
        type="text"
        v-model="name"
        name="name"
        placeholder="Your Name"
      />
      <label>Language</label>
      <input
        type="text"
        v-model="motherTongue"
        name="motherTongue"
        placeholder="What Language are you teaching this person"
      />
      <label>Your Email</label>
      <input
        type="email"
        v-model="email"
        name="email"
        placeholder="Your Email"
      />
      <label>Recipients Email</label>
      <input
        type="email"
        v-model="toEmail"
        name="toEmail"
        placeholder="Their Email"
      />
      <label>Date/Time</label>
      <input type="date" v-model="date" name="date" />
      <input type="time" v-model="time" name="time" />
      <br />
      <br />
      <label>Timezone</label>
      <input
        type="text"
        v-model="timezone"
        name="timezone"
        placeholder="What is your timezone"
      />
      <br />
      <div v-if="this.dateError" class="alert alert-danger">
        <p>Date & Time already booked.</p>
          <p>Please select different Date and or Time</p></div>
      <br />

      <label>Meeting Link</label>
            <input type="text"
            class="form-control"
             v-model="meetingLink"  />

            <label>User ID</label>
            <input type="text"
            class="form-control"
            placeholder=""
             v-model="userID"  />

            <label>To User ID</label>
            <input type="text"
            placeholder=""
            class="form-control"
             v-model="toUserID" />

      <input type="submit" value="Update" />
    </form>
    </div>
</template>
<script>
import axios from "axios";
// import emailjs from "emailjs-com";
export default {
  data() {
    return {
      id: 0,
      meeting: {},
      newName: "",
      newMotherTongue: "",
      newEmail: "",
      newToEmail: "",
      newDate: "",
      newTime: "",
      newTimezone: "",
      name: "",
      motherTongue: "",
      email: "",
      toEmail: "",
      date: "",
      time: "",
      timezone: "",
      newMeetinglink: "https://meet.google.com/xze-juie-xwr",
    };
  },
  created() {
    this.id = "60315c0e74dbf09480469802";
    this.getMeeting();
  },
  methods: {
    editMeeting() {
      let meetingsData = {
        name: this.name,
        email: this.email,
        motherTongue: this.motherTongue,
        toEmail: this.toEmail,
        date: this.date,
        time: this.time,
        timezone: this.timezone,
        meetingLink: this.meetingLink,
        userID: this.userID,
        toUserID: this.toUserID,
      };
      axios.post(`http://localhost:3000/api/meetings`, meetingsData);
      console.log(this.meetingsData);
      // this.newName = meetingsData.name;
      // this.newMotherTongue = meetingsData.email;
      // this.newEmail = meetingsData.motherTongue;
      // this.newToEmail = meetingsData.toEmail;
      // this.newDate = meetingsData.date;
      // this.newTime = meetingsData.time;
      // this.newTimezone = meetingsData.timezone;
      // this.newMeetinglink = meetingsData.meetingLink;
      console.log(this.newToEmail);
      // try {
      //   emailjs.send("welearn", "template_gn4ll04", e.target, 'user_XsK6yvrBzsbxesJ0vxJmQ', {
      //     name: this.meeting.name,
      //     date: this.meeting.date,
      //     time: this.meeting.time,
      //     timezone: this.meeting.timezone,
      //     toEmail: this.meeting.toEmail,
      //     email: this.meeting.email,
      //   });
      // } catch (error) {
      //   console.log({ error });
      // }
      // this.$router.push("/usermeetings");
    },
    getMeeting() {
      axios
        .get(`http://localhost:3000/api/meetings/${this.id}`)
        .then((data) => (this.meeting = data.data));
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

label {
  float: left;
}
input[type="text"],
[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.alert {
  border-radius: 0px;
}
.alert-danger {
  background: red;
  color: #fff;
}

input[type="submit"]:hover {
  background-color: #b8c7b9;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}
</style>