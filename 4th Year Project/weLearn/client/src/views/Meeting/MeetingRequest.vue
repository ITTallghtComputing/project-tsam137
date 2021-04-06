<template>
  <div class="container">
    <form @submit.prevent="sendEmail">
      <label>Name</label>
      <input type="text" v-model="name" name="name" placeholder="Your Name" />
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
        <p>Please select different Date and or Time</p>
      </div>
      <br />

      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
import axios from "axios";
export default {
  name: "MeetingRequest",
  data() {
    return {
      id: 0,
      emailIn: "",
      user: {},
      users: [],
      meetings: [],
      meet: [],
      name: "",
      motherTongue: "",
      email: "",
      toEmail: "",
      date: "",
      time: "",
      timezone: "",
      meetingLink: "https://meet.google.com/xze-juie-xwr",
      dateError: false,
      goAgain: true
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.thisName;
    this.email = this.$route.params.thisEmail;
    this.toEmail = this.$route.params.emailIn;
    this.goAgain= true
    // console.log(this.name);
    //           console.log(this.email);
    //           console.log(this.toEmail);
    this.getUser();
  },
  async mounted() {
    const response = await axios.get("api/meetings/");
    this.meetings = response.data;
    // const meetResponse = await axios.get(
    //   "api/meetings/60315c0e74dbf09480469802"
    // );
    // this.meet = meetResponse.data;
    const responseUser = await axios.get("api/profileList/");
    this.users = responseUser.data;
  },
  methods: {
    sendEmail(e) {
      
      for (var i = 0; i < this.users.length; i++) {
        while(this.goAgain == true){
        if (
          this.toEmail == this.meetings[i].email ||
          this.email == this.meetings[i].email ||
          this.email == this.meetings[i].toEmail ||
          this.toEmail == this.meetings[i].email ||
          this.users[i].email == this.meetings[i].email ||
          this.users[i].email == this.meetings[i].toEmail ||
          this.toEmail == this.meetings[1].email ||
          this.email == this.meetings[1].email ||
          this.email == this.meetings[1].toEmail ||
          this.toEmail == this.meetings[1].email ||
          this.users[i].email == this.meetings[1].email ||
          this.users[i].email == this.meetings[1].toEmail ||
          this.toEmail == this.meetings[2].email ||
          this.email == this.meetings[2].email ||
          this.email == this.meetings[2].toEmail ||
          this.toEmail == this.meetings[2].email ||
          this.users[i].email == this.meetings[2].email ||
          this.users[i].email == this.meetings[2].toEmail
        ) {
          var dateSubString = this.meetings[i].date.substring(0, 10);
          if (
            dateSubString == this.date &&
            this.meetings[i].time == this.time
          ) {
            this.dateError = true;
          } else {
            this.dateError = false;
            try {
              emailjs.sendForm(
                "welearn",
                "template_zhrwwhb",
                e.target,
                "user_XsK6yvrBzsbxesJ0vxJmQ",
                {
                  name: this.user.name,
                  email: this.user.email,
                  motherTongue: this.user.motherTongue,
                  toEmail: this.toEmail,
                  date: this.date,
                  time: this.time,
                  timezone: this.timezone,
                  meetinglink: "https://meet.google.com/xze-juie-xwr",
                }
              );

              for (var j = 0; j < this.users.length; j++) {
                if (this.users[j].email == this.toEmail) {
                  this.toUserID = this.users[j]._id;
                }
                if (this.users[j].email == this.email) {
                  this.userID = this.users[j]._id;
                }
              }
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
              let meetingsData2 = {
                name: this.name,
                email: this.email,
                motherTongue: this.motherTongue,
                toEmail: this.toEmail,
                date: this.date,
                time: this.time,
                timezone: this.timezone,
                meetingLink: this.meetingLink,
                userID: this.toUserID,
                toUserID: this.userID,
              };
              if(this.goAgain == true){
                axios.post(`http://localhost:3000/api/meetings`, meetingsData);
                axios.post(`http://localhost:3000/api/meetings`, meetingsData2);
                this.goAgain = false;
                this.$router.push("/profile");
              }
              
              console.log("it works!!!");
            } catch (error) {
              console.log({ error });

            }
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