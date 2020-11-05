<template>
    <nav class="main--menu">
        <h1 class="logo">COVIDF</h1>
        <ul class="menu">
            <li class="menu--item">
                <router-link to="/">COVID</router-link>
            </li>
            <li class="menu--item">
                <router-link to="/finance">Finance</router-link>
            </li>
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
}

.logo {
    font-size: 3em;
}

.menu {
    width: 100%;
    list-style-type: none;
}

.menu--item {
    width: 100%;
    border: 2px solid var(--text);
    font-size: 1.5em;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
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