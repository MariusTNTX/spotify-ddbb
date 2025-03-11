import { ReleaseType } from "./types";

export const SPOTIFY_ORDERED_TYPES: ReleaseType[] = [
  'FULL LENGTH', 
  'ALBUM', 
  'EP', 
  'COMPILATION', 
  'LIVE', 
  'DEMO', 
  'SINGLE',
];

export const SPIRIT_ORDERED_TYPES: ReleaseType[] = [
  'FULL LENGTH', 
  'EP', 
  'COMPILATION', 
  'LIVE', 
  'ALBUM',
  'DEMO', 
  'SINGLE',
];

export const INITIAL_REPLACEMENTS: { regexp: RegExp, replace: string }[] = [
  // Expressions
  { regexp: /&/g, replace: ' and ' },
  { regexp: /^(the|an|a)/, replace: ' ' },
  // Special Characters
  { regexp: /[áàâäã]/g, replace: 'a' },
  { regexp: /[éèêë]/g, replace: 'e' },
  { regexp: /[íìîï]/g, replace: 'i' },
  { regexp: /[óòôöõ]/g, replace: 'o' },
  { regexp: /[úùûü]/g, replace: 'u' },
  { regexp: /[ñ]/g, replace: 'n' },
  { regexp: /[ç]/g, replace: 'ç' },
];

export const NORMALICE_REPLACEMENTS: { regexp: RegExp, replace: string }[] = [
  // Album Tags
  { regexp: /[\(\[\:\-].?\d{2}th.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?\d{4}.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?a capella.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?anniversary.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?best.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?bonus.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?comment.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?deluxe.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?early.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?edit.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?ep.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?expand.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?feat\..*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?live.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?mix.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?orchestr.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?radio.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?re\-.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?remaster.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?remix.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?rmx.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?special.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?the best.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?tour.*/g, replace: ' ' },
  { regexp: /[\(\[\:\-].?(january|february|march|april|may|june|july|august|september|october|november|december).*/g, replace: ' ' },
];

export const FINAL_REPLACEMENTS: { regexp: RegExp, replace: string }[] = [
  // Only Alphanumeric
  { regexp: /[^a-z1-9]/g, replace: ' ' },

  // Space Control
  { regexp: /\s+/g, replace: ' ' },
];