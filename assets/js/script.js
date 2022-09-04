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
const btnSubmit = document.querySelector('.btn--submit-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
// Sections
const sections = document.querySelectorAll('section');
const section1 = document.querySelector('#section--1');
// Navigation
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
// Main
const imgTargets = document.querySelectorAll('img[data-src]');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

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
const modals = () => {
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
    btnSubmit.addEventListener('click', closeModal);
    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
};
modals()

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
  if(e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link--btn')){
    e.preventDefault();
    // Target returns the element that triggered the event
    const id = e.target.getAttribute('href');
    console.log(id);
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

/* REVEALING ELEMENTS ON SCROLL */
const scrollRevealing = () => {
  const revealSection = (entries, observer) => {
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  };
  
  const sectionObserve = new IntersectionObserver( revealSection, {
    root: null,
    threshold: 0.11,
  });
  
  sections.forEach( section => {
    sectionObserve.observe(section);
    //section.classList.add('section--hidden')
  });
};
scrollRevealing()

/* LAZY LOADING IMAGES */
const lazyImg = () => {
  const loadImg = (entries, observer) => {
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
      observer.unobserve(entry.target);
    });
  };
  
  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px',
  })
  
  imgTargets.forEach( img => imgObserver.observe(img));
};
lazyImg()

/* SLIDER */
const mySlider = () => {
  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => slides.forEach( (_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  });

  const activeDot = slide => {
    document.querySelectorAll('.dots__dot').forEach( dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const goToSlide = slide => {
    slides.forEach( (s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  };

  const prevSlide = () => {
    if(currentSlide === 0) currentSlide = maxSlide - 1;
    else  currentSlide--;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const nextSlide = () => {
    if(currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  init()

  // Event handlers
  sliderBtnLeft.addEventListener('click', prevSlide);
  sliderBtnRight.addEventListener('click', nextSlide);
  dotContainer.addEventListener('click', e => {
    if(e.target.classList.contains('dots__dot')){
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  })
};
mySlider();

/****************************************************************************************
*****************************************************************************************
@END  =>  @MAIN
*****************************************************************************************
****************************************************************************************/
