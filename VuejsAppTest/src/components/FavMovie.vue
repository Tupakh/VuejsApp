<template>
    <i aria-hidden="true"
       @click="toogleFav(movieID)"
       :class="['fa fa-heart', favorite ? 'fav' : 'unfav']"
       :title="favorite ? 'Unfavorite' : 'Favorite'">
    </i>
</template>

<script>
    export default {
        name: 'FavMovie',
        props: ['movieID'],
        data() {
            return {
                loading: false,
                favorite: null
            }
        },
        created() {
            this.getFavStatus();
        },
        methods: {
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
                        //console.log("toogleFav", data);
                        this.getFavStatus();
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