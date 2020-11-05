<template>
    <nav class="main--menu">
        <h1 class="logo">CF</h1>
        <ul class="menu">
            <router-link tag="li" class="menu--item" :to="{ name: 'home' }"
                >COVID</router-link
            >
            <router-link tag="li" class="menu--item" :to="{ name: 'finance' }"
                >Finance</router-link
            >
        </ul>
    </nav>
</template>

<script>
export default {};
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

.logo {
    font-size: 3em;
}

.menu {
    width: 100%;
    list-style-type: none;
}

.router-link-exact-active {
    background: var(--text-menu);
    color: var(--background);
}

.menu--item {
    width: 100%;
    border: 2px solid var(--text-menu);
    font-size: 1.5em;
    margin: 10px 0;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
}

@media (max-width: 575.98px) {
}

@media (max-width: 767.98px) {
}

@media (max-width: 991.98px) {
}

@media (max-width: 1199.98px) {
}
</style>