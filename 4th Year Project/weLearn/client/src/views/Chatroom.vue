<template>
	<div id="app">
		<div class="header">
			<h1>Chatroom</h1>
			<p class="username">Name: {{ user.name }}</p>
			<p class="online">Online: {{ userss.length }}</p>
		</div>
		<ChatroomApp v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
	</div>
</template>

<script>
import io from 'socket.io-client';
import ChatroomApp from './ChatroomApp';
import { mapActions, mapGetters } from "vuex";
export default {
	name: 'chatroom',
	components: {
		ChatroomApp
	},
	computed: mapGetters(["user"]),
	data: function () {
		return {
			username: "",
			socket: io("http://localhost:3000"),
			messages: [],
			userss: []
		}
	},
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
			this.socket.on('userLeft', users => {
				this.userss.splice(this.userss.indexOf(users), 1);
			});
			this.socket.on('msg', message => {
				this.messages.push(message);
			});
		},
		sendMessage: function (message) {
			this.socket.emit('msg', message);
		},
		
	},
	mounted: function () {
		this.username = prompt("What is your username?", "Anonymous");
		if (!this.username) {
			this.username = "Ready"
		}
		this.joinServer();
	},
	created() {
    this.getProfile();
  },
}
</script>

<style lang="scss">
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
	max-width: 768px;
	margin: 0 auto;
	padding: 15px;
	box-sizing: border-box;
}
</style>