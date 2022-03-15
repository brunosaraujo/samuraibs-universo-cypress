
class DashPage {

  avatarHaveText(user){
    cy.contains('span', 'Bem-vindo')
    .should('be.visible')
    cy.contains('strong', user)
    .should('be.visible')
  }

}

export default new DashPage()