import APIManager from "./APIManager"

class UserManager extends APIManager {


  checkUser(email, password) {

    return fetch(`https://potty-pal-json.herokuapp.com/users?email=${email}&password=${password}`).then(e => e.json())
  }


UserManagerGetAll() {
  return this.getAllLocal()


}

  UserManagerPost(newUser) {
    return this.postLocal(newUser)

  }
}

export default new UserManager("users")
