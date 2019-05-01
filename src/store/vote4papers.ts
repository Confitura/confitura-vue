import { Module } from 'vuex';
import { RootState, UserProfile, EmbeddedUserProfiles, Vote } from '@/types';
import axios from 'axios';
import * as jsSHA from 'jssha';

export const LOAD_VOTES = 'LOAD_VOTES';
export const SAVE_VOTE = 'SAVE_VOTE';

const SET_VOTES = 'SET_VOTES';
const V4P_TOKEN = 'V4P_TOKEN';

export const vote4PapersModule: Module<Vote4PapersState, RootState> = {
  state: {
    votes: []
  },
  getters: {},
  mutations: {
    [SET_VOTES](store, payload: { votes: Vote[] }) {
      store.votes = payload.votes;
    },
  },
  actions: {
    [LOAD_VOTES]({ commit, rootState, rootGetters }) {
      let token = getToken();

      return axios.post<EmbeddedVotes>(`/api/votes/start/${token}`)
        .then(it => commit(SET_VOTES, { votes: it.data._embedded.votes }))
        .then(it => console.log('state', rootState))
    },
    [SAVE_VOTE]({ commit }, payload: { vote: Vote }) {
      return axios.post<EmbeddedVotes>(`/api/votes/`, payload.vote)
    },
  },
};

export interface Vote4PapersState {

  votes: Vote[]
}

interface EmbeddedVotes {
  _embedded: { votes: Vote[] };
}

function getToken() {
  let localStorageToken = localStorage.getItem(V4P_TOKEN);
  if (localStorageToken) {
    return localStorageToken
  } else {
    const token = generateToken();
    localStorage.setItem(V4P_TOKEN, token);
    return token;
  }

}

function generateToken() {
  let jssha = (jsSHA as any);
  const sha = new jssha('SHA-256', 'TEXT');
  sha.update(`${new Date().getMilliseconds()}${Math.random()}`);
  return sha.getHash('HEX');

}
