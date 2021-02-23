<template>
    <div class="home">
        <h1>Welcome to Movie Store</h1>

        <div v-if="loading" class="loading">
            Loading...
        </div>

        <div v-else class="row">
            <div v-for="movie in movies" :key="movie.id" class="col-md-3">
                <div class="card card mb-3 box-shadow">
                    <img :alt="movie.title"
                         class="card-img-top card-movie"
                         :src="'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path"
                         :title="movie.title" />

                    <!--<i aria-hidden="true"
                       :class="'fa fa-heart ' + movie.favorite ? 'fav' : 'unfav'"
                       title="Favorite">
                    </i>-->
                    <div class="card-body">
                        <h5 class="card-title">{{movie.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ format_date(movie.release_date) }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'Home',
        data() {
            return {
                loading: false,
                movies: [],
            }
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
</style>

