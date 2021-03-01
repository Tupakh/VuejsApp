<template>
    <div class="alert alert-dismissible fade" :class="[favorite ? 'alert-success show' : 'alert-danger show']" role="alert" :id="movieID">
        {{movieTitle}} was {{ favorite ? 'added to' : 'removed from' }} your Favorites List!
        <button type="button" class="close" @click="handleClose" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'AlertFav',
        props: ['movieTitle', 'movieID', 'favorite'],
        created() {
            setTimeout(() => this.handleClose(), 2000);
        },
        methods: {
            handleClose() {
                //console.log("AlertFav handleClose");
                this.$emit('closeAlert');
            },
        }
    }
</script>

<style scoped>
    .alert {
        position: fixed;
        z-index: 5;
        right: 20px;
        bottom: 20px;
    }
</style>