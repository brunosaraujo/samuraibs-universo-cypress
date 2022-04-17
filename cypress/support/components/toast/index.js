import { el } from './elements'

class Toast {
  shouldHaveText(expectTeste) {
    cy.get(el.toast, {timeout: 10000})
      .should('be.visible')
      .find('p')
      .should('have.text', expectTeste)
  }
}
export default new Toast()