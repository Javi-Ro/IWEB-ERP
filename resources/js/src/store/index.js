import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

var store = new Vuex.Store({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      _token: localStorage.getItem('_token'),
      //user: null,
      completada: null,
      supervisor: {},
      categoria: null,
      jornadas: null,
      nominas: null,
      solicitudes: null,
      solicitudesVacaciones: null,
      empleados: [],
      categorias: [],
      supervisores: [],
      usuariosSolicitudes: null,
      numeroCompaneros: null,
      horasTotales: null,
    }
  },
  mutations: {
    setTokenJWT(state, token) {
      state._token = token
    },
    setUser(state, user) {
      state.user = user
    },
    setSupervisors(state, supervisors) {
      state.supervisores = supervisors
    },
    setToken(state) {
      state.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    },
    setCompletada(state, completada) {
      state.completada = completada
    },
    setSupervisor(state, supervisor) {
      state.supervisor = supervisor
    },
    setCategoria(state, categoria) {
      state.categoria = categoria
    },
    setJornadas(state, jornadas) {
      state.jornadas = jornadas
    },
    setNominas(state, nominas) {
      state.nominas = nominas
    },
    setSolicitudes(state, solicitudes) {
      state.solicitudes = solicitudes
    },
    setSolicitudesVacaciones(state, solicitudesVacaciones) {
      state.solicitudesVacaciones = solicitudesVacaciones
    },
    setEmpleados(state, empleados) {
      state.empleados = empleados
    },
    setCategorias(state, categorias) {
      state.categorias = categorias
    },
    setUsuariosSolicitudes(state, usuariosSolicitudes) {
      state.usuariosSolicitudes = usuariosSolicitudes
    },
    setHorasTotales(state, horasTotales) {
      state.horasTotales = horasTotales
    },
    setNumeroCompaneros(state, numeroCompaneros) {
      state.numeroCompaneros = numeroCompaneros
    }
  },
  actions: {
    actualiseToken({commit}, token) {
      commit('setTokenJWT', token)
    },
    actualiseUser({commit}, user) {
      commit('setUser', user)
    },
    async fetchUser({commit}) {
      /* try {
        const response = await axios.get('http://localhost:8000/api/users/' + this.state.user.id)
        commit('setUser', response.data) 
      }
      catch (error) {
        throw error
      } */
      return this.state.user
    },
    async fetchCompletada({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/jornada/', {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setCompletada', response.data.jornada)
      }
      catch (error) {
        throw error
      }
    },
    async fetchSupervisor({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/supervisor/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setSupervisor', response.data.supervisor)
      }
      catch (error) {
        throw error
      }
    },
    async fetchCategoria({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/categoria/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setCategoria', response.data.categoria)
      }
      catch (error) {
        throw error
      }
    },
    async fetchJornadas({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/jornadas/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setJornadas', response.data.jornadas)
      }
      catch (error) {
        throw error
      }
    },
    async fetchNominas({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/nominas/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setNominas', response.data.nominas)
      }
      catch (error) {
        throw error
      }
    },
    async fetchSolicitudes({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/solicitudes/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setSolicitudes', response.data.solicitudes)
      }
      catch (error) {
        throw error
      }
    },
    // sólo para admins
    async fetchSolicitudesVacaciones({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/solicitudesVacaciones/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setSolicitudesVacaciones', response.data.solicitudesVacaciones)
        commit('setUsuariosSolicitudes', response.data.usuariosSolicitudes)
      }
      catch (error) {
        throw error
      }
    },
    async fetchEmpleados({commit}) {
      const response = await axios.get('/api/users', {
        headers: {
          'Authorization': 'Bearer ' + store.state._token
        }
      });
      let empleados = response.data.data
      for (let idx in empleados) {
        if (empleados[idx].admin) {
          empleados[idx].role = 'Admin'
        }
        else if (empleados[idx].supervisor) {
          empleados[idx].role = 'Supervisor'
        }
        else {
          empleados[idx].role = 'Empleado'
        }
      }
      commit('setEmpleados', empleados)
    },
    async fetchCategorias({commit}) {
      const response = await axios.get('/api/categoria', {
        headers: {
          'Authorization': 'Bearer ' + store.state._token
        }
      });
      commit('setCategorias', response.data.data)
    },
    async fetchSupervisores({commit}) {
      const response = await axios.get('/api/supervisores', {
        headers: {
          'Authorization': 'Bearer ' + store.state._token
        }
      })
      response.data.data.push({
        'name': 'Sin equipo',
        'id': null
      })
      commit('setSupervisors', response.data.data)
    },
    async fetchHorasTotales({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/horas/count/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setHorasTotales', response.data.numeroHoras)
      }
      catch (error) {
        throw error
      }
    },
    async fetchNumeroCompaneros({commit}) {
      try {
        const response = await axios.get('http://localhost:8000/api/companeros/count/' + this.state.user.id, {
          headers: {
            'Authorization': 'Bearer ' + store.state._token
          }
        })
        commit('setNumeroCompaneros', response.data.numeroCompaneros)
      }
      catch (error) {
        throw error
      }
    },
  },
  modules: {},
})
export default store;