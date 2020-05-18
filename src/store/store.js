import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        idToken: null,
        isAuth: null,
        isAdmin: null,
        isInstructor: null,
        userId: null,
        instructorId: null
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token,
            state.userId = userData.userId,
            state.isAdmin = userData.isAdmin
            console.log(state.idToken);
        }
    },
    actions: {
    
        login({commit}, authData) {
            axios.post('/login', { email: authData.email, password: authData.password } ).then(resData => {
                console.log(resData);
                commit('authUser', {
                    token: resData.data.token,
                    userId: resData.data.userId,
                    isAdmin: resData.data.isAdmin
                });
                
            })
                .catch(err => console.log(err));
            console.log(email, password);
        }
    }
});