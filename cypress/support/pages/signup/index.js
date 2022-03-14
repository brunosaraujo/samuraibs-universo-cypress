import { el } from './elements'

import toast from '../../components/toast'

class SignupPage {

  constructor() {
    this.toast = toast
  }

  go() {
    cy.visit('/signup')
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

  alertHaveText(expectedText){
    cy.contains('.alert-error', expectedText)
    .should('be.visible')
  }

}

export default new SignupPage()