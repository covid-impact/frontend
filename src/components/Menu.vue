<template>
    <nav class="main--menu">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="menu--btn"
            viewBox="0 0 512 512"
            @click="menuToggle"
        >
            <title>Menu</title>
            <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="32"
                d="M80 160h352M80 256h352M80 352h352"
            />
        </svg>
        <ul class="menu">
            <router-link tag="li" class="menu--item" :to="{ name: 'home' }"
                >COVID-19
            </router-link>
            <ul class="sub--menu">
                <router-link tag="li" class="menu--item" :to="{ name: 'home' }"
                    >Country</router-link
                >
                <router-link
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'covidWorld' }"
                    >World</router-link
                >
                <router-link
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'covidCity' }"
                    >City</router-link
                >
            </ul>
            <router-link tag="li" class="menu--item" :to="{ name: 'finance' }"
                >Finance</router-link
            >
            <ul class="sub--menu">
                <router-link
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'finance' }"
                    >Country</router-link
                >
                <router-link
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'financeWorld' }"
                    >World</router-link
                >
                <router-link
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'financeCity' }"
                    >City</router-link
                >
            </ul>
            <router-link
                v-if="loggedIn"
                tag="li"
                class="menu--item"
                :to="{ name: 'login' }"
                >Login</router-link
            >
            <router-link
                v-if="loggedIn"
                tag="li"
                class="menu--item"
                :to="{ name: 'register' }"
                >Register</router-link
            >
            <router-link
                v-if="!loggedIn"
                tag="li"
                class="menu--item"
                :to="{ name: 'user' }"
                >Profile</router-link
            >
            <li v-if="!loggedIn" class="menu--item" v-on:click="signOut">
                Sign out
            </li>
            <li class="menu--item menu--item--theme">
                <div class="theme--switch">
                    <span>Light</span>
                    <div class="theme--switch--toggle">
                        <input
                            @click="themeSwitch"
                            v-model="themeDark"
                            id="check"
                            aria-label="Switch themes"
                            type="checkbox"
                            name="theme--switcher"
                            class="theme--check--switch"
                        />
                        <span class="theme--switch--ball"></span>
                    </div>
                    <span>Dark</span>
                </div>
            </li>
        </ul>
        <transition name="slide-fade" mode="out-in">
            <ul v-if="showMenu" class="menu menu--mobile">
                <router-link tag="li" class="menu--item" :to="{ name: 'home' }"
                    >COVID-19
                </router-link>
                <ul class="sub--menu">
                    <router-link
                        tag="li"
                        class="menu--item"
                        :to="{ name: 'home' }"
                        >Country</router-link
                    >
                    <router-link
                        tag="li"
                        class="menu--item"
                        :to="{ name: 'covidWorld' }"
                        >World</router-link
                    >
                    <router-link
                        tag="li"
                        class="menu--item"
                        :to="{ name: 'covidCity' }"
                        >City</router-link
                    >
                </ul>
                <router-link
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'finance' }"
                    >Finance</router-link
                >
                <ul class="sub--menu">
                    <router-link
                        tag="li"
                        class="menu--item"
                        :to="{ name: 'finance' }"
                        >Country</router-link
                    >
                    <router-link
                        tag="li"
                        class="menu--item"
                        :to="{ name: 'financeWorld' }"
                        >World</router-link
                    >
                    <router-link
                        tag="li"
                        class="menu--item"
                        :to="{ name: 'financeCity' }"
                        >City</router-link
                    >
                </ul>
                <router-link
                    v-if="loggedIn"
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'login' }"
                    >Login</router-link
                >
                <router-link
                    v-if="loggedIn"
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'register' }"
                    >Register</router-link
                >
                <router-link
                    v-if="!loggedIn"
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'user' }"
                    >User</router-link
                >
                <li v-if="!loggedIn" class="menu--item" v-on:click="signOut">
                    Sign out
                </li>
                <li class="menu--item menu--item--theme">
                    <div class="theme--switch">
                        <span>Light</span>
                        <div class="theme--switch--toggle">
                            <input
                                @click="themeSwitch"
                                v-model="themeDark"
                                id="check"
                                aria-label="Switch themes"
                                type="checkbox"
                                name="theme--switcher"
                                class="theme--check--switch"
                            />
                            <span class="theme--switch--ball"></span>
                        </div>
                        <span>Dark</span>
                    </div>
                </li>
            </ul>
        </transition>
    </nav>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";

