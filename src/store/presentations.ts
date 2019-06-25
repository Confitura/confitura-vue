import { Module } from 'vuex';
import { Presentation, RootState } from '@/types';

export const LOAD_VOTES = 'LOAD_VOTES';
export const SAVE_VOTE = 'SAVE_VOTE';

const SET_VOTES = 'SET_VOTES';
const V4P_TOKEN = 'V4P_TOKEN';

export const presentationsModule: Module<PresentationsState, RootState> = {
  state: {
    underRating: null,
  },
  getters: {},
  mutations: {},
  actions: {},
};

export interface PresentationsState {

  underRating: Presentation | null;
}

