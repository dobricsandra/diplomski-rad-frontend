import Search from './components/Search.vue';
//import Signup from './components/Signup.vue';
import SearchResults from './components/SearchResults.vue';
import Login from './components/Login.vue';
import Help from './components/Help.vue';

import {store} from './store/store.js';
//import InstructorDetails from '/.components/InstructorDetails.vue';

// if we want lazy loading - load when needed, not everything at the beginning, then we'll use:
// with each click on different route, watch network - new small bundles will be downloaded
// group bundles with another argument that is the name of group
const Signup = resolve => {
    require.ensure(['./components/Signup.vue'], () => {
        resolve(require('./components/Signup.vue'))
    });
}

export const routes = [
    { path: '', component: Search },
    { path: '/signup', component: Signup },
    //{ path: '/instructor-profile/:id', component: InstructorDetails},
    { path: '/searchResults/:id', component: SearchResults },
    { path: '/login', component: Login },
    {path: '/help', component: Help, beforeEnter(to, from, next) {
        if(store.state.idToken) {
            next();
        }
        else {
            next('/login');
        }
    }},
    {path: '*', redirect:'/'}
];