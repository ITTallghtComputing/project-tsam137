<template>
	<div id="app">
		<div id="container">
			<div class="header">
			<h1>Chatroom</h1>
			<p class="username">Name: {{ user.name }}</p>
			<p class="online">Online: {{ userss.length }}</p>
			
		</div>
		<div v-if="user.premium">
			<ChatroomApp v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
		</div>
		<div v-else-if="!user.premium">
			<p class="count">Messages left: {{ count }} </p>
			<p>Buy Premium for Unlimited Messages</p>
			<div class="messageBox" v-if="count>0">
			
			<ChatroomApp v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
		</div>
		</div>
		
		</div>
		
	</div>
</template>

<script>
import io from 'socket.io-client';
import axios from "axios";
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
			userss: [],
			name: "Anonymous",
			id: "0",
			count: 10,
			userData: {}
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
			this.count = this.count-1
		},
		
	},
	mounted: function () {
		console.log(this.id),
		this.name = this.$route.params.name;
		this.joinServer();
		const response =  axios.get(`api/profileList/${this.id}`);
        this.userData = response.data;
		console.log(this.userData);
		this.username = this.name
	},
	created() {
	this.name = this.$route.params.name;
	this.id = this.$route.params.id;
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