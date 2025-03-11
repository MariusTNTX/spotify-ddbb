import { Injectable } from '@angular/core';
import { Track, Release } from '../interfaces';
import { FINAL_REPLACEMENTS, INITIAL_REPLACEMENTS, NORMALICE_REPLACEMENTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NameManagerService {

  constructor() { }

  public normalizeName(name: string, shorten: boolean = true): string {
    const REPLACEMENTS: { regexp: RegExp, replace: string }[] = [ ...INITIAL_REPLACEMENTS, ...(shorten ? NORMALICE_REPLACEMENTS : []), ...FINAL_REPLACEMENTS ];
    let cleanedName = shorten ? name.trim().toLowerCase().split(/[\(\-\−\:]/)[0] : name.trim().toLowerCase();
    return REPLACEMENTS.reduce((res: string, { regexp, replace }) => res.replace(regexp, replace), cleanedName).trim();
  };

  public matchedNames(origin: Track | Release | string, target: Track | Release | string, shorten: boolean = true){
    let normalicedOrigin: string = (typeof(origin) !== 'string' && typeof(target) !== 'string') ? origin.normalicedName : origin + '';
    let normalicedTarget: string = (typeof(origin) !== 'string' && typeof(target) !== 'string') ? target.normalicedName : target + '';
    let standaricedOrigin: string = (typeof(origin) !== 'string' && typeof(target) !== 'string') ? origin.standaricedName : origin + '';
    let standaricedTarget: string = (typeof(origin) !== 'string' && typeof(target) !== 'string') ? target.standaricedName : target + '';
    if(shorten) return normalicedOrigin === normalicedTarget || normalicedOrigin.startsWith(normalicedTarget) || normalicedTarget.startsWith(normalicedOrigin);
    return standaricedOrigin === standaricedTarget || standaricedOrigin.startsWith(standaricedTarget) || standaricedTarget.startsWith(standaricedOrigin);
  }

}
