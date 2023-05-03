const USERS_URL = 'http://jsonplaceholder.typicode.com/users'
const dataContainer = document.querySelector('#data-container')

const createUserElement = (text) => {
  const userElement = document.createElement('li')
  const userAnchorElement = document.createElement('a')
  userAnchorElement.href = '#'
  userAnchorElement.textContent = text
  userElement.append(userAnchorElement)
  return userElement
}

const toggleLoader = () => {
  const loaderHTML = document.querySelector('#loader')
  isHidden = loaderHTML.getAttribute('hidden') !== null;
  if (isHidden) {
    loaderHTML.removeAttribute('hidden')
  } else {
    loaderHTML.setAttribute('hidden', '')
  }
}

const getAllUsers = () => {
  toggleLoader()
  const result = fetch(USERS_URL, {
    method: 'GET',
  })
  console.log('result', result)
  result
  .then((Response) => {
    return Response.json()
  })
   .then((users) => {
    users.forEach((user) => {
      const userHTML = createUserElement(user.name)
      dataContainer.append(userHTML)
    })
   })
   .catch((error) => {
    console.log('error', error)
   })  
   .finally(() => {
    toggleLoader()
   })
}

getAllUsers()