// @group Components
/**
 * Menu for the page
 */
export default {
    mounted() {
        this.setupFirebase();
    },
    data: function () {
        return {
            showMenu: false,
            themeDark: false,
            loggedIn: false,
        };
    },
    methods: {
        /**
         * @vuese
         * Toggles menu. For tablets and mobile only.
         */
        menuToggle: function () {
            this.showMenu = !this.showMenu;
        },
        /**
         * to check if user is logged in
         */
        setupFirebase() {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    // User is signed in.
                    this.loggedIn = true;
                } else {
                    // No user is signed in.
                    this.loggedIn = false;
                }
            });
        },
        /**
         * @vuese
         * to sign out the logged in user
         */
        signOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    alert("Signed out");
                    this.$router.replace({ name: "home" });
                });
        },
        /**
         * @vuese
         * Used to switch the theme of the site. Fires the `themeChange` event.
         */
        themeSwitch: function () {
            const html = document.querySelector("html");

            if (html.getAttribute("data-theme") === "light") {
                html.setAttribute("data-theme", "dark");
                this.themeDark = false;
                localStorage.setItem("theme", "dark");
            } else {
                html.setAttribute("data-theme", "light");
                this.themeDark = true;
                localStorage.setItem("theme", "light");
            }

            /**
             * Fired when the theme is changed.
             * @arg theme to change to
             */
            this.$emit("themeChange", localStorage.getItem("theme"));
        },
    },
    watch: {
        $route() {
            this.showMenu = false;
        },
    },
};
</script>

<style>
.main--menu {
    width: 100%;
    padding: 20px 15px;
    grid-area: menu;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: var(--background-secondary);
    color: var(--text-menu);
}

.menu--btn {
    display: none;
}

.menu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
}

.sub--menu {
    list-style-type: none;
    width: 80%;
    height: max-content;
    align-self: flex-end;
}

.menu--mobile {
    position: absolute;
    display: none;
}

.router-link-exact-active {
    background: var(--text-menu);
    color: var(--background);
}

.menu--item:first-of-type {
    margin-top: 0;
}

.menu--item {
    width: 100%;
    border: 2px solid var(--text-menu);
    font-size: 1.5em;
    margin: 10px 0;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.menu--item--theme {
    border-radius: 10px;
    padding: 5px 5px;
    border: 2px solid var(--text-menu);
    display: flex;
    font-size: 1.1em;
    align-items: center;
    justify-content: center;
    transition: 0.2s box-shadow, 0.2s transform;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
}

.theme--switch {
    display: flex;
    align-items: center;
}

.theme--switch--toggle {
    position: relative;
    background: var(--text);
    padding: 5px;
    height: max-content;
    width: 40px;
    border-radius: 100px;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: 0.5s background;
}

.theme--check--switch {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 100;
    cursor: pointer;
}

.theme--switch--ball {
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--background);
    transition: 0.5s transform;
}

.theme--check--switch:checked ~ .theme--switch--ball {
    transform: translateX(15px);
}

@media not all and (hover: none) {
    .menu--item:hover,
    .menu--item--theme:hover {
        box-shadow: none;
        transform: translateY(2px);
    }
}

@media (max-width: 1199.98px) {
}

@media (max-width: 991.98px) {
    .main--menu {
        justify-content: center;
        align-items: flex-end;
        padding: 10px;
        position: relative;
    }

    .menu--btn {
        display: block;
        width: max-content;
        height: 50px;
        width: 50px;
    }

    .menu {
        display: none;
    }

    .menu--mobile {
        display: block;
        position: absolute;
        top: 100%;
        width: 100vw;
        right: 0;
        padding: 10px;
        background: var(--background-secondary);
        height: max-content;
        z-index: 1;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .sub--menu {
        margin-left: auto;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 575.98px) {
    .main--menu {
        justify-content: center;
        align-items: flex-end;
        padding: 10px;
        position: relative;
    }

    .menu--btn {
        display: block;
        width: max-content;
        height: 50px;
        width: 50px;
    }

    .menu {
        display: none;
    }

    .menu--mobile {
        display: block;
        position: absolute;
        top: 100%;
        width: 100vw;
        right: 0;
        padding: 10px;
        background: var(--background-secondary);
        height: max-content;
        z-index: 1;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    .sub--menu {
        margin-left: auto;
    }
}
</style>
