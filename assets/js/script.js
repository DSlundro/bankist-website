'use strict';

/****************************************************************************************
*****************************************************************************************
@START  => @DOM @ELEMENTS
*****************************************************************************************
****************************************************************************************/

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');

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
(() => {
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
})();

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
    // Target returns teh element that triggered the event
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

/****************************************************************************************
*****************************************************************************************
@END  =>  @NAVIGATION
*****************************************************************************************
****************************************************************************************/


/* BUTTON SCROLLING */
btnScrollTo.addEventListener('click', e => section1.scrollIntoView({behavior: 'smooth'}));




/* 
1. IIFE
2. Smoth Scrolling, 
3. Bubbling, Capturing, Delegation,
4. 
*/