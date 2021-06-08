function createNavigation() {
  // get the text meant for the nav of #recipe-list
  let sections = document.querySelectorAll('#recipe-list section');
  const navLinks = [];

  sections.forEach((section) => {
    navLinks.push({
      title: section.getAttribute("data-nav"),
      link: section.getAttribute("id")
    })
  });

  // create a list if items
  const navElements = document.createDocumentFragment();

  for (let link of navLinks) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = "<a href='#" + link.link + "'>" + link.title + "</a>";
    navElements.appendChild(newListItem);
  }

  // append them to the navigation
  document.getElementById('navigation').appendChild(navElements);
}


function smoothLinkOperation(e) {
  e.preventDefault();
  const sectionId = e.srcElement.hash;
  // get the section coordinates
  const toScrollHeight = document.getElementById(sectionId.slice(1)).offsetTop;
  // smoothly scroll to the coordinates
  window.scrollTo({
    top: toScrollHeight - 80,
    left: 0,
    behavior: 'smooth'
  });
}


function highlightCurrentSection(entries, target) {
  entries.forEach(entry => {
    const selector = 'a[href="#'+ entry.target.id +'"]'
    const navElement = document.querySelector(selector)
    if (entry.isIntersecting) {
      target.classList.add('on-screen');
      navElement.parentNode.classList.add('current');
    }
    else {
      target.classList.remove('on-screen');
      navElement.parentNode.classList.remove('current');
    }
  });
}


function observeIfVisible(observedTarget, target) {
  // callback
  let callback = (entries) => {
    // let targetVisible;
    highlightCurrentSection(entries, target)
  }

  // init the observer
  let observer = new IntersectionObserver(callback, { threshold: [0.6] });
  observer.observe(observedTarget); // start the listener
}


let headerVisible;
function isNavVisible() {
  // check is header is visible, update headerVisible accordingly
  let headerCallback = (entries) => {
    entries.forEach(entry => entry.isIntersecting ? headerVisible = true : headerVisible = false );
  }

  let observerHeader = new IntersectionObserver(headerCallback, { threshold: [0.3] });
  let target = document.querySelector('.page__header');
  observerHeader.observe(target); // start the listener


  // add or remove class depending on position and scroll up happening
  const nav = document.querySelector('.page__header nav')
  // console.log(headerVisible);

  if (!headerVisible) {
    nav.classList.add('fixed');
  }
  else  { // remove fixed nav if header is visible
    nav.classList.remove('fixed');
  }
}


function displayBackToTop(e) {
  let height = e.target.scrollingElement.clientHeight;
  let newScroll = e.target.scrollingElement.scrollTop;
  const target = document.getElementById('back-to-top');

  newScroll > height ? target.classList.add('visible') : target.classList.remove('visible');

  target.addEventListener('click', () => {
    window.scrollTo({
      top: pageXOffset,
      left: 0,
      behavior: 'smooth'
    });
  });
}


function observeSections() {
  const sections = document.querySelectorAll('#recipe-list section')

  for (let section of sections) {
    observeIfVisible(section, section)
  }
}

function scrollListener(e) {
  isNavVisible();
  displayBackToTop(e);
}

// execute all the things
createNavigation();
observeSections();
document.onscroll = scrollListener;
let nav = document.getElementById('navigation');
nav.addEventListener('click', smoothLinkOperation);
