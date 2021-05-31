
const CreateNavigation = () => {
  // get the headers of #recipe-list
  let headers = document.querySelectorAll('#recipe-list h2');
  let headersText = []

  headers.forEach((header) => {
    headersText.push(header.innerText)
  })

  // create a list if items
  const navElements = document.createDocumentFragment()

  for (let i = 0; i < headersText.length; i++) {

    const newListItem = document.createElement('li');
    newListItem.innerHTML = "<a href='#section" + i + "'>" + headersText[i] + "</a>";

    navElements.appendChild(newListItem);
  }

  // append them to the navigation
  document.getElementById('navigation').appendChild(navElements);
}

// event listener to smooth navigation links ====================================
const SmoothLinkOperation = (e) => {
  console.log("smooooth operatoooooor");
  e.preventDefault();
  const sectionId = e.srcElement.hash
  // get the section coordinates
  const toScrollHeight = document.getElementById(sectionId.slice(1)).offsetTop
  // smoothly scroll to the coordinates
  window.scrollTo({
    top: toScrollHeight,
    left: 0,
    behavior: 'smooth'
  });
}

let nav = document.getElementById('navigation')
nav.addEventListener('click', SmoothLinkOperation)

// event listener to highlight currently viewed section =========================


// back to top ======================================



CreateNavigation()
