<template>
    <div class="search">
        <h1 class="titlePage">Results for: {{search}}</h1>

        <div v-if="loading">
            <Loading />
        </div>

        <div v-else class="row">
            <div class="col-md-12" v-if="!searchResults.length">
                <h2>Sorry, no movies are founded with this name!</h2>
            </div>
            <div v-else class="row col-md-12">
                <div v-for="movie in searchResults" :key="movie.id" class="col-md-3 col-sm-6 col-6">
                    <div class="card mb-3 box-shadow">
                        <router-link :to="{name: 'MovieDetails', params: { id: movie.id }}" class="moviePoster">
                            <img :alt="movie.title"
                                 class="card-img-top card-movie"
                                 :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'"
                                 :title="movie.title">
                        </router-link>
                        <FavMovie :movieID="movie.id" :movieTitle="movie.title" />
                        <router-link :to="{name: 'MovieDetails', params: { id: movie.id }}" class="card-body">
                            <h5 class="card-title">{{movie.title}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ format_date(movie.release_date) }}</h6>
                        </router-link>
                    </div>
                </div>
                <Pagination :page="page" :totalPages="totalPages" :totalResults="totalResults" @changePage="changePageNumber" />
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import FavMovie from './FavMovie.vue';
    import Loading from './Loading.vue';
    import Pagination from './Pagination.vue';

    export default {
        name: 'SearchPage',
        props: ['search'],
        data() {
            return {
                loading: false,
                searchResults: [],
                page: 1,
                totalPages: 0,
                totalResults: 0
            }
        },
        components: {
            FavMovie,
            Loading,
            Pagination
        },
        watch: {
            // whenever search changes, this function will run
            search: function (newSearch, oldSearch) {
                this.getSearchResults();
            }
        },
        methods: {
            changePageNumber(pageNb) {
                //console.log("changePageNumber", pageNb);
                this.page = pageNb;
            },
            getSearchResults() {
                this.loading = true,
                    // GET request using fetch with error handling
                    fetch("https://api.themoviedb.org/3/search/movie?api_key=d4e1208775f522c1ec8ddad02fa77144&query=" + this.search)
                        .then(async response => {
                            const data = await response.json();

                            // check for error response
                            if (!response.ok) {
                                // get error message from body or default to response statusText
                                const error = (data && data.message) || response.statusText;
                                return Promise.reject(error);
                            }

                            this.searchResults = data.results;
                            this.totalPages = data.total_pages;
                            this.totalResults = data.total_results;
                            this.loading = false;
                            console.log("SearchForm", data);
                        })
                        .catch(error => console.log("There was an error!", error.message));
            },
            format_date(value) {
                if (value) {
                    return moment(String(value)).format("ll");
                }
            }
        },
        created() {
            this.getSearchResults();
        }
    }
</script>

<style scoped>
    h2 {
        color: white;
    }
    .moviePoster {
        display: flex;
        justify-content: center;
        background-color: lightgrey;
        min-height: 312px;
    }
</style>