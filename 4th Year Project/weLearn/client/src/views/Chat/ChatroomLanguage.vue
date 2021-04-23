<template>
	<div id="app">
		<div id="container">
		<div class="header">
			<h1>  {{user.desiredLanguage}} & {{user.motherTongue}} Chatroom</h1>

			<p>This Chatroom is for {{user.desiredLanguage}} and {{user.motherTongue}} speakers.</p>
			<br>
			<p class="username">Username: {{ user.name }}</p>
			<p class="online">Online: {{ userss.length }}</p>
			<p v-if="!user.premium" class="count">Message Count: {{ count }}</p>
		</div>
		<span id="premiumChat" v-if="user.premium">
			<ChatroomApp v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />

		</span>

		<span id="regularChatMessagesLeft" v-else-if="!user.premium && count>0">
			<ChatroomApp v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />

		</span>

		<span id="regularChatMessagesLeft" v-else-if="!user.premium && count==0">
			<p class="count">You have {{ count }} messages left, please purchase  
			
				<router-link :to="{ name: 'premium', params: { id: user._id, premium: user.premium } }" class="nav-link">
            <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/crown_1f451.png"
                  alt="Kitten"
                  width="25"
                  height="25"
                  style="position: relative; top: -5px"
                />
             Premium</router-link> to get unlimited messaging!</p>

		</span>
	</div>
	</div>
</template>

<script>
import io from 'socket.io-client';
import axios from "axios";
import ChatroomApp from './ChatroomApp';
import { mapActions, mapGetters } from "vuex";
export default {
	name: 'chatroomLanguage',
	components: {
		ChatroomApp
	},
	data: function () {
		return {
			username: "",
			socket: io('/' || "http://localhost:3000"),
			messages: [],
			userss: [],
			count: 10,
		}
	},
     computed: mapGetters(["user"]),
	methods: {
        ...mapActions(["getProfile"]),
		joinServer: function () {
			this.socket.on('loggedIn', data => {
				this.messages = data.messages;
				this.userss = data.userss;
				this.socket.emit('newuser', this.username);
			});
			this.listen();
		},
		listen: function () {
			this.socket.on('userOnline', users => {
				this.userss.push(users);
			});
			this.socket.on('userLeft', user => {
				this.userss.splice(this.userss.indexOf(user), 1);
			});
			this.socket.on('msg', message => {
				this.messages.push(message);
			});
		},
		sendMessage: function (message) {
			this.socket.emit('msg', message);
			this.count--;
		}
	},
mounted: function () {
		this.name = this.$route.params.name;
		this.joinServer();
		const response =  axios.get(`/api/profileList/${this.id}`);
        this.userData = response.data;
		this.username = this.name
	},
	created() {
	this.name = this.$route.params.name;
	this.id = this.$route.params.id;
    this.getProfile();
  },
}
</script>

<style lang="scss" scoped>
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 0;
	padding: 0;
}
#app {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	// max-width: 768px;
	margin: 0 auto;
	padding: 15px;
	box-sizing: border-box;
}

#container{
	max-width: 768px;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	// max-width: 768px;
	margin: 0 auto;
	padding: 15px;
	box-sizing: border-box;
}
</style>