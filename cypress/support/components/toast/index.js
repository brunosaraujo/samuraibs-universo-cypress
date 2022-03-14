import { el } from './elements'

class Toast {
  shouldHaveText(expectTeste) {
    cy.get(el.toast)
      .should('be.visible')
      .find('p')
      .should('have.text', expectTeste)
  }
}
export default new Toast()