let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 50;


function toggleContrast() {
  contrastToggle = !contrastToggle;

  if (contrastToggle) {
    document.body.classList += " dark-theme"
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')
    loading.classList += " modal__overlay--visible"

    emailjs
      .sendForm(
        'service_p49s2j2',
        'template_fiepjfd',
        event.target,
        'yvhagwBQdSW2ifZuZ'
      ).then(() => {
        console.log('this worked1')
        loading.classList.remove("modal__overlay--visible");
        success.classList += " modal__overlay--visible";
      }).catch (() => {
        loading.classList.remove("modal__overlay--visible")
        alert(
            "The email service is temporarily unavailable. Please contact me at tamtle2002@gmail.com."
        );
      })    
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open")
    }

    isModalOpen = true; 
    document.body.classList += " modal--open";
}

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape")
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; i++) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
  }
}

function adjustShapeOpacity() {
  const shapes = document.querySelectorAll(".shape");
  const landingPage = document.getElementById('landing-page');
  const bounding = landingPage.getBoundingClientRect();

  // Determine the opacity based on the scroll position
  let opacity = 1;
  if (bounding.bottom < 0) {
    opacity = 0; // Completely faded when the section is out of view
  } else if (bounding.bottom < window.innerHeight) {
    // Adjust this calculation as needed
    opacity = bounding.bottom / window.innerHeight;
  }

  // Apply the calculated opacity to each shape
  shapes.forEach(shape => {
    shape.style.opacity = opacity;
  });
}

// Listen for the scroll event
window.addEventListener('scroll', adjustShapeOpacity);