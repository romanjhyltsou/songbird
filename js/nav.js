const nav = () => {
   const footerItemImgPlay = document.querySelector('.footer__item-img-play');
   const mainGallery = document.querySelector('.main-gallery');
   const mainWrapper = document.querySelector('.main__wrapper');
   const footerWrapperPlay = document.querySelector('.footer__wrapper-play');
   const footerWrapperImg = document.querySelector('.footer__wrapper-img');
   const navListItemMain = document.querySelector('.nav__list-item-main');
   const navListItemGame = document.querySelector('.nav__list-item-game');
   const navListItem = document.querySelectorAll('.nav__list-item');
   const mainGame = document.querySelector('.main-game');
   
   const footerWrapperYear = document.querySelector('.footer__wrapper-year');
   const footerGameWrapperYear = document.querySelector('.footer-game__wrapper-year');
   const footerWrapperRs = document.querySelector('.footer__wrapper-rs');

   
function mainClose() {
  mainWrapper.style.display = 'none';
  footerWrapperPlay.style.display = 'none';
  footerWrapperImg.style.display = 'none';
}

function mainDefault() {
  footerWrapperRs.style.display = 'block';
  footerWrapperRs.style.width = 'auto';
  footerWrapperRs.style.justifyContent = 'flex-start';
  footerWrapperRs.style.alignItems = 'stretch';
}
function gameDefault() {
  footerWrapperRs.style.display = 'flex';
  footerWrapperRs.style.width = '100%';
  footerWrapperRs.style.justifyContent = 'space-between';
  footerWrapperRs.style.alignItems = 'end';
}

function mainActive() {
  mainWrapper.style.display = 'block';
  footerWrapperPlay.style.display = 'block';
  footerWrapperImg.style.display = 'block';
}

footerItemImgPlay.addEventListener('click', ()=> {
  mainGallery.style.display = 'block';
  mainClose();

  gameDefault();
});

navListItemGame.addEventListener('click', ()=> {
    mainClose();
    mainGame.style.display = 'block';
    mainGallery.style.display = 'none';

    footerGameWrapperYear.style.display = 'block';
    footerWrapperYear.style.display = 'none';

    mainDefault();
    gameDefault();
});

navListItemMain.addEventListener('click', ()=> {
  mainGame.style.display = 'none';
  mainGallery.style.display = 'none';
  mainActive();


  footerGameWrapperYear.style.display = 'none';
  footerWrapperYear.style.display = 'block';

  mainDefault();
});


function removeClassNavList() {
  navListItem.forEach(item => {
    item.classList.remove('nav__list-item-active');
  });
}

navListItem.forEach((item, i) => {

  item.addEventListener('click', ()=> {
    removeClassNavList();
    item.classList.add('nav__list-item-active');
  });

});

   
};
export default nav;