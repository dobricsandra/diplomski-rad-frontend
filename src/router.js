import Vue from 'vue';
import VueRouter from 'vue-router';

import Search from './components/Search.vue';
//import Signup from './components/Signup.vue';
import SearchResults from './components/SearchResults.vue';
import InstructorProfile from './components/InstructorProfile.vue';
import Login from './components/Login.vue';
import Help from './components/Help.vue';
import Home from './components/User/Homepage.vue';
import MyReservations from './components/User/MyReservations.vue';
import EditProfile from './components/User/EditProfile.vue';
import EditInstructorProfile from './components/User/EditInstructorProfile.vue';
import InstructorCalendar from './components/User/InstructorCalendar.vue';
import MyCourses from './components/User/MyCourses.vue';
import BecomeInstructor from './components/User/BecomeInstructor.vue';
import Dashboard from './components/Admin/Dashboard.vue';
import Faculties from './components/Admin/Faculties.vue';
import Cities from './components/Admin/Cities.vue';

import store from './store/store.js';

Vue.use(VueRouter);

// if we want lazy loading - load when needed, not everything at the beginning, then we'll use:
// with each click on different route, watch network - new small bundles will be downloaded
// group bundles with another argument that is the name of group

store.dispatch('tryAutoLogin'); // why did i put this here? check!

const Signup = resolve => {
    require.ensure(['./components/Signup.vue'], () => {
        resolve(require('./components/Signup.vue'))
    });
}

const routes = [

    // routes everybody can access (without login)
    { path: '', component: Search },
    { path: '/signup', component: Signup },
    { path: '/searchResults/:id', component: SearchResults },
    { path: '/instructor-profile/:id', component: InstructorProfile },
    { path: '/login', component: Login },
    { path: '/help', component: Help },
    // routes only logged-in user can access
    {
        path: '/home', component: Home,
        beforeEnter(to, from, next) {
        console.log(store.state.idToken);
        if(store.getters.isAuth) {
        next();
        }
        else {
            console.log(store.getters.isAuth);
            console.log('niste prijavljeni.');
            next('/login');
        }
        },  
        children: [
            {
                path: 'my-reservations',
                component: MyReservations
            }, 
            {
                path: 'my-instructor-profile',
                component: EditInstructorProfile
            }, 
            {
                path: 'edit-profile',
                component: EditProfile
            },
            {
                path: 'start-teaching',
                component: BecomeInstructor
            },
            {
                path: 'my-courses',
                component: MyCourses
            },
            {
                path: 'my-calendar',
                component: InstructorCalendar
            }
        ]
    },
    // routes only admin can access
    {path: '/admin', component: Dashboard,  children: [
        {
            path: 'faculties',
            component: Faculties
        }, 
        {
            path: 'courses',
            component: Cities, 
            }
    ]},
    { path: '*', redirect: '/' }
];

export default new VueRouter({ mode: 'history', routes }) // mode:history removes #/ after url