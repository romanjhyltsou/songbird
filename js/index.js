import birds from '../birds.js';
import langArr from '../lang.js';
import audioPlayer from './audioPlayer.js';
import audioPlayerSecond from './audioPlayerSecond.js';
import gallery from './gallery.js';
import nav from './nav.js';

window.addEventListener('DOMContentLoaded', () => {
"use strict";
console.log(birds);
console.log(langArr);
try{
  audioPlayer();
  audioPlayerSecond();
}catch(err){
    
}
try{
  gallery();
}catch(err){
    
}
nav();
});