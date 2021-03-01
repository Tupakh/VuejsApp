<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand" exact>Movie Store</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li :class="this.$route.path === '/' ? 'nav-item active' : 'nav-item' ">
                    <router-link to="/" class="nav-link" exact><i class="fa fa-home " /></router-link>
                </li>
                <li :class="this.$route.path === '/popular' ? 'nav-item active' : 'nav-item' ">
                    <router-link to="/popular" class="nav-link">Popular</router-link>
                </li>
                <li :class="this.$route.path === '/favorites' ? 'nav-item active' : 'nav-item' ">
                    <router-link to="/favorites" class="nav-link">Favorites</router-link>
                </li>
                <li :class="this.$route.path === '/contact' ? 'nav-item active' : 'nav-item' ">
                    <router-link to="/contact" class="nav-link">Contact</router-link>
                </li>
            </ul>
            <SearchForm />
        </div>
    </nav>
</template>

<script>
    import SearchForm from './SearchForm.vue';

    export default {
        name: 'Header',
        components: {
            SearchForm
        },
    }
</script>

<style scoped>
</style>