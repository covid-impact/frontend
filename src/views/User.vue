<template>
    <section class="user">
    <h1 class="main--heading"> {{ name }} Stock Favorites</h1>
    <br/>
    
    <li v-for="x in users" :key="x.id">
        {{x.favorites}}
    </li> 

    </section>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
import db from '../main.js';

export default {
    data() {
        return {
            name: firebase.auth().currentUser,
            users: [],
            email: "",
            favorite: ""
        };
    },
    created () {
        db.collection('users').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {    
                console.log(doc.data());
                console.log(doc.id);
                const data = {
                    'name': doc.data().name,
                    'favorites': doc.data().favorites   
                }
                this.users.push(data);
            })
        })
    },
    methods: {
        checkAuthStatus: function () {
            return new Promise((resolve, reject) => {
                try {
                    firebase.auth().onAuthStateChanged((user) => resolve(user));
                } catch (err) {
                    reject(err);
                }
            });
        },
    },
    async mounted() {
        let user = await this.checkAuthStatus();
        if (user) {
            this.name = user.email;
        } else {
            this.name = "No user logged in";
        }
    },
};
</script>

<style>
table.GeneratedTable {
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  color: #000000;
}

table.GeneratedTable td, table.GeneratedTable th {
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  padding: 3px;
}

table.GeneratedTable thead {
  background-color: #ffcc00;
}

.form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
}

.input {
    font-size: 1.2em;
    background: var(--background-card);
    border: 2px solid var(--text);
    padding: 10px;
    width: 100%;
    color: var(--text);
    border-radius: 10px;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.label {
    display: inline-block;
    font-size: 1.2em;
    margin: 10px 0;
}

.submit--btn {
    font-size: 1.2em;
    padding: 10px;
    background: var(--background-card);
    border: 2px solid var(--text);
    border-radius: 10px;
    color: var(--text);
    margin: 10px 0;
    margin-left: auto;
    cursor: pointer;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.form--element {
    width: 100%;
}

@media not all and (hover: none) {
    .input:hover {
        box-shadow: none;
        transform: translateY(2px);
    }

    .submit--btn:hover {
        box-shadow: none;
        transform: translateY(2px);
    }
}
</style>