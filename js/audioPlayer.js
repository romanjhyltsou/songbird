import birds from '../birds.js';
import langArr from '../lang.js';
const audioPlayer = () => {
    let trackArt = document.querySelector('.track-art'),
        trackName = document.querySelector('.track-name'),
        trackArtist = document.querySelector('.track-artist'),

        playpauseBtn = document.querySelector('.playpause-track'),

        seekSlider = document.querySelector('.seek__slider'),
        currTime = document.querySelector('.current-time'),
        totalDuration = document.querySelector('.total-duration'),

        volumeSlider = document.querySelector('.volume__slider'),
        currTrack = document.createElement('audio'),

        faVlumeDown = document.querySelector('.fa-volume-down'),
        faVolumeUp = document.querySelector('.fa-volume-up'),

        answerItemLink = document.querySelectorAll('.answer__item-link'),
        
        btnMain = document.querySelector('.btn-main'),

        footerWrapperYearScore = document.querySelector('.footer__wrapper-year-score-sum'),

        pagiItem = document.querySelectorAll('.pagi__item'),

        mainResultsBtnMain = document.querySelector('.main-results__btn-main'),
        mainResultsClose = document.querySelector('.main-results__close'),

        navListItemLan = document.querySelector('.nav__list-item-lan'), // LANG
        mainResultsOut = document.querySelector('.main-results__out'), // LANG
        mainResultsPossible = document.querySelector('.main-results__possible'), // LANG

        currTrackTrue = document.createElement('audio'),
        currTrackFalse = document.createElement('audio'),

        trackIndex = 0,
        isPlaying = false,
        updateTimer,
        scoreVar = 5,
        scoreSum = 0,
        birdName = '',
        trackArrIndex = [];

// СПИСОК 

 currTrackTrue.src = 'assets/audio/true.mp3';
 currTrackFalse.src = 'assets/audio/false.mp3';
    
btnMain.disabled = true;

loadTrack(trackIndex);

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function loadTrack(trackIndex){
    clearInterval(updateTimer); // обновляем таймер при вызове функц loadTrack
    reset(); // сбрасываем время на 00 и полное время на 00

    for(let i = 0; i < birds[trackIndex].length; i++){
        trackArrIndex.push(i);
    }

    for(let i = 0; i < answerItemLink.length; i++){
        if(localStorage.getItem('lang') === 'ru'){// LANG
            pagiItem[i].innerHTML = langArr.suspiciousBirds[i].ru;
            answerItemLink[i].innerHTML = birds[trackIndex][i].name;
        }else{
            answerItemLink[i].innerHTML = birds[trackIndex][i].nameEn;
            pagiItem[i].innerHTML = langArr.suspiciousBirds[i].en;
        }
        answerItemLink[i].classList.add('answer__item-minus-score');
    }
    shuffle(trackArrIndex);

    if(localStorage.getItem('lang') === 'ru'){// LANG
        birdName  = birds[trackIndex][trackArrIndex[0]].name;
    }else{
        birdName  = birds[trackIndex][trackArrIndex[0]].nameEn; 
    }
    currTrack.src = birds[trackIndex][trackArrIndex[0]].audio;

    console.log(birdName);

    answerItemLink.forEach( item => {
        item.style.color = `inherit`;
        if(item.innerHTML === birdName){
            item.classList.remove('answer__item-minus-score');
            item.classList.add('answer__item-score-active');
        }
    });
    currTrack.load();
    
    trackArt.style.backgroundImage = `url(assets/img/bird-no-name.jpg)`; //${birds[trackIndex][trackIndex].image}
    trackName.textContent = '*****';//birds[trackIndex][trackArrIndex[0]].name
    trackArtist.textContent = '*****';//birds[trackIndex][trackArrIndex[0]].species
    pagiItem[trackIndex].style.color = '#c366af';
    updateTimer = setInterval(setUpdate, 1000); // обновляем таймер каждую сек
}

answerItemLink.forEach( item => {
  item.addEventListener('click', ()=> {
    if(item.classList.contains('answer__item-minus-score')){
        scoreVar--;
        item.classList.remove('answer__item-minus-score');
        item.style.color = `red`;
        currTrackFalse.play();
        console.log(scoreVar);
    }else if(item.classList.contains('answer__item-score-active')){
        btnMain.disabled = false;
        btnMain.classList.add('nav__list-item-active');

        currTrackTrue.play();
        pauseTrack();

        answerItemLink.forEach( item => {
            item.classList.remove('answer__item-minus-score');
            item.classList.remove('answer__item-score-active');
        });

        scoreSum += scoreVar;
        footerWrapperYearScore.textContent = scoreSum;
        trackArt.style.backgroundImage = ` url(${birds[trackIndex][trackArrIndex[0]].image})`;
        item.style.color = `green`;
        if(localStorage.getItem('lang') === 'en'){
            trackName.textContent = birds[trackIndex][trackArrIndex[0]].nameEn;
        }else{
            trackName.textContent = birds[trackIndex][trackArrIndex[0]].name;
        }

        trackArtist.textContent = birds[trackIndex][trackArrIndex[0]].species;
    }

  });
});


btnMain.addEventListener('click', ()=> {
  trackIndex++;
  scoreVar = 5;
  btnMain.disabled = true;
  btnMain.classList.remove('nav__list-item-active');
  console.log('trackIndex:', trackIndex);
  pauseTrack();
 
  if(trackIndex > pagiItem.length - 1){
    trackIndex = 0;
    document.querySelector('.main-results__descr-score').textContent = `${scoreSum}`;
    document.querySelector('.main-game__wrapper').style.display = 'none';
    document.querySelector('.main-results').style.display = 'block';
    
    if(scoreSum === 30){
        if(localStorage.getItem('lang') === 'en'){
            document.querySelector('.main-results__message').textContent = langArr.congratulations.en;
            mainResultsOut.textContent = langArr.out.en;
            mainResultsPossible.textContent = langArr.possible.en;
            mainResultsBtnMain.textContent = langArr.btnagain.en;
        }else{
            document.querySelector('.main-results__message').textContent = langArr.congratulations.ru;
            mainResultsOut.textContent = langArr.out.ru;
            mainResultsPossible.textContent = langArr.possible.ru;
            mainResultsBtnMain.textContent = langArr.btnagain.ru;
        }
        
        document.querySelector('.main-results__descr-score').style.color = '#4B9200';
        mainResultsBtnMain.disabled = true;
    }else{
        if(localStorage.getItem('lang') === 'en'){
            document.querySelector('.main-results__message').textContent = langArr.progress.en;
            mainResultsOut.textContent = langArr.out.en;
            mainResultsPossible.textContent = langArr.possible.en;
            mainResultsBtnMain.textContent = langArr.btnagain.en;
        }else{
            document.querySelector('.main-results__message').textContent = langArr.progress.ru;
            mainResultsOut.textContent = langArr.out.ru;
            mainResultsPossible.textContent = langArr.possible.ru;
            mainResultsBtnMain.textContent = langArr.btnagain.ru;
        }
        document.querySelector('.main-results__descr-score').style.color = 'red';
        mainResultsBtnMain.disabled = false;
    }

  }

  loadTrack(trackIndex);
  pagiItem[trackIndex].style.color = '#c366af';
});

//reset game  start
 function resetGame (){
    loadTrack(trackIndex = 0); // LANG
    scoreVar = 5;// LANG
    scoreSum = 0;// LANG
    document.querySelector('.main-game__wrapper').style.display = 'block';
    document.querySelector('.main-results').style.display = 'none';

    for(let i = 1; i < pagiItem.length; i++){
      pagiItem[i].style.color = 'initial';
    }
    scoreSum = 0;
    footerWrapperYearScore.textContent = '0';
    
}
mainResultsBtnMain.addEventListener('click', resetGame);
mainResultsClose.addEventListener('click', resetGame);
navListItemLan.addEventListener('click', ()=> {
    resetGame();
});// LANG
//reset game  end

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
    currTrack.play();
    isPlaying = true;
    trackArt.classList.add('rotate');
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}

function pauseTrack(){
    currTrack.pause();
    isPlaying = false;
    trackArt.classList.remove('rotate');
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}

// ползунок перемотки 
function seekTo(){
    let seekto = currTrack.duration * (seekSlider.value / 100);
    currTrack.currentTime = seekto;
}
seekSlider.addEventListener('change', seekTo);
// ползунок перемотки end

// громкость звука
function setVolume(){
    currTrack.volume = volumeSlider.value / 100;
}
volumeSlider.addEventListener('mousemove', setVolume);

function volumeTurnOff(){
    currTrack.volume = 0;
    volumeSlider.value = 0;
}
function volumeTurnOn(){
    currTrack.volume = '0.99';
    volumeSlider.value = '100';
}

faVolumeUp.addEventListener('click', volumeTurnOn);
faVlumeDown.addEventListener('click', volumeTurnOff);
// громкость звука

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(currTrack.duration)){
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);

        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);


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