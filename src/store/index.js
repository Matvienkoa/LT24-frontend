import { createStore } from 'vuex';
import instance from '../axios';
const jwt = require('jsonwebtoken');

export default createStore({
  state: {
    identifyUser: "",
    currentUser: {},
    currentPositions: {},
    colis: [],
    currentColis: ""
  },

  getters: {
    getIdentifyUser: (state) => {
      return state.identifyUser
    },
    getCurrentUser: (state) => {
      return state.currentUser
    },
    getCurrentPositions: (state) => {
      return state.currentPositions
    },
    getColis: (state) => {
      return state.colis
    },
    getCurrentColis: (state) => {
      return state.currentColis
    }
  },

  mutations: {
    LOG_OUT: function (state) {
      state.identifyUser = "",
      state.currentUser = "",
      localStorage.removeItem('token');
    },
    SET_IDENTIFY_USER: function (state, user) {
      state.identifyUser = user
    },
    SET_CURRENT_USER: function (state, userInfos) {
      state.currentUser = userInfos;
    },
    SET_CURRENT_POSITIONS: function (state, currentPositions) {
      state.currentPositions = currentPositions;
    },
    ADD_COLIS: function (state, colis) {
      state.colis.unshift(colis);
    },
    SET_COLIS: function (state, colis) {
      state.colis = colis
    },
    SET_CURRENT_COLIS: function (state, currentColis) {
      state.currentColis = currentColis
    },
    DELETE_COLIS: function (state, colis) {
      const index = state.colis.findIndex(c => c.id === colis.id);
      if (index !== -1) {
        state.colis.splice(index, 1);
      }
    },
    EDIT_COLIS: function (state, modifiedColis) {
      const colisIndex = state.colis.findIndex(
        c => c.id === modifiedColis.id)
      state.colis[colisIndex] = modifiedColis
      state.colis = [...state.colis]
    },
  },

  actions: {
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/geoloc/auth/login', userInfos)
          .then(function (response) {
            if(response.data.token){
            commit('SET_IDENTIFY_USER', response.data);
            localStorage.setItem('token', response.data.token);
            resolve(response);
          }
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    createAccount: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/geoloc/auth/signup', userInfos)
        .then(function (response) {
          commit;
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },
    getCurrentUser: ({commit}) => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      instance.get(`/geoloc/profiles/${userId}`)
        .then(function (response) {
          commit('SET_CURRENT_USER', response.data);
          commit('SET_IDENTIFY_USER', {token, userId})
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postCurrentPositions: ({commit}, positions) => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      instance.put(`/geoloc/positions/${userId}`, positions)
        .then((response) => {
          commit('SET_CURRENT_POSITIONS', response.data);
        })
        .catch((error) => {
          console.log({error: error});
        });
    },
    getColis: ({commit}) => {
      instance.get('geoloc/colis')
        .then((response) => {
          commit('SET_COLIS', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    postColis: ({commit}, colis) => {
      return new Promise((resolve, reject) => {
        instance.post('/geoloc/colis', colis)
          .then((response) => {
            commit('ADD_COLIS', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    deleteColis: ({commit}, colis) => {
      instance.delete(`geoloc/colis/${colis.id}`)
      .then(function () {
        commit('DELETE_COLIS', colis);
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getCurrentColis: ({commit}, colis) => {
      return new Promise((resolve, reject) => {
        instance.get(`geoloc/colis/search/${colis.number}`)
          .then((response) => {
            commit('SET_CURRENT_COLIS', response.data)
            resolve(response)
            instance.get(`geoloc/positions/search/${response.data.userId}`)
            .then((response) => {
              commit('SET_CURRENT_POSITIONS', response.data);
            })
            .catch((error) => {
            console.log(error)
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    editColis: ({commit}, colis) => {
      return new Promise((resolve, reject) => {
        instance.put(`geoloc/colis/${colis.id}`, colis)
          .then((response) => {
            commit('EDIT_COLIS', colis)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },

  modules: {
  }
})
