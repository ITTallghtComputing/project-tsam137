<template>
    <div class="container">
        <form @submit.prevent="sendEmail">
          <label>Name</label>
          <input 
            type="text" 
            v-model="name"
            name="name"
            placeholder="Your Name"
          >
          <label>Language</label>
          <input 
            type="text" 
            v-model="language"
            name="language"
            placeholder="What Language are you teaching this person"
          >
          <label>Your Email</label>
          <input 
            type="email" 
            v-model="email"
            name="email"
            placeholder="Your Email"
            >
            <label>Recipients Email</label>
          <input 
            type="email" 
            v-model="toEmail"
            name="toEmail"
            placeholder="Their Email"
            >
          <label>Date/Time</label>
          <input 
            type="date" 
            v-model="date"
            name="date"
          >
          <input 
            type="time" 
            v-model="time"
            name="time"
          >
          <br>
          <br>
          <label>Timezone</label>
          <input 
            type="text" 
            v-model="timezone"
            name="timezone"
            placeholder="What is your timezone"
          >
          <br>
          <br>
          <input type="submit" value="Send">
        </form>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: 'ContactUs',
  data() {
    return {
      name: '',
      language: '',
      email: '',
      toEmail: '',
      date: '',
      time: '',
      timezone: ''
      
    }
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm('welearn', 'template_zhrwwhb', e.target, 'user_XsK6yvrBzsbxesJ0vxJmQ', {
          name: this.name,
          email: this.email,
          language: this.language,
          toEmail: this.toEmail,
          date: this.date,
          time: this.time,
          timezone: this.timezone
        })
        console.log('it works!!!')

      } catch (error) {
          console.log({error})
      }
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
      this.toEmail = ''
      this.language = ''
      this.date = ''
      this.time = ''
      this.timezone = ''
    },
  }
}
</script>

<style scoped>
* {box-sizing: border-box;}

label {
  float: left;
}
input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #b8c7b9;
}

.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}
</style>