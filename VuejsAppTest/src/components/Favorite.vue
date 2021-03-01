<template>
    <div class="favorite">
        <h1 class="titlePage">Favorite Movies</h1>

        <div v-if="loading">
            <Loading />
        </div>

        <div v-else class="row">
            <div v-for="movie in fmovies" :key="movie.id" class="col-md-3 col-sm-6 col-6">
                <div class="card mb-3 box-shadow">
                    <router-link :to="{name: 'MovieDetails', params: { id: movie.id }}">
                        <img :alt="movie.title"
                             class="card-img-top card-movie"
                             :src="'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path"
                             :title="movie.title" />
                    </router-link>
                    <FavMovie :movieID="movie.id" @reload="changeReloadStatus" :movieTitle="movie.title" />
                    <router-link :to="{name: 'MovieDetails', params: { id: movie.id }}" class="card-body">
                        <h5 class="card-title">{{movie.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ format_date(movie.release_date) }}</h6>
                    </router-link>
                </div>
            </div>
            <Pagination :page="page" :totalPages="totalPages" :totalResults="totalResults" @changePage="changePageNumber" />
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import FavMovie from './FavMovie.vue';
    import Loading from './Loading.vue';
    import Pagination from './Pagination.vue';

    export default {
        name: 'Favorite',
        components: {
            FavMovie,
            Loading,
            Pagination
        },
        data() {
            return {
                loading: false,
                fmovies: [],
                page: 1,
                totalPages: 0,
                totalResults: 0,
                movieID: 0
            }
        },
        created() {
            this.getFavoriteMovies(this.page)
        },
        watch: {
            page() {
                //console.log("watch", this.page);
                this.getFavoriteMovies(this.page);
            },
            movieID() {
                console.log("movieID 1", this.movieID);
                this.getFavoriteMovies(this.page);
                console.log("movieID 2", this.movieID);
            }
        },
        methods: {
            changePageNumber(pageNb) {
                //console.log("changePageNumber", pageNb);
                this.page = pageNb;
            },
            changeReloadStatus(reloadState, movieID) {
                console.log("changeReloadStatus", movieID, this.fmovies);
                //console.log("changeReloadStatus",  fmovies);
                this.movieID = movieID;
                //this.fmovies.filter(item => {
                //    if (item.id !== movieID) {
                 //       console.log("filter", item);
                 //       return item;
                 //   }
                //});
               // console.log("changeReloadStatus", this.fmovies);
            },
            getFavoriteMovies(pageNumber) {
                this.loading = true;
                const headers = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGUxMjA4Nzc1ZjUyMmMxZWM4ZGRhZDAyZmE3NzE0NCIsInN1YiI6IjVmYTY4YzZkNTE5YmJiMDAzYzUxZWI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.78WE_WBsTIXLwo2xv5DA-yq1ChPF14yFpznR5kOOROM' };
                fetch("https://api.themoviedb.org/3/account/5fa68c6d519bbb003c51eb77/favorite/movies?api_key=d4e1208775f522c1ec8ddad02fa77144&session_id=89f1b62a25956f3cc814cf45dc964421b979eb51&sort_by=created_at.desc&page=" + pageNumber)
                    .then(async response => {
                        const data = await response.json();

                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = (data && data.message) || response.statusText;
                            return Promise.reject(error);
                        }

                        this.fmovies = data.results;
                        this.totalPages = data.total_pages;
                        this.totalResults = data.total_results;
                        this.loading = false;
                        this.reload = false;
                    })
                    .catch(error => console.log("There was an error!", error.message));
            },
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