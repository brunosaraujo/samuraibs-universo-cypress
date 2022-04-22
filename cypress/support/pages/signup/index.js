import { el } from './elements'

import toast from '../../components/toast'
import alert from '../../components/alert'

class SignupPage {

  constructor() {
    this.toast = toast
    this.alert = alert
  }

  go() {
    cy.visit('/signup')

    cy.contains(el.title)
      .should('be.visible')
  }

  form(user) {
    //Preenchimento da massa de cadastro
    //Para buscar começando com Nome utilizamos ^
    cy.get(el.name).type(user.name)
    //Para buscar terminando com email utilizamos $
    cy.get(el.email).type(user.email)
    //Para buscar contendo senha utilizamos *
    cy.get(el.password).type(user.password)
  }

  submit() {
    cy.contains(el.signupButton).click()
  }

}

export default new SignupPage()