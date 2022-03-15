import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', function () {

  context('quando informo login e senha corrata', function () {
    const user = {
      name: 'Teste Araujo',
      email: 'testearaujo@samuraibs.com',
      is_provider: true,
      password: 'pwd123'
    }

    before(function () {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })

      cy.request(
        'POST',
        'http://localhost:3333/users',
        user
      ).then(function (response) {
        expect(response.status).to.eq(200)
      })

    })

    it('usuário logado na aplicação', function () {

      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      dashPage.avatarHaveText(user.name)
    })

  })

  context('quando email é incorreto', function () {
    const user = {
      name: 'Teste Araujo',
      email: 'testearaujosamuraibs.com',
      is_provider: true,
      password: 'pwd123'
    }

    it('deve exibir mensagem de alerta', function () {

      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      loginPage.toast.alertHaveText('Informe um email válido')

    })
  })

  context('quando email é incorreto', function () {

    const alertMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ]

    before(function () {
      loginPage.go()
      loginPage.submit()
    })

    alertMessages.forEach(function (alert) {
      it('deve exibir ' + alert.toLowerCase(), function () {
        loginPage.toast.alertHaveText(alert)
      })
    })

  })

  context('quando informo login com senha incorreta', function () {
    const user = {
      name: 'Teste Araujo',
      email: 'testearaujo@samuraibs.com',
      is_provider: true,
      password: 'pwd123'
    }

    before(function () {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })

      cy.request(
        'POST',
        'http://localhost:3333/users',
        user
      ).then(function (response) {
        expect(response.status).to.eq(200)
      })

    })

    it('deve exibir mensagem de alerta', function () {

      loginPage.go()
      user.password = '123'

      loginPage.form(user)
      loginPage.submit()
      loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')

    })
  })

})

// Cenário:

// 1 - Login com sucesso
// 2 - Senha incorreta
// 3 - Email no formato inválido
// 4 - Campos obrigatórios (dois ITs)


// Dicas

// 1 - Para fazer login, é necessário já ter uma conta cadastrada
// 2 - Usar contextos
// 3 - Para fazer o login com sucesso, você deverá componentizar alguma coisas
