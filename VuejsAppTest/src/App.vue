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
    #app {
        min-height: calc(100vh - 120px);
        position: relative;
    }
    footer {
        position: absolute;
        bottom: -120px;
        display: block;
        width: 100%;
    }
    h1.titlePage {
        color: white;
    }
    .card {
        border: none;
    }
    .card > a:hover {
        text-decoration: none;
        color: inherit;
    }

    .card > a {
        /*background-color: unset !important;*/
        color: unset !important;
    }

    .box-shadow {
        position: relative;
        height: calc(100% - 1rem);
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
    }
    .box-shadow:hover {
        box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.75);
    }

</style>

