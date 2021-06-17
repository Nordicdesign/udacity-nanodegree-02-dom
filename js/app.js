const createNavigation = () => {
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
  const selectElements = document.createDocumentFragment();

  for (let link of navLinks) {
    // medium and large links
    const newListItem = document.createElement('li');
    newListItem.innerHTML = "<a href='#" + link.link + "'>" + link.title + "</a>";
    navElements.appendChild(newListItem);
    // small screen links
    const newOptionItem = document.createElement('option');
    newOptionItem.innerHTML = link.title;
    newOptionItem.setAttribute('value', link.link);
    selectElements.appendChild(newOptionItem);
  }

  // append them to the navigation
  document.getElementById('navigation').appendChild(navElements);
  document.getElementById('small-navigation').appendChild(selectElements);
}

const getSectionName = (e) => {
  if (e.type === 'click') {
    sectionId = e.srcElement.hash;
    return sectionId.slice(1); // remove the #
  }
  else if (e.type === 'change') {
    return e.target.value;
  }
}

const smoothLinkOperation = (e) => {
  e.preventDefault();
  const sectionId = getSectionName(e);

  // get the section coordinates
  const toScrollHeight = document.getElementById(sectionId).offsetTop;
  // smoothly scroll to the coordinates
  window.scrollTo({
    top: toScrollHeight - 80,
    left: 0,
    behavior: 'smooth'
  });
}


const highlightCurrentSection = (entries, target) => {
  entries.forEach(entry => {
    const selector = 'a[href="#'+ entry.target.id +'"]';
    const navElement = document.querySelector(selector);
    const selectSelector = 'option[value="'+ entry.target.id +'"]';
    const selectElement = document.querySelector(selectSelector);
    if (entry.isIntersecting) {
      target.classList.add('on-screen');
      navElement.parentNode.classList.add('current');
      selectElement.setAttribute('selected', 'selected');
    }
    else {
      target.classList.remove('on-screen');
      navElement.parentNode.classList.remove('current');
      selectElement.removeAttribute('selected');
    }
  });
}


const observeIfVisible = (observedTarget, target) => {
  // callback
  let callback = (entries) => highlightCurrentSection(entries, target)
  // init the observer
  let observer = new IntersectionObserver(callback, { threshold: [0.6] });
  observer.observe(observedTarget); // start the listener
}

const headerCallback = (entries) => entries.forEach(entry => {
  const nav = document.querySelector('.page__header nav');
  !entry.isIntersecting ? nav.classList.add('fixed') : nav.classList.remove('fixed');
} );

const isNavVisible = () => {
  // check is header is visible, update headerVisible accordingly
  let observerHeader = new IntersectionObserver(headerCallback, { threshold: [0.3] });
  let target = document.querySelector('.page__header');
  observerHeader.observe(target);
}


const displayBackToTop = (e) => {
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


const observeSections = () => {
  const sections = document.querySelectorAll('#recipe-list section')

  for (let section of sections) {
    observeIfVisible(section, section)
  }
}

let timeoutScroll = [];
const scrollListener = (e) => {
  isNavVisible();
  displayBackToTop(e);
  hideNavWhenNotScrolling(timeoutScroll);
}

const hideNavWhenNotScrolling = (timeoutScroll) => {
  console.log(timeoutScroll);
  // window.clearTimeout(timeoutScroll);
  // clear any timeout when the user scrolls
  for (let timeout in timeoutScroll) {
    console.log("current timeout is ",timeout);
    clearTimeout(timeout);
  }

  // setTimeout so after 2s nav is hidden
  const nav = document.querySelector('.page__header nav');
  timeoutScroll.push(setTimeout(() => nav.classList.remove('fixed'), 4000));
}


// execute all the things
createNavigation();
observeSections();
document.onscroll = scrollListener;
let nav = document.getElementById('navigation');
nav.addEventListener('click', smoothLinkOperation);
let navSelect = document.getElementById('small-navigation');
navSelect.addEventListener('change', smoothLinkOperation);
