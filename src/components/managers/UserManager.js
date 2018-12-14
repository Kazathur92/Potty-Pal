import React, { Component } from 'react'
import APIManager from "./APIManager"

class UserManager extends APIManager {


UserManagerGetAll() {
  return this.getAllLocal()


}

  UserManagerPost(newUser) {
    return this.postLocal(newUser)

  }
}

export default new UserManager("users")
