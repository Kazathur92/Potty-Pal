import APIManager from "./APIManager"

class UserManager extends APIManager {


  checkUser(email, password) {

    return fetch(`http://localhost:8088/users?email=${email}&password=${password}`).then(e => e.json())
  }


UserManagerGetAll() {
  return this.getAllLocal()


}

  UserManagerPost(newUser) {
    return this.postLocal(newUser)

  }
}

export default new UserManager("users")
