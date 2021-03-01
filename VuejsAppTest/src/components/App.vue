<template>
    <div id="app" class="container">
        <Header />
        <!--<Home  />-->
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    import Home from './components/Home.vue';
    import Footer from './components/Footer.vue'

    export default {
        name: 'app',
        components: {
            Header,
            Home,
            Footer
        }
    };
</script>

<style>
    body {
        min-height: 100vh;
        background-image: url('https://miro.medium.com/max/3920/1*oZqGznbYXJfBlvGp5gQlYQ.jpeg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        background-attachment: fixed;
    }
    h1.titlePage {
        color: white;
    }
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

