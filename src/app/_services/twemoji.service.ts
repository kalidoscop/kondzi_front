import { Injectable } from '@angular/core';
import twemoji from 'twemoji';

@Injectable({
  providedIn: 'root'
})
export class TwemojiService {

  constructor() { }

  parse(element: HTMLElement) {
    twemoji.parse(element, {
      folder: 'svg',
      ext: '.svg',
    });
  }
}
