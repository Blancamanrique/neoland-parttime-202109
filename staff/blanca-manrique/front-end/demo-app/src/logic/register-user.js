import {valideteUsername, validatePassword, validateCallback} from './helpers/validators'

function registerUser(name, username, password, city, country, callback) {
   if (typeof name !== 'string') throw new TypeError('name is not string')
   if (!name.trim()) throw new Error('name is empty or blank')

   if (typeof city !== 'string') throw new TypeError('city is not string')
   if (!city.trim()) throw new Error('city is empty or blank')

   if (typeof country !== 'string') throw new TypeError('country is not string')
   if (!country.trim()) throw new Error('country is empty or blank')


   valideteUsername(username)
   validatePassword(password)
   validateCallback(callback)

   var xhr = new XMLHttpRequest

   xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')

   xhr.addEventListener('load', function () {
      if (this.status === 401 || this.status === 409) {
         var res = JSON.parse(this.responseText)
         var error = res.error
         callback(new Error(error))

      } else if (this.status === 201) {
         callback(null)
      }
   })

   xhr.setRequestHeader('Content-type', 'application/json')

   var data = { name: name, username: username, password: password, city: city, country: country }

   var json = JSON.stringify(data)

   xhr.send(json)
}

export default registerUser