<template>
    <div>
        <i aria-hidden="true"
           @click="toogleFav(movieID)"
           :class="['fa fa-heart', favorite ? 'fav' : 'unfav']"
           :key="movieID"
           :title="favorite ? 'Remove from Favorite' : 'Add to Favorite'">
        </i>
        <AlertFav v-if="openAlert" :movieTitle="movieTitle"  @closeAlert="handleCloseAlert" :movieID="movieID" :favorite="favorite" :openAlert="openAlert"/>
    </div>
</template>

<script>
    import AlertFav from './AlertFav.vue';

    export default {
        name: 'FavMovie',
        components: {
            AlertFav
        },
        props: ['movieID', 'movieTitle'],
        data() {
            return {
                loading: false,
                favorite: false,
                openAlert: false,
            }
        },
        created() {
            this.getFavStatus();
        },
        methods: {
            handleCloseAlert() {
                //console.log('handleCloseAlert');
                this.openAlert = false;
            },
            handleOpenAlert(movieID, movieFav) {
                //console.log('handleOpenAlert', movieID, movieFav);
                this.openAlert = true;
                //console.log("AlertFav", AlertFav);
            },
            getFavStatus() {
                this.loading = true;
                const url = "https://api.themoviedb.org/3/movie/" + this.movieID + "/account_states?api_key=d4e1208775f522c1ec8ddad02fa77144&session_id=89f1b62a25956f3cc814cf45dc964421b979eb51";
                //console.log('movie', url);
                fetch(url)
                    .then(async response => {
                        const data = await response.json();

                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = (data && data.message) || response.statusText;
                            return Promise.reject(error);
                        }
                        //console.log('getFavStatus', data);
                        this.favorite = data.favorite;
                        this.loading = false;
                    })
                    .catch(error => console.log("There was an error!", error.message));
            },
            toogleFav(movieID) {
                // POST request using fetch with set headers
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        media_type: 'movie',
                        media_id: movieID,
                        favorite: !this.favorite
                    })
                };
                fetch("https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=d4e1208775f522c1ec8ddad02fa77144&session_id=89f1b62a25956f3cc814cf45dc964421b979eb51",
                    requestOptions)
                    .then(async response => {
                        const data = await response.json();

                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = (data && data.message) || response.statusText;
                            return Promise.reject(error);
                        }
                        if (this.$route.path === "/favorites") {
                            //console.log("route", this.$route.path);
                            this.$emit('reload', true, movieID);
                            this.getFavStatus();
                            this.handleOpenAlert(movieID, this.favorite);
                        } else {
                            //console.log("route else", this.$route.path);
                            this.getFavStatus();
                            this.handleOpenAlert(movieID, this.favorite);
                        }
                    })
                    .catch(error => console.log("There was an error!", error.message));
            }
        }
    }
</script>

<style scoped>
    .fa-heart {
        font-size: 22px;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .fav {
        color: orangered;
    }
    .unfav {
        color: white;
    }
</style>