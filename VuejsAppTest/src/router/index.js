import Home from '../components/Home.vue';
import Contact from '../components/Contact.vue';
import Favorite from '../components/Favorite.vue';
import Popular from '../components/Popular.vue';
import MovieDetails from '../components/MovieDetails.vue';
import SearchPage from '../components/SearchPage.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/movie/:id', name: "MovieDetails", component: MovieDetails },
    { path: '/contact', component: Contact },
    { path: '/favorites', component: Favorite },
    { path: '/popular', component: Popular }, ,
    { path: '/search/:search', name: "SearchPage", props: true, component: SearchPage },
    { path: '*', redirect: '/' }
]