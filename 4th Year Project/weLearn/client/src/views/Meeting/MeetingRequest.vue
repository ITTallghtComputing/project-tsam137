<template>
  <div class="container">
    <form @submit.prevent="sendEmail">
      <label>Name</label>
      <input
        type="text"
        v-model="user.name"
        name="name"
        placeholder="Your Name"
      />
      <label>Language</label>
      <input
        type="text"
        v-model="user.motherTongue"
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
      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import axios from "axios";

export default {
  name: "ContactForm",
  data() {
    return {
      id: 0,
      emailIn: "",
      user: {},
      meetings: [],
      name: "",
      motherTongue: "",
      email: "",
      toEmail: "",
      date: "",
      time: "",
      timezone: "",
      meetinglink: "https://meet.google.com/xze-juie-xwr",
      dateError: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.email = this.$route.params.emailIn;
    this.emailIn = this.$route.params.emailIn;
    this.getUser();
  },
  async mounted() {
    const response = await axios.get("api/meetings/");
    this.meetings = response.data;
  },
  methods: {
    sendEmail(e) {
      for (var i = 0; i < this.meetings.length; i++) {
        if (this.email == this.meetings[i].email || 
        this.emailIn == this.meetings[i].email || 
        this.toEmail == this.meetings[i].toEmail) {
          var dateSubString = this.meetings[i].date.substring(0, 10);
          if (dateSubString == this.date && this.meetings[i].time == this.time) {
            this.dateError = true;
          }
          else{
            this.dateError = false;
            
         try {
        emailjs.sendForm('welearn', 'template_zhrwwhb', e.target, 'user_XsK6yvrBzsbxesJ0vxJmQ', {
          name: this.user.name,
          email: this.user.email,
          motherTongue: this.user.motherTongue,
          toEmail: this.toEmail,
          date: this.date,
          time: this.time,
          timezone: this.timezone,
          meetinglink: "https://meet.google.com/xze-juie-xwr"
        });
        let meetingsData = {

          name: this.meetings.name,
          email: this.meetings.email,
          motherTongue: this.meetings.motherTongue,
          toEmail: this.meetings.toEmail,
          date: this.meetings.date,
          time: this.meetings.time,
          timezone: this.meetings.timezone,
          meetinglink: this.meetings.meetingLink,
          userID: this.meetings.userID,
          toUserID: this.meetings.toUserID,

        };
       axios.post("http://localhost:3000/api/meetings/", meetingsData);
      // this.meetings.push(response.data);
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
      this.toEmail = ''
      this.motherTongue = ''
      this.date = ''
      this.time = ''
      this.timezone = ''
        console.log('it works!!!')

      } catch (error) {
          console.log({error})
          console.log(this.meetingsData)
      }
          }
        }
      }
      
    },
    getUser() {
      axios
        .get(`http://localhost:3000/api/profileList/${this.id}`)
        .then((data) => (this.user = data.data));
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