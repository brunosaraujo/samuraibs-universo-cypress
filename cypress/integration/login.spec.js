import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', function () {

  context('quando o usuaário é muito bom', function () {
    const user = {
      name: 'Teste Araujo',
      email: 'testearaujo@samuraibs.com',
      is_provider: true,
      password: 'pwd123'
    }

    before(function () {
      cy.postUser(user)

    })

    it('deve logar com sucesso', function () {

      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashPage.header.userLoggedIn(user.name)
    })
  })

  context('quando o usuario é bom mas a senha está incorreta ', function () {
    let user = {
      name: 'Celso Kamura',
      email: 'kamura@samuraibs.com',
      is_provider: true,
      password: 'pwd123'
    }

    before(function(){
      // O cypress foi programado para executar tudo de forma procedural. Mas as funções que não são nativas do cypres funciona de forma assíncronas do javascript.
      // Caso deixemos um depois do outro vai executar os dois ao mesmo tempo. Realizando o cadastro do usuario com a senha passada.
      // Então para realializar o cadastro e depois modificar a senha temos de passar a função then, que é o callback do java script. Dessa forma ele vai cadastrar primeiro
      // e depois realizar a troca da senha.
      cy.postUser(user).then(function(){
        user.password = 'abc123'
      })
    })

    it('deve notificar erro de credenciais ', function () {

      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.toast.shouldHaveText(message)

    })
  })

  context('quando email é incorreto', function () {
    const emails = [
      'testearaujosamuraibs.com',
      'yahoo.com',
      '@gmail.com',
      '@',
      'papito@',
      '111',
      '$@#!@%',
      'xpto123'
    ]

    before(function(){
      loginPage.go()
    })

    emails.forEach(function(email){
      it('não deve logar com o email: ' + email, function () {

        const user = { email: email, password: 'pwd123'}

        loginPage.form(user)
        loginPage.submit()
        loginPage.alert.haveText('Informe um email válido')

      })
    })


  })

  context('quando não preecho nenhum dos campos', function () {

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
        loginPage.alert.haveText(alert)
      })
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
