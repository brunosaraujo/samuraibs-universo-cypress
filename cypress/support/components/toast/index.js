import { el } from './elements'

class Toast {
  shouldHaveText(expectTeste) {
    cy.get(el.toast)
      .should('be.visible')
      .find('p')
      .should('have.text', expectTeste)
  }

  alertHaveText(expectedText){
    cy.contains(el.alert, expectedText)
    .should('be.visible')
  }

}
export default new Toast()