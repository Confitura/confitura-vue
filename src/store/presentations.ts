import { Module } from 'vuex';
import { Presentation, PresentationRate, RootState } from '@/types';

export const LOAD_VOTES = 'LOAD_VOTES';
export const SAVE_VOTE = 'SAVE_VOTE';

const SET_VOTES = 'SET_VOTES';
const V4P_TOKEN = 'V4P_TOKEN';

export const SET_PRESENTATION_UNDER_RATE = 'SET_PRESENTATION_UNDER_RATE';
export const presentationsModule: Module<PresentationsState, RootState> = {
  state: {
    underRating: {rate:0, presentation: {id:'', title: ''}},
  },
  getters: {},
  mutations: {
    [SET_PRESENTATION_UNDER_RATE](store, payload: { presentationRate: PresentationRate }) {
      store.underRating = payload.presentationRate;
    },
  },
  actions: {},
};

export interface PresentationsState {

  underRating: PresentationRate | null;
}

