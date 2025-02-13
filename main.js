
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 1, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('hero-carousel');

  carousel.addEventListener('slide.bs.carousel', function (event) {
    // Get the current active slide
    const currentSlide = event.from;
    const currentItem = carousel.querySelectorAll('.carousel-item')[currentSlide];
    const currentHeading = currentItem.querySelector('h1');
    const currentParagraph = currentItem.querySelector('p');

    // Add fade-out animations to the current h1 and p
    currentHeading.classList.remove('animate__fadeInLeftBig');
    currentHeading.classList.add('animate__fadeOutLeftBig');

    currentParagraph.classList.remove('animate__fadeInRightBig');
    currentParagraph.classList.add('animate__fadeOutRightBig');
  });

  carousel.addEventListener('slid.bs.carousel', function (event) {
    // Get the new active slide
    const newSlide = event.to;
    const newItem = carousel.querySelectorAll('.carousel-item')[newSlide];
    const newHeading = newItem.querySelector('h1');
    const newParagraph = newItem.querySelector('p');

    // Remove fade-out classes and add fade-in classes to the new h1 and p
    newHeading.classList.remove('animate__fadeOutLeftBig');
    newHeading.classList.add('animate__fadeInLeftBig');

    newParagraph.classList.remove('animate__fadeOutRightBig');
    newParagraph.classList.add('animate__fadeInRightBig');
  });

  // Manually trigger the fade-in animation for the first slide on page load
  const firstItem = carousel.querySelector('.carousel-item.active');
  const firstHeading = firstItem.querySelector('h1');
  const firstParagraph = firstItem.querySelector('p');

  firstHeading.classList.add('animate__fadeInLeftBig');
  firstParagraph.classList.add('animate__fadeInRightBig');
});


//FORM VALIDATION
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const form = document.getElementById('form');

//FORM CONFIRMATION
document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('confirmation-message').style.display = 'block';
});