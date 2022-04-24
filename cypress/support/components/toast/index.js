import { el } from './elements'

class Toast {
  shouldHaveText(expectTeste) {
    cy.get(el.toast)
      .should('be.visible')
      .should('have.css', 'opacity', '1')
      .find('p')
      .should('have.text', expectTeste)
  }
}
export default new Toast()