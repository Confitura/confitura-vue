import { Module } from 'vuex';
import { RootState, UserProfile, EmbeddedUserProfiles, Vote } from '@/types';
import axios from 'axios';
import * as jsSHA from 'jssha';

export const LOAD_VOTES = 'LOAD_VOTES';
export const PERFORM_VOTE = 'PERFORM_VOTE ';
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

      axios.post<EmbeddedVotes>(`/api/votes/start/${token}`)
        .then(it => commit(SET_VOTES, { votes: it.data._embedded.votes }))
        .then(it => console.log('state', rootState))
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
  if (localStorage.getItem(V4P_TOKEN)) {
    return localStorage.getItem(V4P_TOKEN)
  } else {
    const token = generateToken();
    localStorage.setItem(V4P_TOKEN, token)
    return token;
  }

}

function generateToken() {
  const sha = new jsSHA('SHA-256', 'TEXT');
  sha.update(`${new Date().getMilliseconds()}${Math.random()}`);
  return sha.getHash('HEX');

}
