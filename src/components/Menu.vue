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
                >COVID</router-link
            >
            <router-link tag="li" class="menu--item" :to="{ name: 'finance' }"
                >Finance</router-link
            >
            <li>
                <label for="checkbox">Light Theme</label>
                <input
                    @click="themeSwitch"
                    type="checkbox"
                    id="checkbox"
                    v-model="themeLight"
                />
            </li>
        </ul>
        <transition name="slide-fade" mode="out-in">
            <ul v-if="showMenu" class="menu menu--mobile">
                <router-link tag="li" class="menu--item" :to="{ name: 'home' }"
                    >COVID</router-link
                >
                <router-link
                    tag="li"
                    class="menu--item"
                    :to="{ name: 'finance' }"
                    >Finance</router-link
                >
                <li>
                    <label for="checkbox">Light Theme</label>
                    <input
                        @click="themeSwitch"
                        type="checkbox"
                        id="checkbox"
                        v-model="themeLight"
                    />
                </li>
            </ul>
        </transition>
    </nav>
</template>

<script>
export default {
    data: function () {
        return {
            showMenu: false,
            themeLight: true,
        };
    },
    methods: {
        menuToggle: function () {
            this.showMenu = !this.showMenu;
        },
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
    list-style-type: none;
}

.menu--mobile {
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
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06);
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
    }

    .menu--item {
        width: 90%;
    }
}

@media (max-width: 767.98px) {
}

@media (max-width: 991.98px) {
}

@media (max-width: 1199.98px) {
}
</style>