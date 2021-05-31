
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

// event listener to highlight currently viewed section =========================


// back to top ======================================



CreateNavigation()
