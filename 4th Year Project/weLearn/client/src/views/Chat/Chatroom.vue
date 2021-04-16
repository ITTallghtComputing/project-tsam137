<template>
	<div id="app">
		<div id="container">
		<div class="header">
			<h1>Global Chatroom</h1>

			<p>This Chatroom is for all.</p>
			<br>
			<p class="username">Username: {{ user.name }}</p>
			<p class="online">Online: {{ userss.length }}</p>
		</div>
		<ChatroomApp v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
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
			userss: []
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