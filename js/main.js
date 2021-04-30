// Element Selectors
const body = document.querySelector('body');
const navDropdown = document.querySelector('#nav-dropdown'); // <nav>
const navButton = document.querySelector('#nav-button'); // <button> that toggles nav
const navOpen = document.querySelector('#nav-open'); // <i> that displays when button opens the nav - hamburger icon
const navClose = document.querySelector('#nav-close'); // <i> that displays when button closes the nav - times icon

const images = document.querySelectorAll('.grid__image');

const imageGridModal = document.querySelector('#image-grid-modal');
const imageGridModalClose = document.querySelector('#image-grid-modal-close');

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

function isModalOpen() {
  if (imageGridModal !== null) {
    return !imageGridModal.classList.contains('hidden');
  } else {
    return false;
  }
}

function openModal() {
  body.classList.add('no-scroll');
  imageGridModal.classList.remove('hidden');
}

function closeModal() {
  body.classList.remove('no-scroll');
  imageGridModal.classList.add('hidden');
}

function toggleModal() {
  if (imageGridModal.classList.contains('hidden')) {
    openModal();
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
