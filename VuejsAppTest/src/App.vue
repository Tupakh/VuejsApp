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
</style>

