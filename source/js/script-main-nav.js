
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');


navMain.classList.remove('main-nav--nojs');


  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }

  });


  var closeToggle = document.querySelector('.main-nav__close-cross');

  closeToggle.addEventListener('click', function() {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
});
