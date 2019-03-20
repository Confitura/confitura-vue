export interface RootState {
  headerTheme: string;
  headerHeight: number;
  windowWidth: number;
  date: string;
  partners: Partner[];
  token: string;
  user?: User;
}

export const CHANGE_HEADER_THEME = 'CHANGE_HEADER_THEME';
export const WINDOW_RESIZED = 'WINDOW_RESIZED';
export const LOAD_PARTNERS = 'LOAD_PARTNERS';
export const LOAD_PARTNER_BY_ID = 'LOAD_PARTNER_BY_ID';
export const TOKEN = 'TOKEN';
export const USER_FROM_TOKEN = 'USER_FROM_TOKEN';

export const LOGIN = 'LOGIN';

export interface User {
  sub: string;
  isVolunteer: boolean;
  isAdmin: boolean;
  isNew: boolean;
  isSpeaker: boolean;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  www: string;
  type: '' | 'platinum' | 'gold' | 'silver' | 'bronze';
}
