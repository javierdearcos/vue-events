import { createStore } from 'vuex';
import EventService from '@/services/EventService';

export default createStore({
  state: {
    user: {
      id: 'abc123',
      name: 'Javier de Arcos'
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);  
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
                .then(event => commit('ADD_EVENT', event));
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  }
});
