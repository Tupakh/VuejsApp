<template>
    <div class="movie_details">
        <div v-if="loading" class="loading">
            Loading...
        </div>
        <div v-else class="card bg-dark text-white">
            <img :alt="movie.title"
                    class="card-img"
                    :src="movie.backdrop_path ? 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + movie.backdrop_path : 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(blur)/6sGSCILj5JuqhQB6P0s7BULTA85.jpg'">
            <div class="card-img-overlay">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <img :alt="movie.title"
                                    class="card-img"
                                    :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w220_and_h330_face/' + movie.poster_path : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'">
                        </div>
                        <div class="col-md-8">
                            <div class="mt-4 mb-2">
                                <h2 class="card-title">
                                    {{movie.title}} <span class="tag release_date">({{format_date(movie.release_date)}})</span>
                                </h2>
                            </div>
                            <h3 class="tagline">{{movie.tagline}}</h3>
                            <div class="mt-4 mb-2">
                                <h3 class="card-title">Overview</h3>
                            </div>
                            <p class="card-text">{{movie.overview}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'MovieDetails',
        data() {
            return {
                loading: false,
                movie: null,
                movieID: this.$route.params.id
            }
        },
        created() {
            this.loading = true;
            // GET request using fetch with error handling
            fetch('https://api.themoviedb.org/3/movie/' + this.movieID + '?api_key=d4e1208775f522c1ec8ddad02fa77144&')
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                    this.movie = data;
                    this.loading = false;
                    console.log("MovieDetails", this.movie);
                })
                .catch(error => console.log("There was an error!", error.message));
        },
        components: {
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
    .bg-movieDetail {
        background-color: lightgoldenrodyellow;
        min-height: calc(100vh - 56px);
        height: 100%;
        display: flex;
        align-items: center;
    }

    .card {
        border-radius: 0;
    }
    .card-img-overlay {
        border-radius: 0;
        background-image: linear-gradient(to right, rgba(16.47%, 15.29%, 14.51%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%);
    }

    h2 span.release_date {
        opacity: 0.8;
        font-weight: 400;
    }

    h3.tagline {
        margin-bottom: 0;
        font-size: 1.1em;
        font-weight: 400;
        font-style: italic;
        opacity: 0.7;
    }

    .alignCenter {
        display: flex;
        align-items: center;
    }
</style>