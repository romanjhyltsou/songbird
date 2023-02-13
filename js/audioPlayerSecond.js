import birds from '../birds.js';
import langArr from '../lang.js';
const audioPlayer = () => {
    let trackArt = document.querySelector('.track-art-second'),
        trackName = document.querySelector('.track-name-second'),
        trackArtist = document.querySelector('.track-artist-second'),

        playpauseBtn = document.querySelector('.playpause-track-second'),

        seekSlider = document.querySelector('.seek__slider-second'),
        currTime = document.querySelector('.current-time-second'),
        totalDuration = document.querySelector('.total-duration-second'),

        volumeSlider = document.querySelector('.volume__slider-second'),
        currTrackSecond = document.createElement('audio'),

        faVlumeDown = document.querySelector('.fa-volume-down-second'),
        faVolumeUp = document.querySelector('.fa-volume-up-second'),

        answerItemLink = document.querySelectorAll('.answer__item-link'),
        btnSecond = document.querySelector('.btn-second'),

        descriptionGallery = document.querySelector('.description__container-des'),

        mainResultsBtnMain = document.querySelector('.main-results__btn-main'),
        mainResultsClose = document.querySelector('.main-results__close'),

        navListLinkLan = document.querySelector('.nav__list-link-lan'), // LANG
        navListLinkMain = document.querySelector('.nav__list-link-main'), // LANG
        navListLinkGame = document.querySelector('.nav__list-link-game'), // LANG
        mainItemImg = document.querySelector('.main__item-img'), // LANG
        footerItemImgFooter = document.querySelector('.footer__item-img-footer'), // LANG  
        scoreText = document.querySelector('.score-text'), // LANG 
        footerWapperYearRights = document.querySelector('.footer__wrapper-year-rights'), // LANG 
        

        trackIndex = 0,
        isPlaying = false,
        updateTimer;

        loadTrack(trackIndex);

//translation // LANG
    let lang = localStorage.getItem('lang');

        if(lang === null){
            lang = 'en';
            localStorage.setItem('lang', lang);
        }
            console.log(lang);
        
        navListLinkLan.addEventListener('click', ()=>{
           if(navListLinkLan.textContent === 'EN'){
            navListLinkLan.textContent = 'RU';
            navListLinkMain.textContent = langArr.home.ru;
            navListLinkGame.textContent = langArr.game.ru;
            mainItemImg.src = langArr.animquiz.ru;
            footerItemImgFooter.src = langArr.nop.ru;
            scoreText.textContent = langArr.score.ru;
            footerWapperYearRights.textContent = langArr.rights.ru;
            btnSecond.textContent = langArr.next.ru;
            lang = 'ru';
            localStorage.setItem('lang', lang);
            console.log(lang);
           }else {
            navListLinkLan.textContent = 'EN';
            navListLinkMain.textContent = langArr.home.en;
            navListLinkGame.textContent = langArr.game.en;
            mainItemImg.src = langArr.animquiz.en;
            footerItemImgFooter.src = langArr.nop.en;
            scoreText.textContent = langArr.score.en;
            footerWapperYearRights.textContent = langArr.rights.en;
            btnSecond.textContent = langArr.next.en;
            lang = 'en';
            localStorage.setItem('lang', lang);
            console.log(lang);
           }
        
        });

        if(localStorage.getItem('lang') === 'en'){ // LANG
            navListLinkLan.textContent = 'EN';
            navListLinkMain.textContent = langArr.home.en;
            navListLinkGame.textContent = langArr.game.en;
            mainItemImg.src = langArr.animquiz.en;
            footerItemImgFooter.src = langArr.nop.en;
            scoreText.textContent = langArr.score.en;
            footerWapperYearRights.textContent = langArr.rights.en;
            btnSecond.textContent = langArr.next.en;
        }else{
            navListLinkLan.textContent = 'RU';
            navListLinkMain.textContent = langArr.home.ru;
            navListLinkGame.textContent = langArr.game.ru;
            mainItemImg.src = langArr.animquiz.ru;
            footerItemImgFooter.src = langArr.nop.ru;
            scoreText.textContent = langArr.score.ru;
            footerWapperYearRights.textContent = langArr.rights.ru;
            btnSecond.textContent = langArr.next.ru;
        }

navListLinkLan.addEventListener('click', ()=> {
    loadTrackDefault();
    trackIndex = 0;
});

//translation

//reset game and default start

function loadTrackDefault(){
    trackArt.style.backgroundImage = `url(assets/img/bird-no-name.jpg)`;
    trackName.textContent = '*****';
    trackArtist.textContent = '*****';
    if(localStorage.getItem('lang') === 'ru'){
        currTrackSecond.src = langArr.instructionAudio.ru;
        descriptionGallery.textContent = langArr.instruction.ru;
    }else {
        currTrackSecond.src = langArr.instructionAudio.en;
        descriptionGallery.textContent = langArr.instruction.en;
    }
  /* Послушайте плеер и выберите название птицы */
}
loadTrackDefault();
mainResultsBtnMain.addEventListener('click', ()=> {
    trackIndex = 0;
    loadTrackDefault();
});
mainResultsClose.addEventListener('click', ()=> {
    trackIndex = 0;
    loadTrackDefault();
});
//reset game and default end
function loadTrack(trackIndex, i = 0){
    
    clearInterval(updateTimer); // обновляем таймер при вызове функц loadTrack
    reset(); // сбрасываем время на 00 и полное время на 00
    updateTimer = setInterval(setUpdate, 1000); // обновляем таймер каждую сек

    currTrackSecond.src = birds[trackIndex][i].audio;
    trackArt.style.backgroundImage = `url(${birds[trackIndex][i].image})`;

    if(localStorage.getItem('lang') === 'ru'){ // LANG
        trackName.textContent = birds[trackIndex][i].name;
        descriptionGallery.textContent = birds[trackIndex][i].description;
    }else{
        trackName.textContent = birds[trackIndex][i].nameEn;
        descriptionGallery.textContent = birds[trackIndex][i].descriptionEn;
    }
    
    trackArtist.textContent = birds[trackIndex][i].species;

    
}

answerItemLink.forEach((item, i) => {
    item.addEventListener('click', ()=> {
        loadTrack(trackIndex, i);
    });
});

btnSecond.addEventListener('click', ()=> {
    trackIndex++;
    pauseTrack();
});

function reset(){
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

//запуск трека
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

playpauseBtn.addEventListener('click', playpauseTrack);

function playTrack(){
    currTrackSecond.play();
    isPlaying = true;
    trackArt.classList.add('rotate');
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack(){
    currTrackSecond.pause();
    isPlaying = false;
    trackArt.classList.remove('rotate');
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

// ползунок перемотки 
function seekTo(){
    let seekto = currTrackSecond.duration * (seekSlider.value / 100);
    currTrackSecond.currentTime = seekto;
    console.log(currTrackSecond);
}
seekSlider.addEventListener('change', seekTo);
// ползунок перемотки end

// громкость звука
function setVolume(){
    currTrackSecond.volume = volumeSlider.value / 100;
}
volumeSlider.addEventListener('mousemove', setVolume);

function volumeTurnOff(){
    currTrackSecond.volume = 0;
    volumeSlider.value = 0;
}
function volumeTurnOn(){
    currTrackSecond.volume = '0.99';
    volumeSlider.value = '100';
}

faVolumeUp.addEventListener('click', volumeTurnOn);
faVlumeDown.addEventListener('click', volumeTurnOff);
// громкость звука

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(currTrackSecond.duration)){
        seekPosition = currTrackSecond.currentTime * (100 / currTrackSecond.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrackSecond.currentTime / 60);
        let currentSeconds = Math.floor(currTrackSecond.currentTime - currentMinutes * 60);

        let durationMinutes = Math.floor(currTrackSecond.duration / 60);
        let durationSeconds = Math.floor(currTrackSecond.duration - durationMinutes * 60);


        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
        if(currTime.textContent === totalDuration.textContent){
            pauseTrack();
        }

    }
}
};
export default audioPlayer;