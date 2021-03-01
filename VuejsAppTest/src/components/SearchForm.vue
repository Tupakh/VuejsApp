<template>
    <form class="form-inline my-2 my-lg-0" @submit.prevent="searchMovie">
        <input class="form-control mr-sm-2" type="search" placeholder="Search a movie in MS" aria-label="Search" v-model="search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
</template>

<script>
    //import MovieDetails from './MovieDetails.vue';

    export default {
        name: 'SearchForm',
        data() {
            return {
                search: ''
            }
        },
        methods: {
            searchMovie(e) {
                //console.log('searchMovie', e);
                if (this.search) {
                    this.$router.push({ name: 'SearchPage', params: { search: this.search } });
                    this.search = '';
                    e.target[0].blur();
                }
            },
        },
    };
</script>

<style scoped>
</style>