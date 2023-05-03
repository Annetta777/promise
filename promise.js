const USERS_URL = 'http://jsonplaceholder.typicode.com/users'

 const result = fetch(USERS_URL, {
  method: 'GET',
  headers: {}
})
console.log('result', result)
result
 .then((users) => {
  console.log('users', users)
 })
 .catch((error) => {
  console.log('error', error)
 })
