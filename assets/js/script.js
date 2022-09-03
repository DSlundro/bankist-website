'use strict';

/****************************************************************************************
*****************************************************************************************
@START  => @DOM @ELEMENTS
*****************************************************************************************
****************************************************************************************/
// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
// Sections
const section1 = document.querySelector('#section--1');
// Navigation
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav')

/****************************************************************************************
*****************************************************************************************
@END  => @DOM @ELEMENTS
*****************************************************************************************
****************************************************************************************/


/****************************************************************************************
 *****************************************************************************************
@START  => @UTILITY
 *****************************************************************************************
 ****************************************************************************************/

/* MODALS */
  const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  for (let i = 0; i < btnsOpenModal.length; i++){
    btnsOpenModal[i].addEventListener('click', openModal);

    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal)
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

/****************************************************************************************
*****************************************************************************************
@END  => @UTILITY
*****************************************************************************************
****************************************************************************************/


/****************************************************************************************
*****************************************************************************************
@START  =>  @NAVIGATION
*****************************************************************************************
****************************************************************************************/
/* SCROLLING NAV - EVENT DELEGATION */
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
navLinks.addEventListener('click', e =>{
  // Matching strategy
  if(e.target.classList.contains('nav__link')){
    e.preventDefault();
    // Target returns the element that triggered the event
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

/* STICKY NAVIGATION */
  const initialCoords = section1.getBoundingClientRect();
  window.addEventListener('scroll', () => {
    if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  })


/****************************************************************************************
*****************************************************************************************
@END  =>  @NAVIGATION
*****************************************************************************************
****************************************************************************************/


/****************************************************************************************
*****************************************************************************************
@START  =>  @MAIN
*****************************************************************************************
****************************************************************************************/

/* BUTTON SCROLLING */
btnScrollTo.addEventListener('click', e => section1.scrollIntoView({behavior: 'smooth'}));

/* TABBED COMPONENT */
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if(!clicked) return;
  // Remove active classes
  tabs.forEach( t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach( c => c.classList.remove('operations__content--active'));
  // Active tab
  clicked.classList.add('operations__tab--active')
  // Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

/****************************************************************************************
*****************************************************************************************
@END  =>  @MAIN
*****************************************************************************************
****************************************************************************************/






