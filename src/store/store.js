import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from 'vue-router';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        idToken: null,
        isAdmin: 0,
        isInstructor: null,
        userId: null,
        instructorId: null,
        user: null
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
            state.isAdmin = userData.isAdmin;
        },
        storeUser(state, user) {
            state.user = user;
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
                return axios.get('/userDetails/' + this.state.userId) 
            })
            .then(resData => {
                const user = resData.data;
                console.log(user);
                commit('storeUser', user);
                if (store.state.idToken) {
                    console.log(store.state.idToken);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.idToken;
                  }
            })
                
            .catch(err => console.log(err));
         
        },
      
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuth(state){
            return state.idToken !== null;
        },
        isAdministrator(state){
            return state.isAdmin != 1;
        },
        isInstructor(state){
            return state.isInstructor != null;
        }
    }
});