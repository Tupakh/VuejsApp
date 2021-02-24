<template>
    <div class="favorite">
        <h1>Favorite Movies</h1>

        <div v-if="loading" class="loading">
            Loading...
        </div>

        <div v-else class="row">
            <div v-for="movie in fmovies" :key="movie.id" class="col-md-3 col-sm-6 col-6">
                <div class="card card mb-3 box-shadow">
                    <img :alt="movie.title"
                         class="card-img-top card-movie"
                         :src="'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path"
                         :title="movie.title" />
                    <FavMovie :movieID="movie.id" />
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
    import FavMovie from './FavMovie.vue';

    export default {
        name: 'Favorite',
        components: {
            FavMovie
        },
        data() {
            return {
                loading: false,
                fmovies: [],
            }
        },
        created() {
            this.loading = true;
            const headers = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGUxMjA4Nzc1ZjUyMmMxZWM4ZGRhZDAyZmE3NzE0NCIsInN1YiI6IjVmYTY4YzZkNTE5YmJiMDAzYzUxZWI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.78WE_WBsTIXLwo2xv5DA-yq1ChPF14yFpznR5kOOROM' };
            fetch('https://api.themoviedb.org/4/account/5fa68c6d519bbb003c51eb77/movie/favorites', {headers})
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }

                    this.fmovies = data.results;
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

<style scoped>
</style>