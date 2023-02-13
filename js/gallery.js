import birds from '../birds.js';
const gallery = () => {
    let mainGalleryWrapper = document.querySelector('.main-gallery__wrapper');
    let navListItemLan = document.querySelector('.nav__list-item-lan'); // LANG

    function audioPlayer(block, song, audio, volumeSlider,
    faVolumeUp, faVlumeDown,seekSlider, currentTime, totalDuration){

    audio.src = song;
    const playpauseTrackGallery =  block.querySelector('.playpause-track-gallery');
    
    let isPlaying = false,
        trackIndex = 0,
        updateTimer;

        loadTrack(trackIndex);

        function loadTrack(trackIndex){
          clearInterval(updateTimer); // обновляем таймер при вызове функц loadTrack
          reset(); // сбрасываем время на 00 и полное время на 00
          updateTimer = setInterval(setUpdate, 1000); // обновляем таймер каждую сек
        }
        
        function reset(){
          currentTime.textContent = "00:00";
          totalDuration.textContent = "00:00";
          seekSlider.value = 0;
        }

    //запуск трека
    function playpauseTrack(){
        isPlaying ? pauseTrack() : playTrack();
    }
    playpauseTrackGallery.addEventListener('click', playpauseTrack);
    //запуск трека

    function playTrack(){
        audio.play();
        isPlaying = true;
        trackArt.classList.add('rotate');
        playpauseTrackGallery.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
    }
        
    function pauseTrack(){
        audio.pause();
        isPlaying = false;
        trackArt.classList.remove('rotate');
        playpauseTrackGallery.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
    }

    // громкость звука
    function setVolume(){
    audio.volume = volumeSlider.value / 100;
    }
    volumeSlider.addEventListener('mousemove', setVolume);
    
    function volumeTurnOff(){
    audio.volume = 0;
    volumeSlider.value = 0;
    }
    function volumeTurnOn(){
    audio.volume = '0.99';
    volumeSlider.value = '100';
    }
    
    faVolumeUp.addEventListener('click', volumeTurnOn);
    faVlumeDown.addEventListener('click', volumeTurnOff);
    // громкость звука

    // ползунок перемотки 
    function seekTo(){
    let seekto = audio.duration * (seekSlider.value / 100);
    audio.currentTime = seekto;
    console.log(audio);
    }
    seekSlider.addEventListener('change', seekTo);
    // ползунок перемотки end

    function setUpdate(){
        let seekPosition = 0;
        if(!isNaN(audio.duration)){
            seekPosition = audio.currentTime * (100 / audio.duration);
            seekSlider.value = seekPosition;
        
            let currentMinutes = Math.floor(audio.currentTime / 60);
            let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        
            let durationMinutes = Math.floor(audio.duration / 60);
            let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
        
        
            if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
            if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
            if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
            currentTime.textContent = currentMinutes + ":" + currentSeconds;
            totalDuration.textContent = durationMinutes + ":" + durationSeconds;
            if(currentTime.textContent === totalDuration.textContent){
                pauseTrack();
            }
        
        }
}
    
}

  const createBirdCard = (bird) => {
    const player = document.createElement("div");
    player.classList.add("player-gallery");

    const wrapperPlayer = document.createElement("div");
    wrapperPlayer.classList.add("wrapper__player");
    wrapperPlayer.classList.add("wrapper__player-gallery");
    player.append(wrapperPlayer);

    const details = document.createElement("div");
    details.classList.add("details");
    wrapperPlayer.append(details);

    const trackArt = document.createElement("div");
    trackArt.classList.add("track-art");
    trackArt.classList.add("track-art-gallery");

    trackArt.style.backgroundImage = `url(${bird.image})`;
    const trackNameWrapper = document.createElement("div");
    trackNameWrapper.classList.add("track-name__wrapper");

    details.append(trackArt);
    details.append(trackNameWrapper);

    const trackNameGallery = document.createElement("div");
    const trackArtistGallery = document.createElement("div");
    trackNameGallery.classList.add("track-name-gallery");
    trackArtistGallery.classList.add("track-artist-gallery");
    
    if(localStorage.getItem('lang') === 'ru'){
        trackNameGallery.textContent = `${bird.name}`;
    }else{
        trackNameGallery.textContent = `${bird.nameEn}`;
    }
    
    
    trackArtistGallery.textContent = `${bird.species}`;

    trackNameWrapper.append(trackNameGallery);
    trackNameWrapper.append(trackArtistGallery);
    
    const sliderContainer1 = document.createElement("div");
    sliderContainer1.classList.add("slider__container");
    wrapperPlayer.append(sliderContainer1);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    sliderContainer1.append(buttons);

    const playpauseTrack = document.createElement("div");
    playpauseTrack.classList.add("playpause-track");
    playpauseTrack.classList.add("playpause-track-gallery");
    playpauseTrack.innerHTML = '<i class="fa fa-play-circle fa-3x">';
    buttons.append(playpauseTrack);

    const currentTime = document.createElement("div");
    currentTime.classList.add("current-time");
    currentTime.classList.add("current-time-gallery");
    currentTime.textContent = '00:00';
    sliderContainer1.append(currentTime);

    const seekSlider = document.createElement("input");
    seekSlider.classList.add("seek__slider");
    seekSlider.classList.add("seek__slider-gallery");
    seekSlider.type = 'range';
    seekSlider.min = '1';
    seekSlider.max = '100';
    seekSlider.setAttribute('value' , '0');
    sliderContainer1.append(seekSlider);

    const totalDuration = document.createElement("div");
    totalDuration.classList.add("total-duration");
    totalDuration.classList.add("total-duration-gallery");
    totalDuration.textContent = '00:30';
    sliderContainer1.append(totalDuration);

    const sliderContainer2 = document.createElement("div");
    sliderContainer2.classList.add("slider__container");
    wrapperPlayer.append(sliderContainer2);

    const descriptionGallery = document.createElement("div");
    descriptionGallery.classList.add('description__gallery');

    if(localStorage.getItem('lang') === 'ru'){
        descriptionGallery.textContent = `${bird.description}`;
    }else{
        descriptionGallery.textContent = `${bird.descriptionEn}`;
    }
    
    wrapperPlayer.append(descriptionGallery);
   
    const faVolumeDown = document.createElement("i");
    faVolumeDown.classList.add("fa");
    faVolumeDown.classList.add("fa-volume-down");
    faVolumeDown.classList.add("fa-volume-down-gallery");

    sliderContainer2.append(faVolumeDown);

    const volumeSlider = document.createElement("input");
    volumeSlider.classList.add("volume__slider");
    volumeSlider.classList.add("volume__slider-gallery");
    volumeSlider.type = 'range';
    volumeSlider.min = '1';
    volumeSlider.max = '100';
    volumeSlider.setAttribute('value' , '99');
    sliderContainer2.append(volumeSlider);

    const faVolumeUp = document.createElement("i");
    faVolumeUp.classList.add("fa");
    faVolumeUp.classList.add("fa-volume-up");
    faVolumeUp.classList.add("fa-volume-up-gallery");

    sliderContainer2.append(faVolumeUp);

    const audioGallery = new Audio();
    audioPlayer(buttons, bird.audio, audioGallery, volumeSlider,
                faVolumeUp, faVolumeDown,seekSlider,currentTime, totalDuration);
    return player;
  };

 function createCard(){
    mainGalleryWrapper.innerHTML = '';
    birds.forEach((el) => {
        el.forEach((bird) => {
            mainGalleryWrapper.append(createBirdCard(bird));
        });
    });
 } 
 createCard();

 navListItemLan.addEventListener('click', createCard);
let trackArt = document.querySelector('.track-art-gallery');

};
export default gallery;