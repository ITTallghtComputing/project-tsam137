<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mother Tongue</th>
                        <th>Desired Language</th>
                        <th>Meeting Platform</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.key">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.motherTongue }}</td>
                        <td>{{ user.desiredLanguage }}</td>
                        <td>{{ user.meetingPlatform }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: user.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Users: []
            }
        },
        created() {
            db.collection('users').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Users.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        motherTongue: doc.data().motherTongue,
                        desiredLanguage: doc.data().desiredLanguage,
                        meetingPlatform: doc.data().meetingPlatform
                    })
                });
            })
        },
        methods: {
            deleteUser(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("users").doc(id).delete().then(() => {
                    console.log("Document deleted!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>

