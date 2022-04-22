import { el } from './elements'

class Toast {
  shouldHaveText(expectTeste) {
    cy.get(el.toast, {timeout: 10000})
      .should('be.visible')
      .should('have.css', 'opacity', '1', { timeout: 1500 })
      .find('p')
      .should('have.text', expectTeste)
  }
}
export default new Toast()