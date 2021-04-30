// Element Selectors
const body = document.querySelector('body');
const navDropdown = document.querySelector('#nav-dropdown'); // <nav>
const navButton = document.querySelector('#nav-button'); // <button> that toggles nav
const navOpen = document.querySelector('#nav-open'); // <i> that displays when button opens the nav - hamburger icon
const navClose = document.querySelector('#nav-close'); // <i> that displays when button closes the nav - times icon

const images = document.querySelectorAll('.grid__image');
const slides = document.querySelectorAll('.modal__slide');

const imageGridModal = document.querySelector('#image-grid-modal');
const imageGridModalClose = document.querySelector('#image-grid-modal-close');
const imageGridModalNext = document.querySelector('#image-grid-modal-next');
const imageGridModalPrevious = document.querySelector('#image-grid-modal-previous');
const imageGridModalCaption = document.querySelector('#image-grid-modal-caption');
const imageGridModalCaptionLink = document.querySelector('#image-grid-modal-caption-link');

// Nav Functions

function isNavOpen() {
  return navDropdown.classList.contains('nav__dropdown--open');
}

function openNav() {
  // Opening the nav menu
  body.classList.add('no-scroll');
  navDropdown.classList.add('nav__dropdown--open');


  // Accessibility attributes
  navDropdown.removeAttribute('aria-hidden'); // MDN prefers removing aria-hidden instead of setting aria-hidden="false", because the latter is inconsistently applied across browsers
  navButton.setAttribute('aria-expanded', 'true'); // When the menu is displayed, the trigger button should have aria-expanded="true"; https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-14


  // Change button icon
  navOpen.classList.add('hidden');
  navClose.classList.remove('hidden');
}


function closeNav() {
  // Closing the nav menu
  body.classList.remove('no-scroll');
  navDropdown.classList.remove('nav__dropdown--open');

  // Accessibility attributes
  navDropdown.setAttribute('aria-hidden', 'true');
  navButton.removeAttribute('aria-expanded'); // Specs recommend that aria-expanded is not present when the menu is hidden. https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-14
  
  // Change button icon
  navOpen.classList.remove('hidden');
  navClose.classList.add('hidden');
}

function toggleNav() {
  if (isModalOpen()) {
    return;
  }

  if (isNavOpen()) {
    closeNav();
  } else {
    openNav();
  }
}

// Nav Event Listeners
navButton.addEventListener('click', toggleNav);






// Image Modal Box Functions

let currentSlide = 0; // the index of the currently-selected slide
const totalSlides = slides.length;

// Returns true if modal box is open, false if not
function isModalOpen() {
  if (imageGridModal !== null) {
    return !imageGridModal.classList.contains('hidden');
  } else {
    return false;
  }
}


// Closes all slides
function closeSlides() {
  slides.forEach(slide => slide.classList.remove('modal__slide--active'));
}


// Takes a slide element as an argument, opens that slide
function openSlide(slide) {
  closeSlides();
  slide.classList.add('modal__slide--active'); // Activating the slide by adding modal__slide--active class
  const image = slide.firstElementChild; // 
  // for performance purposes, the high resolution images are not all downloaded when the page loads
  // srcs to the high resolution images are stored in each <img>'s data-src attribute
  // So must check whether the image has been loaded yet, and if not, load it by setting the src to the correct value 
  if (!image.getAttribute("src")) {
    image.src = image.dataset.src;
  }

  imageGridModalCaption.textContent = image.dataset.caption;
  imageGridModalCaptionLink.textContent = image.dataset.href;
  imageGridModalCaptionLink.href = image.dataset.href;
}

// Determines which slide should be opened when pressing the next button
function nextSlide() {
  currentSlide += 1;
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }
  const slide = slides[currentSlide];
  openSlide(slide);
}

// Determines which slide should be opened when pressing the previous button
function previousSlide() {
  currentSlide -= 1;
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  const slide = slides[currentSlide];
  openSlide(slide);
}


// Opens the main modal box
function openModal(e) {
  body.classList.add('no-scroll');
  imageGridModal.classList.remove('hidden');
  // Each thumbnail has a data-slide attribute that connects it to the correct slide
  currentSlide = Number(e.target.dataset.slide);
  const slide = slides[currentSlide]; // Selecting the slide to open based on which image thumbnail the user clicked on

  openSlide(slide);
}

// Closes the main modal box
function closeModal() {
  closeSlides();
  body.classList.remove('no-scroll');
  imageGridModal.classList.add('hidden');
}

function toggleModal(e) {
  if (imageGridModal.classList.contains('hidden')) {
    openModal(e);
  } else {
    closeModal();
  }
}


// Image Modal Box Event Listeners

if (images !== null) {
  images.forEach(image => image.addEventListener('click', toggleModal));
}

if (imageGridModalClose !== null) {
  imageGridModalClose.addEventListener('click', closeModal);
}

if (imageGridModalNext !== null) {
  imageGridModalNext.addEventListener('click', nextSlide);
}

if (imageGridModalPrevious !== null) {
  imageGridModalPrevious.addEventListener('click', previousSlide);
}

// Body no-scroll Click Listeners

body.addEventListener('click', e => {
  if (e.target.classList.contains('no-scroll')) {
    if (isNavOpen()) {
      closeNav();
    }
    if (isModalOpen()) {
      closeModal();
    }
  }
});
