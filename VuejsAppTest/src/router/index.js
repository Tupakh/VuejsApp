import Home from '../components/Home.vue';
import Contact from '../components/Contact.vue';
import Favorite from '../components/Favorite.vue';
import Popular from '../components/Popular.vue';
import MovieDetails from '../components/MovieDetails.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/movie/:id', name: "MovieDetails", component: MovieDetails },
    { path: '/contact', component: Contact },
    { path: '/favorites', component: Favorite },
    { path: '/popular', component: Popular },
    { path: '*', redirect: '/' }
]