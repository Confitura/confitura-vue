import { Module } from 'vuex';
import { LOGIN, LOGOUT, RootState, TOKEN, User } from '@/types';
import axios from 'axios';

export const authenticationModule: Module<AuthenticationState, RootState> = {
  state: {
    token: localStorage.getItem(TOKEN),
  },

  getters: {
    user: ({ token }): User | null => {
      if (token) {
        try {
          const body = token.split('.')[1];
          return JSON.parse(atob(body)) as User;
        } catch (error) {
          return null;
        }
      } else {
        return null;
      }
    },
  },
  mutations: {
    [TOKEN](store, payload: { token: string }) {
      store.token = payload.token;
      localStorage.setItem(TOKEN, payload.token);
    },
  },
  actions: {
    [LOGIN]({ commit }, { service, params }) {
      axios.get(`/api/login/${service}/callback`, { params })
        .then(({ data }) => {
          commit(TOKEN, { token: data });
        });
    },

    [LOGOUT]({ commit }) {
      commit(TOKEN, { token: null });
    },
  },
};

export interface AuthenticationState {
  token: string | null;
}
