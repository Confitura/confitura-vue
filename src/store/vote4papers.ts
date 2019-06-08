import { Module } from 'vuex';
import { Like, RootState, Vote } from '@/types';
import axios from 'axios';
import * as jsSHA from 'jssha';

export const LOAD_VOTES = 'LOAD_VOTES';
export const SAVE_VOTE = 'SAVE_VOTE';
export const LOAD_LIKES = 'LOAD_LIKES';
export const SAVE_LIKE = 'SAVE_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';

const SET_VOTES = 'SET_VOTES';
const SET_LIKES = 'SET_LIKES';
const V4P_TOKEN = 'V4P_TOKEN';
const LIKE_TOKEN = 'LIKE_TOKEN';

export const vote4PapersModule: Module<Vote4PapersState, RootState> = {
  state: {
    votes: [],
    likes: [],
  },
  getters: {},
  mutations: {
    [SET_VOTES](store, payload: { votes: Vote[] }) {
      store.votes = payload.votes;
    },
    [SET_LIKES](store, payload: { likes: Like[] }) {
      store.likes = payload.likes;
    },
  },
  actions: {
    [LOAD_VOTES]({ commit, rootState, rootGetters }) {
      const token = getToken(V4P_TOKEN);
      return axios.post<EmbeddedVotes>(`/api/votes/start/${token}`)
        .then((it) => commit(SET_VOTES, { votes: it.data._embedded.votes }));
    },
    [SAVE_VOTE]({ commit }, payload: { vote: Vote }) {
      return axios.post<EmbeddedVotes>(`/api/votes/`, payload.vote);
    },
    [LOAD_LIKES]({ commit, rootState, rootGetters }) {
      const token = getToken(V4P_TOKEN);
      return axios.get<Like[]>(`/api/likes`, { params: { token } })
        .then((it) => commit(SET_LIKES, { likes: it.data }));
    },
    [SAVE_LIKE]({ commit }, payload: { presentationId: string }) {
      const token = getToken(V4P_TOKEN);
      return axios.post(`/api/presentations/${payload.presentationId}/likes`, { token });
    },
    [DELETE_LIKE]({ commit }, payload: { id: string }) {
      const token = getToken(V4P_TOKEN);
      return axios.delete(`/api/likes/${payload.id}`);
    },
  },
};

export interface Vote4PapersState {

  votes: Vote[];
  likes: Like[];
}

interface EmbeddedVotes {
  _embedded: { votes: Vote[] };
}

function getToken(key: string) {
  const localStorageToken = localStorage.getItem(key);
  if (localStorageToken) {
    return localStorageToken;
  } else {
    const token = generateToken();
    localStorage.setItem(key, token);
    return token;
  }

}

function generateToken() {
  const jssha = (jsSHA as any);
  const sha = new jssha('SHA-256', 'TEXT');
  sha.update(`${new Date().getMilliseconds()}${Math.random()}`);
  return sha.getHash('HEX');

}
