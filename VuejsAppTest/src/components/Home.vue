<template>
    <div class="home">
        <h1>Welcome to Movie Store</h1>

        <div v-if="loading" class="loading">
            Loading...
        </div>

        <div v-else class="row">
            <div v-for="movie in movies" :key="movie.id" class="col-md-3 col-sm-6 col-6">
                <div class="card mb-3 box-shadow">
                    <router-link :to="{name: 'MovieDetails', params: { id: movie.id }}">
                        <img :alt="movie.title"
                             class="card-img-top card-movie"
                             :src="'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path"
                             :title="movie.title" />
                    </router-link>
                    <FavMovie :movieID="movie.id" />
                    <router-link :to="{name: 'MovieDetails', params: { id: movie.id }}" class="card-body">
                        <h5 class="card-title">{{movie.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ format_date(movie.release_date) }}</h6>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import FavMovie from './FavMovie.vue';
    import MovieDetails from './MovieDetails.vue';

    export default {
        name: 'Home',
        data() {
            return {
                loading: false,
                movies: [],
            }
        },
        components: {
            FavMovie,
            MovieDetails
        },
        created() {
            this.loading = true;
            // GET request using fetch with error handling
            fetch("https://api.themoviedb.org/3/movie/popular?api_key=d4e1208775f522c1ec8ddad02fa77144&page=1")
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                    this.movies = data.results;
                    this.loading = false;
                    //console.log("Movies", this.movies);
                })
                .catch(error => console.log("There was an error!", error.message));
        },
        methods: {
            format_date(value) {
                if (value) {
                    return moment(String(value)).format("ll");
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card:hover {
        border: none;
    }
    .card > a:hover {
        text-decoration: none;
        color: inherit;
    }
    .card > a {
        background-color: unset !important;
        color: unset !important;
    }
    .box-shadow {
        position: relative;
        height: calc(100% - 1rem);
        overflow: hidden;
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
    }
</style>

