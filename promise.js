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

//список пользователей

/*const getAllUsers = () => {
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
}*/

// список пользователей по ид

const getUsersByIds = (usersId) => {
  toggleLoader()
  Promise.all(usersId.map((id) => fetch(`${USERS_URL}/${id}`)))
  .then((Response) => {
    return Promise.all(Response.map((element) => element.json()))
  })
  .then((users) => {
    console.log('users', users)
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
getUsersByIds([5, 6, 2, 1])

// работа с фото
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos'

const createPhotoItem = (url, title) => {
  const photoItem = document.createElement('li')
  photoItem.className = 'photo-item'

  const photoImage = document.createElement('img')
  photoImage.src = url;
  photoImage.className = 'photo-item__image'

  const photoTitle = document.createElement('h3')
  photoTitle.innerText = title;

  photoItem.append(photoImage, photoTitle)

  return photoItem
}
const getFastestLoadedPhoto = (ids) => {
  toggleLoader();
  Promise.race(ids.map((id) => fetch(`${PHOTOS_URL}/${id}`)))
    .then((Response) => { 
      return Response.json()
    })
    .then((photo) => {
      const photoHTML = createPhotoItem(photo.url, photo.title)
      dataContainer.append(photoHTML)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      toggleLoader()
    })
}

getFastestLoadedPhoto([60, 12, 55])

