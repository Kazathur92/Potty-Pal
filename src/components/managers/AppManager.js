import React, { Component } from 'react'
import APIManager from "./APIManager"

class AppManager extends APIManager {

  AppManagerPost(newUser) {
    return this.postLocal(newUser)

  }
}

export default new AppManager("users")
