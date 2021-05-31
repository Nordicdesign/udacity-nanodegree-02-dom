// ========== NAVIGATION =============================
const CreateNavigation = () => {
  // get the text meant for the nav of #recipe-list
  let sections = document.querySelectorAll('#recipe-list section');
  const navLinks = []

  sections.forEach((section) => {
    navLinks.push({
      title: section.getAttribute("data-nav"),
      link: section.getAttribute("id")
    })
  })

  // create a list if items
  const navElements = document.createDocumentFragment()

  for (let link of navLinks) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = "<a href='#" + link.link + "'>" + link.title + "</a>";
    navElements.appendChild(newListItem);
  }

  // append them to the navigation
  document.getElementById('navigation').appendChild(navElements);
}

// ========== event listener to smooth navigation links ====================================
const SmoothLinkOperation = (e) => {
  e.preventDefault();
  const sectionId = e.srcElement.hash
  // get the section coordinates
  const toScrollHeight = document.getElementById(sectionId.slice(1)).offsetTop
  // smoothly scroll to the coordinates
  window.scrollTo({
    top: toScrollHeight - 80,
    left: 0,
    behavior: 'smooth'
  });
}

let nav = document.getElementById('navigation')
nav.addEventListener('click', SmoothLinkOperation)

// ========== event listener to highlight currently viewed section =========================


// ========== if nav is not visible and user scrolls up ==========================
// store scroll position globally
let currentScroll
let headerVisible
// is something visible or not?
let observer = new IntersectionObserver((entries) => {
  headerVisible = entries[0].isIntersecting
}, { threshold: [0] });

const NavIsVisible = (e) => {
  let newScroll = e.target.scrollingElement.scrollTop
  const nav = document.querySelector('.page__header nav')

  if (currentScroll && newScroll < currentScroll && !headerVisible) {
    let visible = observer.observe(document.querySelector('.page__header'));
    currentScroll = newScroll;
    nav.classList.add('fixed');
  }
  else if (headerVisible) {
    currentScroll = newScroll;
    nav.classList.remove('fixed');
  }
  else {
    currentScroll = newScroll;
  }
}


// ========== back to top ======================================


// execute all the things 
CreateNavigation()
document.onscroll = NavIsVisible;
