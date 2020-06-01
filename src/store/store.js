import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import router from '../router.js';

axios.defaults.baseURL = "http://localhost:3000";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null,
        isAdmin: 0,
        userId: null,
        instructorId: null
    },

    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
            state.isAdmin = userData.isAdmin;
        },
        // check is currently logged in user instructor so instructor pages can be shown to him
        isInstructor(state, instructorId){
            state.instructorId = instructorId;
        },
        clearAuthData(state) {
            state.instructorId = null,
            state.idToken = null,
            state.userId = null,
            state.isAdmin = null
        }
    },
    actions: {
        // JWT token is valid for 1h
        setLogoutTimer({ commit }, expirationTime) {
            setTimeout(() => {
                commit('clearAuthData');
            }, expirationTime * 1000); // this should be in ms. for test, remove *1000
        },

        login({ commit, dispatch, state }, authData) {
            axios.post('/login', { email: authData.email, password: authData.password })
                .then(resData => {
                    commit('authUser', {
                        token: resData.data.token,
                        userId: resData.data.userId,
                        isAdmin: resData.data.isAdmin
                    });
                    
                    dispatch('checkIsInstructor');

                    // set Authorization header for requests from this user
                    if (state.idToken) {
                        console.log(state.idToken);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.idToken;
                    }

                    // calculate expiration datetime for JWT token
                    const now = Date();
                    const nowInSeconds = new Date(now).getTime();
                    const expirationInSeconds = nowInSeconds + Number(resData.data.expiresIn) * 1000;
                    const expirationDate = new Date(expirationInSeconds);

                    // save user data to local storage so the user will stay logged after refreshing the page
                    localStorage.setItem('token', resData.data.token);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', resData.data.userId);
                    localStorage.setItem('isAdmin', resData.data.isAdmin);

                    dispatch('setLogoutTimer', resData.data.expiresIn);

                    // when logged in, redirect user to homepage with list of his reservations
                    router.replace('/home/my-reservations');
                }).catch(err => console.log(err))
        },
        // when user refreshes the page, keep him logged in
        tryAutoLogin({ commit, dispatch, state }) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const expirationDate = localStorage.getItem('expirationDate');
            const now = Date();
            if (now >= expirationDate) { // TODO: this is correct, but doesn't work. why?
            // return;
            }

            const userId = localStorage.getItem('userId');
            const isAdmin = localStorage.getItem('isAdmin');

            commit('authUser', {
                token: token,
                userId: userId,
                isAdmin: isAdmin
            });  
        },
        checkIsInstructor({commit}) {
            axios.get('/isUserInstructor')
                .then( resData => {
                    console.log( resData.data.instructorId);
                    // if received instructorId is null, do nothing and let it stay null
                    if(resData.data.instructorId){
                        commit('isInstructor', {
                            instructorId: resData.data.instructorId
                        });
                    }
                })
                .catch(err => console.log(err))
        },
        logout({ commit }) {
            commit('clearAuthData');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('expirationDate');
            router.replace('/login');
        }
    },
    getters: {
        isAuth(state) {
            return state.idToken != null;
        },
        isAdministrator(state) {
            return state.isAdmin == 1;
        },
        isInstructor(state) {
            return state.instructorId != null;
        },
        getInstructorId(state) { // TODO: this is redundancy because we can get instructorId by accessing this.$store.state
            console.log(state.instructorId);
            return state.instructorId;
        }
    }
});